import { Document, Paragraph, TextRun, Packer } from "docx";
import { getContent } from "./content";
import type { Locale } from "./i18n";
import messagesEn from "../messages/en.json";
import messagesDe from "../messages/de.json";

export async function generateCoverLetterDocx(language: Locale): Promise<Buffer> {
  const content = getContent(language);
  const messages = language === "de" ? messagesDe : messagesEn;
  const { personalInfo } = content;
  const t = messages.coverLetter;

  const currentDate = new Date().toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: personalInfo.name,
                bold: true,
                size: 36,
              }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: personalInfo.email,
                size: 20,
                color: "666666",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: personalInfo.location,
                size: 20,
                color: "666666",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: personalInfo.website,
                size: 20,
                color: "666666",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: personalInfo.github,
                size: 20,
                color: "666666",
              }),
            ],
            spacing: { after: 400 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: currentDate,
                size: 22,
              }),
            ],
            spacing: { after: 400 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: t.greeting,
                size: 22,
              }),
            ],
            spacing: { after: 300 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: t.intro,
                size: 22,
              }),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: t.experience,
                size: 22,
              }),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: t.impactMetrics,
                size: 22,
              }),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: t.startupExperience,
                size: 22,
              }),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: t.highlightsTitle,
                size: 22,
              }),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `- ${t.highlight1}`,
                size: 22,
              }),
            ],
            indent: { left: 360 },
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `- ${t.highlight2}`,
                size: 22,
              }),
            ],
            indent: { left: 360 },
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `- ${t.highlight3}`,
                size: 22,
              }),
            ],
            indent: { left: 360 },
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `- ${t.highlight4}`,
                size: 22,
              }),
            ],
            indent: { left: 360 },
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `- ${t.highlight5}`,
                size: 22,
              }),
            ],
            indent: { left: 360 },
            spacing: { after: 50 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: t.skills,
                size: 22,
              }),
            ],
            spacing: { before: 150, after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: t.closing,
                size: 22,
              }),
            ],
            spacing: { after: 400 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: t.signOff,
                size: 22,
              }),
            ],
            spacing: { after: 400 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: personalInfo.name,
                bold: true,
                size: 22,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return Buffer.from(buffer);
}
