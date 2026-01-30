import { BorderStyle, Document, Packer, Paragraph, TextRun } from "docx";
import * as dataEn from "./data";
import * as dataDe from "./data-de";

type Language = "en" | "de";

export async function generateCVDocx(language: Language): Promise<Buffer> {
  const data = language === "de" ? dataDe : dataEn;
  const { personalInfo, professionalSummary, experiences, education, skills, skillCategories } =
    data;

  const sectionTitles =
    language === "de"
      ? {
          summary: "ZUSAMMENFASSUNG",
          experience: "BERUFSERFAHRUNG",
          education: "AUSBILDUNG",
          skills: "TECHNISCHE FÄHIGKEITEN",
        }
      : {
          summary: "PROFESSIONAL SUMMARY",
          experience: "EXPERIENCE",
          education: "EDUCATION",
          skills: "TECHNICAL SKILLS",
        };

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header - Name
          new Paragraph({
            children: [
              new TextRun({
                text: personalInfo.name,
                bold: true,
                size: 48,
              }),
            ],
            spacing: { after: 100 },
          }),
          // Title
          new Paragraph({
            children: [
              new TextRun({
                text: personalInfo.title,
                size: 28,
                color: "666666",
              }),
            ],
            spacing: { after: 200 },
          }),
          // Contact info
          new Paragraph({
            children: [
              new TextRun({
                text: `${personalInfo.email}  |  ${personalInfo.location}  |  ${personalInfo.github}`,
                size: 20,
                color: "666666",
              }),
            ],
            spacing: { after: 400 },
          }),

          // Summary Section
          createSectionHeader(sectionTitles.summary),
          new Paragraph({
            children: [
              new TextRun({
                text: professionalSummary,
                size: 22,
              }),
            ],
            spacing: { after: 400 },
          }),

          // Experience Section
          createSectionHeader(sectionTitles.experience),
          ...experiences.flatMap((exp) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.role,
                  bold: true,
                  size: 24,
                }),
                new TextRun({
                  text: `    ${exp.startDate} - ${exp.endDate}`,
                  size: 20,
                  color: "666666",
                }),
              ],
              spacing: { before: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.company} | ${exp.location}`,
                  size: 20,
                  color: "666666",
                }),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.description,
                  size: 20,
                }),
              ],
              spacing: { after: 100 },
            }),
            ...exp.highlights.slice(0, 4).map(
              (highlight) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `- ${highlight}`,
                      size: 20,
                    }),
                  ],
                  indent: { left: 360 },
                }),
            ),
            new Paragraph({ spacing: { after: 200 } }),
          ]),

          // Education Section
          createSectionHeader(sectionTitles.education),
          ...education.flatMap((edu) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.degree,
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: `    ${edu.startYear} - ${edu.endYear}`,
                  size: 20,
                  color: "666666",
                }),
              ],
              spacing: { before: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.institution} | ${edu.location}`,
                  size: 20,
                  color: "666666",
                }),
              ],
              spacing: { after: 200 },
            }),
          ]),

          // Skills Section
          createSectionHeader(sectionTitles.skills),
          ...Object.entries(skillCategories).map(([category, info]) => {
            const categorySkills = skills.filter((s) => s.category === category);
            return new Paragraph({
              children: [
                new TextRun({
                  text: `${info.label}: `,
                  bold: true,
                  size: 20,
                }),
                new TextRun({
                  text: categorySkills.map((s) => s.name).join(", "),
                  size: 20,
                }),
              ],
              spacing: { after: 100 },
            });
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return Buffer.from(buffer);
}

function createSectionHeader(title: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 24,
      }),
    ],
    border: {
      bottom: {
        color: "CCCCCC",
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
    spacing: { before: 300, after: 200 },
  });
}
