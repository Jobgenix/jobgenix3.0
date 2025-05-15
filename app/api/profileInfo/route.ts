import { auth } from "@/lib/auth"; // Import NextAuth auth function
import { db } from "@/lib/db"; // Import database instance
import { users } from "@/lib/schema"; // Import users schema
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Handle PUT request to update user profile
export async function PUT(req: Request) {
    try {
      const { id, name, email, phone, university, location, summary, profileImage } = await req.json();
  
      // Ensure user ID is provided
      if (!id) {
        return NextResponse.json({ success: false, message: "User ID is required." }, { status: 400 });
      }
  
      // Update user in database
      await db
        .update(users)
        .set({ name, email, phoneNumber: phone, university, location, summary, image: profileImage })
        .where(eq(users.id, id));
  
      return NextResponse.json({ success: true, message: "Profile updated successfully." });
    } catch (error) {
      console.error("Error updating profile:", error);
      return NextResponse.json({ success: false, message: "Failed to update profile." }, { status: 500 });
    }
  }

export async function GET() {
    try {
        // Get the authenticated user session
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch user data from the database using email
        const dbUser = await db.select().from(users).where(eq(users.email, session.user.email));

        if (dbUser.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Extract user details
        const user = dbUser[0];
        const name = user.name || "User"; // Default name if not provided in the database

        // Prepare user data response
        const userData = {
            userId : user.id,
            name: user.name,
            profileImage: user.image || `https://ui-avatars.com/api/?name=${name}&background=random`,
            email: user.email,
            phone: user.phoneNumber || "Not provided",
            university: user.university || "Unknown",
            location: user.location || "Not specified",
            summary: user.summary || "No summary available",
            resume_url: user.resumeUrl || null,
            skills: user.skills || "No skills available"
        };

        return NextResponse.json(userData);
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
