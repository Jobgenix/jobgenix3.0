import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { users } from "@/lib/schema";
import { ROLE_IDS } from "@/constants/roles";
import { setUserInCache } from "@/utils/userByEmailOrId";

async function updateUserRole(req: NextRequest) {
    const { userId, newRoleId } = await req.json();

    if (!userId) return new NextResponse(JSON.stringify({ err: "Unauthorised request" }), { status: 400 });
    if (!Object.values(ROLE_IDS).includes(newRoleId)) {
        return new NextResponse(JSON.stringify({ error: "Invalid Role ID" }), { status: 400 });
    }
    try {
        const user = await db.update(users).set({ roleId: newRoleId }).where(eq(users.id, userId)).returning();
        await setUserInCache(user[0]);
        return new NextResponse(JSON.stringify({ success: "Role Updated" }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ err: `Server Error: ${error}` }), { status: 500 });
    }
}

export { updateUserRole as POST };