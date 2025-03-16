import { NextResponse, NextRequest } from "next/server";
import { extractTextFromPDF, extractTextFromDOCX } from "@/lib/extractpdf";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";


export const POST = async (req: NextRequest) => {
  try {
    // Get form data
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (file) {
      console.log(file);


      // Convert Blob to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);


    let extractedText = "";

    // Check file type (PDF or DOCX)
    if (file.type === "application/pdf") {
      extractedText = extractTextFromPDF(buffer);
    } else if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      extractedText = await extractTextFromDOCX(buffer);
    } else {
      return NextResponse.json(
        { error: "Unsupported file format" },
        { status: 400 }
      );
    }

    // console.log(typeof(extractedText));

    const data = await getActSkils(extractedText)

      return NextResponse.json({ text: data }, { status: 200 });
    }
 
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json({ error: "Failed to extract text" }, { status: 500 });
  }
  
};

async function getActSkils(extractedText: string): Promise<string | null> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  const prompt = `Analyze this text and extract a list of technical skills, tools, programming languages, and technologies. For each skill found, return its standardized industry name (e.g. 'JS' should be 'JavaScript', 'ML' should be 'Machine Learning'). Return only the normalized skill names separated by commas: ${extractedText}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!response.ok) {
    console.error("Error calling Gemini API:", response.statusText);
    return null;
  }

  const data = await response.json();
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    return null;
  }

  return data.candidates[0].content.parts[0].text.trim();
}


export async function PUT(req: Request) {
  try {
    const { userId, skills } = await req.json();
    if(!userId ){
      return NextResponse.json({ success: false , mesage : "User id not found" }, { status: 200 });
    }

    if(!skills){
      return NextResponse.json({ success: false , mesage : "skills not found" }, { status: 200 });
    }

    console.log(userId, skills);
    await db
      .update(users)
      .set({ skills: skills })
      .where(eq(users.id, userId));

      return NextResponse.json({ success: true, message: "Skils updated successfully" });

  } catch (error) {
    console.error("Error updating skills:", error);
    return NextResponse.json({ error: "Failed to update skills" }, { status: 500 });
  }
}