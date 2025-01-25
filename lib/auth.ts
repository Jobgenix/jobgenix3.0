import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { db } from './db'
import { generateSalt, hashPassword, verifyPassword } from "@/utils/password";
import { accounts, sessions, users } from "./schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { signInSchema, signUpSchema } from "./zod";
import { ZodError } from "zod";
import { CustomError } from "./authError";
import { CustomDrizzleAdapter } from "./adapter";
import { ROLE_IDS } from "@/constants/roles";

export const authConfig = {
    adapter: CustomDrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
    }),
    providers: [
        Google({
            authorization: {
                params: {
                    scope: "openid email profile https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/user.gender.read",
                },
            },
            async profile(profile, tokens) {
                profile.access_token = tokens.access_token;

                return profile
            }
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" },
                gender: { label: "Gender", type: "text", placeholder: "Enter your gender" },
                phoneNumber: { label: "Phone Number", type: "text", placeholder: "Enter your phone number" },
                firstName: { label: "First Name", type: "text", placeholder: "Enter your first name" },
                lastName: { label: "Last Name", type: "text", placeholder: "Enter your last name" },
                signUp: { label: "Sign Up", type: "checkbox" },
            },
            authorize: async (credentials) => {
                try {

                    if (credentials.signUp === 'on') {
                        const { email, password, firstName, lastName, gender, phoneNumber } = await signUpSchema.parseAsync(credentials)
                        const foundUser = await db.select().from(users).where(eq(users.email, email));
                        if (foundUser.length > 0) {
                            throw new CustomError("user_exists", "User already exists.");
                        }

                        const salt = generateSalt();
                        const pwHash = hashPassword(password, salt);
                        const userId = uuidv4();
                        const user = await db.insert(users).values({
                            email: email,
                            password: pwHash,
                            name: `${firstName} ${lastName}`,
                            gender: gender,
                            phoneNumber: phoneNumber,
                            salt,
                            id: userId,
                            roleId: ROLE_IDS.NEW_USER,
                        }).returning();

                        return user[0];
                    } else {
                        const { email, password } = await signInSchema.parseAsync(credentials);
                        const foundUser = await db.select().from(users).where(eq(users.email, email));
                        if (foundUser.length === 0) {
                            throw new CustomError("user_not_found", "User not found. Please check your email.");
                        }

                        if (!verifyPassword(password, foundUser[0].password!, foundUser[0].salt!)) {
                            throw new CustomError("incorrect_password", "Incorrect password. Please try again.");
                        }

                        return foundUser[0];
                    }

                } catch (error: unknown) {
                    if (error instanceof ZodError) {
                        console.error("Error during authentication:", error.message);
                        throw new CustomError("validation_error", "Invalid input. Please check your credentials.");
                    }

                    else if (error instanceof CustomError) {
                        console.error("Error during authentication:", error.message);
                        throw new CustomError(error.code, error.message || "Something went wrong.");
                    }

                    else {
                        console.error('Unknown Error during authentication:', error);
                        throw new CustomError("unknown_error", `Unknown error occurred. ${error}`);
                    }
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days to session expiry
        updateAge: 24 * 60 * 60, // 24 hours to update session data into database
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : "/home";
        },
        async jwt({ token, user }) {
            if (user) {
                return { ...token, id: user.id, roleId: user.roleId };
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.role = token.roleId as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/login', // Custom sign-in page
        error: '/error', // Error page
        newUser: '/auth/first-login', // New user sign-up page
    }
} satisfies NextAuthConfig;

export const {
    handlers: { GET, POST },
    auth, signOut
} = NextAuth(authConfig);