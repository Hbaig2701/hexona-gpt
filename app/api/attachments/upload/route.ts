import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large. Max 10MB." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  let extractedText = "";
  let type = "text";

  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf")) {
    type = "pdf";
    try {
      const pdfModule = await import("pdf-parse");
      const pdfParse = (pdfModule as unknown as { default: (buf: Buffer) => Promise<{ text: string }> }).default ?? pdfModule;
      const result = await (pdfParse as (buf: Buffer) => Promise<{ text: string }>)(buffer);
      extractedText = result.text;
    } catch (error) {
      console.error("PDF parse error:", error);
      return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
    }
  } else if (name.endsWith(".docx")) {
    type = "document";
    try {
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } catch (error) {
      console.error("DOCX parse error:", error);
      return NextResponse.json({ error: "Failed to parse document" }, { status: 500 });
    }
  } else if (name.endsWith(".txt") || name.endsWith(".md")) {
    type = "text";
    extractedText = buffer.toString("utf-8");
  } else {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  // Truncate very long documents
  if (extractedText.length > 50000) {
    extractedText = extractedText.slice(0, 50000) + "\n\n[Document truncated - showing first 50,000 characters]";
  }

  return NextResponse.json({
    type,
    fileName: file.name,
    extractedText,
    size: file.size,
  });
}
