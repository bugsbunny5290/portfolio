import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import * as dataEn from "./data";
import * as dataDe from "./data-de";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: "#4a4a4a",
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 9,
    color: "#666666",
  },
  contactItem: {
    marginRight: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#333333",
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  experienceRole: {
    fontSize: 11,
    fontWeight: "bold",
  },
  experienceDate: {
    fontSize: 9,
    color: "#666666",
  },
  experienceCompany: {
    fontSize: 10,
    color: "#4a4a4a",
    marginBottom: 4,
  },
  experienceDescription: {
    fontSize: 9,
    lineHeight: 1.4,
    color: "#333333",
    marginBottom: 4,
  },
  bulletList: {
    paddingLeft: 10,
  },
  bulletItem: {
    fontSize: 9,
    lineHeight: 1.4,
    color: "#333333",
    marginBottom: 2,
  },
  educationItem: {
    marginBottom: 8,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: "bold",
  },
  educationYear: {
    fontSize: 9,
    color: "#666666",
  },
  educationInstitution: {
    fontSize: 9,
    color: "#4a4a4a",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skillCategory: {
    marginBottom: 8,
  },
  skillCategoryTitle: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#4a4a4a",
  },
  skillTag: {
    fontSize: 8,
    backgroundColor: "#f0f0f0",
    padding: "3 6",
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 2,
  },
});

interface CVDocumentProps {
  language: "en" | "de";
}

export function CVDocument({ language }: CVDocumentProps): React.ReactElement {
  const data = language === "de" ? dataDe : dataEn;
  const { personalInfo, professionalSummary, experiences, education, skills, skillCategories } =
    data;

  const sectionTitles =
    language === "de"
      ? {
          summary: "Zusammenfassung",
          experience: "Berufserfahrung",
          education: "Ausbildung",
          skills: "Technische Fähigkeiten",
        }
      : {
          summary: "Professional Summary",
          experience: "Experience",
          education: "Education",
          skills: "Technical Skills",
        };

  const groupedSkills = Object.keys(skillCategories).reduce(
    (acc, category) => {
      acc[category] = skills.filter((s) => s.category === category);
      return acc;
    },
    {} as Record<string, typeof skills>,
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.title}>{personalInfo.title}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{personalInfo.email}</Text>
            <Text style={styles.contactItem}>{personalInfo.location}</Text>
            <Text style={styles.contactItem}>{personalInfo.github}</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{sectionTitles.summary}</Text>
          <Text style={styles.summary}>{professionalSummary}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{sectionTitles.experience}</Text>
          {experiences.map((exp) => (
            <View key={`${exp.company}-${exp.startDate}`} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceRole}>{exp.role}</Text>
                <Text style={styles.experienceDate}>
                  {exp.startDate} - {exp.endDate}
                </Text>
              </View>
              <Text style={styles.experienceCompany}>
                {exp.company} | {exp.location}
              </Text>
              <Text style={styles.experienceDescription}>{exp.description}</Text>
              <View style={styles.bulletList}>
                {exp.highlights.slice(0, 4).map((highlight) => (
                  <Text key={highlight} style={styles.bulletItem}>
                    - {highlight}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{sectionTitles.education}</Text>
          {education.map((edu) => (
            <View key={`${edu.degree}-${edu.startYear}`} style={styles.educationItem}>
              <View style={styles.educationHeader}>
                <Text style={styles.educationDegree}>{edu.degree}</Text>
                <Text style={styles.educationYear}>
                  {edu.startYear} - {edu.endYear}
                </Text>
              </View>
              <Text style={styles.educationInstitution}>
                {edu.institution} | {edu.location}
              </Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{sectionTitles.skills}</Text>
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <View key={category} style={styles.skillCategory}>
              <Text style={styles.skillCategoryTitle}>
                {skillCategories[category as keyof typeof skillCategories].label}:
              </Text>
              <View style={styles.skillsContainer}>
                {categorySkills.map((skill) => (
                  <Text key={skill.name} style={styles.skillTag}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
