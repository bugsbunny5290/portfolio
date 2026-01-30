import { renderToBuffer } from "@react-pdf/renderer";
import type { NextRequest } from "next/server";
import { generateCVDocx } from "@/lib/cv-docx";
import { CVDocument } from "@/lib/cv-template";
import * as dataEn from "@/lib/data";
import * as dataDe from "@/lib/data-de";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;
  const lang = (searchParams.get("lang") || "en") as "en" | "de";
  const format = (searchParams.get("format") || "pdf") as "pdf" | "docx";

  const data = lang === "de" ? dataDe : dataEn;
  const langSuffix = lang === "de" ? "DE" : "EN";
  const filename = `${data.personalInfo.name.replace(/\s+/g, "_")}_CV_${langSuffix}`;

  try {
    if (format === "docx") {
      const buffer = await generateCVDocx(lang);

      return new Response(new Uint8Array(buffer), {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "Content-Disposition": `attachment; filename="${filename}.docx"`,
          "Cache-Control": "no-store",
        },
      });
    }

    // Default: PDF
    const buffer = await renderToBuffer(<CVDocument language={lang} />);

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error generating CV:", error);
    return new Response("Error generating CV", { status: 500 });
  }
}
