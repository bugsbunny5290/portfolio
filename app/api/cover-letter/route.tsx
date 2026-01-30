import { renderToBuffer } from "@react-pdf/renderer";
import { CoverLetterDocument } from "@/lib/cover-letter-template";
import { generateCoverLetterDocx } from "@/lib/cover-letter-docx";
import type { NextRequest } from "next/server";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;
  const lang = (searchParams.get("lang") || "en") as Locale;
  const format = (searchParams.get("format") || "pdf") as "pdf" | "docx";

  const content = getContent(lang);
  const langSuffix = lang === "de" ? "DE" : "EN";
  const filename = `${content.personalInfo.name.replace(/\s+/g, "_")}_Cover_Letter_${langSuffix}`;

  try {
    if (format === "docx") {
      const buffer = await generateCoverLetterDocx(lang);

      return new Response(new Uint8Array(buffer), {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "Content-Disposition": `attachment; filename="${filename}.docx"`,
          "Cache-Control": "no-store",
        },
      });
    }

    const buffer = await renderToBuffer(<CoverLetterDocument language={lang} />);

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return new Response("Error generating cover letter", { status: 500 });
  }
}
