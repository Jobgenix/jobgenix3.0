import { DrizzleAdapter } from "@auth/drizzle-adapter"; // Replace with the actual Drizzle Adapter import path
import type { Adapter } from "@auth/core/adapters";
import { db } from "./db";
import { accounts, sessions, users, verificationTokens } from "./schema";
import { v4 as uuidv4 } from "uuid";
import { getUserAdditionalInfo } from "@/utils/getUserInfo";
import { ROLE_IDS } from "@/constants/roles";
import { eq } from "drizzle-orm";
import { deleteUserFromCache, getUserFromCache, setUserInCache } from "@/utils/userByEmailOrId";


type DefaultPostgresSchema = {
    usersTable: typeof users
    accountsTable: typeof accounts
    sessionsTable?: typeof sessions
    verificationTokensTable?: typeof verificationTokens
}

export function CustomDrizzleAdapter(drizzle: typeof db, schema: DefaultPostgresSchema): Adapter {
    const baseAdapter = DrizzleAdapter(drizzle, schema);

    return {
        ...baseAdapter,
        createUser: async (data) => {
            console.log(data);
            const profileData = await getUserAdditionalInfo(data.access_token!)
            data.gender = profileData.gender!;
            data.phoneNumber = profileData.phoneNumber || '+91 9999999999';
            const savedUser = await db.insert(users).values({
                id: uuidv4(),
                name: data.name,
                email: data.email,
                emailVerified: data.email_verified ? new Date() : null, // Optional email verification timestamp
                image: data.picture,
                gender: data.gender,
                phoneNumber: data.phoneNumber,
                password: null, // OAuth login doesn't use a password
                salt: null, // No salt needed for OAuth
                roleId: ROLE_IDS.NEW_USER,
            }).returning();
            await setUserInCache(savedUser[0])
            return savedUser[0]
        },

        getUser: async (id) => {
            const cacheUser = await getUserFromCache(id);
            if (cacheUser) return cacheUser
            const user = await db.select().from(users).where(eq(users.id, id));
            if (user.length > 0)
                return user[0];
            return null;
        },

        getUserByEmail: async (email) => {
            const cacheUser = await getUserFromCache(email);
            if (cacheUser) return cacheUser
            const user = await db.select().from(users).where(eq(users.email, email));
            if (user.length > 0)
                return user[0];
            return null;
        },

        getUserByAccount: async (accountId) => {
            const account = await db.select().from(accounts).where(eq(accounts.providerAccountId, accountId.providerAccountId));
            if (account.length > 0) {
                const cacheUser = await getUserFromCache(account[0].userId);
                if (cacheUser) return cacheUser
                const user = await db.select().from(users).where(eq(users.id, account[0].userId));
                return user[0];
            }
            return null;
        },

        updateUser: async (user) => {
            const updatedUser = await db.update(users).set(user).where(eq(users.id, user.id)).returning();
            await setUserInCache(updatedUser[0]);
            return updatedUser[0];
        },

        deleteUser: async (id) => {
            await db.delete(users).where(eq(users.id, id));
            await deleteUserFromCache(id);
        },

        getSessionAndUser: async (sessionToken) => {
            const session = await db.select().from(sessions).where(eq(sessions.sessionToken, sessionToken));
            if (session.length > 0) {
                const cacheUser = await getUserFromCache(session[0].userId);
                if (cacheUser) return { session: session[0], user: cacheUser };
                const user = await db.select().from(users).where(eq(users.id, session[0].userId));
                return { session: session[0], user: user[0] };
            }
            return null;
        }
    };
}
