import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { getContent } from "./content";
import type { Locale } from "./i18n";
import messagesEn from "../messages/en.json";
import messagesDe from "../messages/de.json";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
    lineHeight: 1.6,
  },
  header: {
    marginBottom: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 2,
  },
  date: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 11,
  },
  greeting: {
    marginBottom: 20,
    fontSize: 11,
  },
  paragraph: {
    marginBottom: 15,
    fontSize: 11,
    textAlign: "justify",
  },
  closing: {
    marginTop: 30,
  },
  signature: {
    marginTop: 40,
    fontWeight: "bold",
  },
  highlightList: {
    marginBottom: 15,
    paddingLeft: 15,
  },
  highlightItem: {
    marginBottom: 5,
    fontSize: 11,
  },
});

interface CoverLetterDocumentProps {
  language: Locale;
}

export function CoverLetterDocument({ language }: CoverLetterDocumentProps): React.ReactElement {
  const content = getContent(language);
  const messages = language === "de" ? messagesDe : messagesEn;
  const { personalInfo } = content;
  const t = messages.coverLetter;

  const currentDate = new Date().toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.contactInfo}>{personalInfo.email}</Text>
          <Text style={styles.contactInfo}>{personalInfo.location}</Text>
          <Text style={styles.contactInfo}>{personalInfo.github}</Text>
        </View>

        <Text style={styles.date}>{currentDate}</Text>

        <Text style={styles.greeting}>{t.greeting}</Text>

        <Text style={styles.paragraph}>{t.intro}</Text>

        <Text style={styles.paragraph}>{t.experience}</Text>

        <Text style={styles.paragraph}>{t.highlightsTitle}</Text>

        <View style={styles.highlightList}>
          <Text style={styles.highlightItem}>- {t.highlight1}</Text>
          <Text style={styles.highlightItem}>- {t.highlight2}</Text>
          <Text style={styles.highlightItem}>- {t.highlight3}</Text>
          <Text style={styles.highlightItem}>- {t.highlight4}</Text>
        </View>

        <Text style={styles.paragraph}>{t.skills}</Text>

        <Text style={styles.paragraph}>{t.closing}</Text>

        <View style={styles.closing}>
          <Text>{t.signOff}</Text>
          <Text style={styles.signature}>{personalInfo.name}</Text>
        </View>
      </Page>
    </Document>
  );
}
