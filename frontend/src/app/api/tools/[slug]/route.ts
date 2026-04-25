import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    // 1. Handle AI and Writing Tools (JSON/Text based)
    if (slug.startsWith("ai-") || slug.endsWith("-rewriter") || slug.endsWith("-fixer")) {
      const { text } = await req.json();
      
      if (process.env.GEMINI_API_KEY) {
        const result = await model.generateContent(`Task: ${slug.replace(/-/g, " ")}. Input: ${text}`);
        const response = await result.response;
        return NextResponse.json({ result: response.text() });
      } else {
        return NextResponse.json({ 
          result: `[MOCK MODE] Processed "${slug}" for: "${text.substring(0, 50)}...". Please set GEMINI_API_KEY for real AI.`
        });
      }
    }

    // 2. Handle File-based Tools (Form Data / Buffers)
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Generic Image Processing
    if (slug.includes("image") || slug.includes("jpg") || slug.includes("png") || slug.includes("webp")) {
      let processed = sharp(buffer);
      
      if (slug.includes("compress")) {
        processed = processed.jpeg({ quality: 80, force: false }).png({ quality: 80, force: false });
      } else if (slug.includes("resize")) {
        processed = processed.resize(800, null, { withoutEnlargement: true });
      }

      const outputBuffer = await processed.toBuffer();
      return new NextResponse(outputBuffer as any, {
        headers: { "Content-Type": file.type, "Content-Disposition": `attachment; filename="processed-${file.name}"` }
      });
    }

    // Generic PDF Tools (Currently echoing original file for generic placeholders)
    if (slug.includes("pdf")) {
       return new NextResponse(buffer as any, {
         headers: { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="processed-${file.name}"` }
       });
    }

    // Fallback for generic conversions
    return new NextResponse(buffer as any, {
       headers: { "Content-Type": file.type, "Content-Disposition": `attachment; filename="processed-${file.name}"` }
    });

  } catch (err) {
    console.error(`Tool Engine Error [${slug}]:`, err);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
