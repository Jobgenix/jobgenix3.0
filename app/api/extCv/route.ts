import { NextResponse } from "next/server";
//import { generateSignedUrl } from "@/utils/CloudinaryCvUploads";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import pdf from "pdf-parse";
import mammoth from "mammoth";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const userId = formData.get("userId"); // Extract userId from formData

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ success: false, error: "No valid file uploaded" }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    let extractedText = "";

    if (file.type === "application/pdf") {
      // Extract text from PDF
      const data = await pdf(fileBuffer);
      extractedText = data.text;
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      // Extract text from DOCX
      const { value } = await mammoth.extractRawText({ buffer: fileBuffer });
      extractedText = value;
    } else {
      return NextResponse.json({ success: false, error: "Unsupported file format" }, { status: 400 });
    }

    // Extract only skills using Gemini API
    const skills = await extractSkills(extractedText);

    if (!skills) {
      return NextResponse.json({ success: false, error: "Failed to extract skills" }, { status: 500 });
    }

    // Store skills in the database
    await db.update(users).set({ skills }).where(eq(users.id, userId));

    return NextResponse.json({ success: true, skills });
  } catch (error) {
    console.error("Error processing CV:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// Function to extract skills using Gemini API
async function extractSkills(text: string) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing Google Gemini API Key");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Extract only the skills from this resume: ${text}` }] }],
        }),
      }
    );

    const data = await response.json();

    if (!data || !data.candidates || data.candidates.length === 0) {
      return "";
    }

    return data.candidates[0]?.content?.parts?.[0]?.text || "";
  } catch (error) {
    console.error("Error extracting skills with Gemini:", error);
    return "";
  }
}
