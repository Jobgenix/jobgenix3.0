import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { resumeText } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Extract only the technical and soft skills from the following resume text.
      Return a JSON array of skills.
      Resume:
      ${resumeText}
    `;

    const result = await model.generateContent(prompt);
    const output = await result.response.text();
    const cleaned = output.replace(/```json|```/g, "").trim();

    let skills: string[];
    try {
      skills = JSON.parse(cleaned);
    } catch {
      skills = [];
    }

    return new Response(JSON.stringify({ skills }), { status: 200 });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ skills: [], error: String(error) }), {
      status: 500,
    });
  }
}
