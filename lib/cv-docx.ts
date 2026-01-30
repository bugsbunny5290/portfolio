import { Document, Paragraph, TextRun, BorderStyle, Packer } from "docx";
import { getContent, skillCategories } from "./content";
import type { Locale } from "./i18n";

const categoryLabels = {
  en: {
    cloud: "Cloud & Infrastructure",
    backend: "Backend",
    frontend: "Frontend",
    devops: "DevOps",
    languages: "Languages",
  },
  de: {
    cloud: "Cloud & Infrastruktur",
    backend: "Backend",
    frontend: "Frontend",
    devops: "DevOps",
    languages: "Programmiersprachen",
  },
};

export async function generateCVDocx(language: Locale): Promise<Buffer> {
  const content = getContent(language);
  const { personalInfo, professionalSummary, experiences, education, skills } = content;

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

  const labels = categoryLabels[language];

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
                size: 48,
              }),
            ],
            spacing: { after: 100 },
          }),
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
          new Paragraph({
            children: [
              new TextRun({
                text: `${personalInfo.email}  |  ${personalInfo.location}  |  ${personalInfo.website}  |  ${personalInfo.github}`,
                size: 20,
                color: "666666",
              }),
            ],
            spacing: { after: 400 },
          }),

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
                })
            ),
            new Paragraph({ spacing: { after: 200 } }),
          ]),

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

          createSectionHeader(sectionTitles.skills),
          ...skillCategories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            return new Paragraph({
              children: [
                new TextRun({
                  text: `${labels[category as keyof typeof labels]}: `,
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
