import { DrizzleAdapter } from "@auth/drizzle-adapter"; // Replace with the actual Drizzle Adapter import path
import type { Adapter } from "@auth/core/adapters";
import { db } from "./db";
import { accounts, sessions, users, verificationTokens } from "./schema";
import { v4 as uuidv4 } from "uuid";
import { getUserAdditionalInfo } from "@/utils/getUserInfo";

interface CustomUser {
    id: string;
    email: string;
    emailVerified: Date | null;
    name: string;
    gender: string;
    phoneNumber: string;
    picture: string;
    email_verified: boolean;
    access_token: string | null;
}

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
        createUser: async (data: CustomUser) => {
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
            }).returning();
            return savedUser[0]
        }
    };
}
