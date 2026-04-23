export const personalInfo = {
  name: "Pranav Gautam",
  title: "Staff Engineer",
  subtitle: "Staff Engineer · Plattform & Backend",
  tagline:
    "Staff Engineer mit 8+ Jahren Erfahrung im Aufbau cloud-nativer Systeme im großen Maßstab. Zuvor CTO bei DrAnsay AU-Schein GmbH — Skalierung der Plattform von Null auf 2M+ Nutzer und von ~€200K auf €20M ARR. Jetzt fokussiert auf Platform Engineering, verteilte Systeme und API-Architektur als Individual Contributor.",
  location: "Heidelberg, Deutschland",
  email: "pranav.gautam.pro@gmail.com",
  website: "https://pranavgautam.me",
  github: "https://github.com/bugsbunny5290",
  linkedin: "https://linkedin.com/in/pranavgautam",
  metaDescription:
    "Staff Engineer mit 8+ Jahren in cloud-nativen Systemen, GCP, Kubernetes und API-Architektur. Zuvor CTO bei DrAnsay (2M+ Nutzer, €20M ARR). Standort: Heidelberg, Deutschland.",
} as const;

export const professionalSummary = `Ich bin Staff Engineer mit Sitz in Heidelberg, Deutschland, mit 8+ Jahren Erfahrung in der Gestaltung und Skalierung cloud-nativer Systeme — vorwiegend in HealthTech und B2C-Plattformen.

Mein Werdegang reicht vom Forscher über die technische Führung bis zum Individual Contributor. Zu Beginn meiner Karriere war ich am DFKI und bei einer vom Hasso-Plattner-Institut geförderten Health-Tech-Initiative tätig, dann als CTO bei DrAnsay AU-Schein GmbH, wo ich die Engineering-Organisation von 3 auf 15 Mitarbeiter und die Plattform auf 2M+ Nutzer aufgebaut habe. Ich bin bewusst vom Management zurückgetreten, um tiefer in Architektur, Platform Engineering und Systemdesign einzusteigen — dort leiste ich meine beste Arbeit.

Aktuell arbeite ich von Heidelberg aus remote für ein Hamburger Unternehmen.

Außerhalb der Arbeit: Ich interessiere mich für persönliche Finanzsysteme, europäische Geografie und den Bau von Tools, die Entwickler-Workflows beschleunigen.`;

export const whatIDo = [
  {
    title: "Technische Strategie",
    description:
      "Definition von Architektur-Roadmaps, Bewertung von Build-vs-Buy-Entscheidungen und wirkungsvolle technische Entscheidungen im Einklang mit Geschäftszielen.",
  },
  {
    title: "Platform Engineering",
    description:
      "Aufbau von Cloud-Infrastruktur, CI/CD-Pipelines und Entwicklerplattformen, die Teams schneller und zuverlässiger liefern lassen.",
  },
  {
    title: "KI-gestützte Entwicklung",
    description:
      "Einsatz von KI-Tools für schnelles Prototyping vom Konzept zur Lösung. Beschleunigung von Entwicklungszyklen bei gleichzeitiger Wahrung von Codequalität und Architekturintegrität.",
  },
  {
    title: "Praxisnahe Umsetzung",
    description:
      "Nah am Code bleiben — Systeme entwerfen, kritischen Code schreiben und Teams bei schwierigen technischen Herausforderungen unterstützen.",
  },
];

export const experiences = [
  {
    company: "DrAnsay AU-Schein GmbH",
    role: "Staff Engineer",
    location: "Hamburg, Deutschland (Remote aus Heidelberg)",
    startDate: "Dez 2019",
    endDate: "Heute",
    contextNote:
      "Digitale Gesundheitsplattform für Krankmeldungen. Zuvor CTO (Team von 15); Wechsel zum Staff Engineer mit Skalierung der Organisation auf 40 Engineers.",
    description:
      "Platform Engineering und Cloud-Architektur für eine Telemedizin-Plattform, die Patienten mit approbierten Ärzten für Online-Konsultationen, Rezepte und digitale Gesundheitsleistungen verbindet — über 3 Mio. Patienten deutschlandweit. Zuvor als CTO tätig, dann Wechsel zur praxisorientierten Engineering-Rolle im Zuge der Skalierung.",
    highlights: [
      "Verantwortung für die gesamte Cloud-Architektur auf GCP — 10+ Microservices mit 100K+ Requests/Tag und P90-SLA-Commitment.",
      "Reduzierung von Produktionsvorfällen von mehrmals täglich auf ca. zweimal pro Monat durch strukturierten On-Call, Runbooks und automatisiertes Alerting.",
      "Leitung der Plattformmigration von Cloud Functions zu GKE-gehosteten Managed Services, Verbesserung der Deployment-Isolation und Ermöglichung unabhängiger Service-Skalierung.",
      "Implementierung von GitOps-Workflows mit ArgoCD, Ermöglichung mehrerer Produktions-Deployments pro Tag mit vollständigem Audit-Trail und Ein-Klick-Rollback.",
      "Design und Rollout der Gravitee API-Management-Plattform für 10+ interne und externe APIs; Ermöglichung von Self-Service-API-Publishing für das Engineering-Team.",
      "Definition von Engineering-Standards, ADR-Prozess und Code-Review-Kultur, übernommen von einer 40-Personen-Engineering-Organisation.",
      "Als CTO: Engineering von 3 auf 15 Mitarbeiter aufgebaut; technische Strategie geleitet, die die Plattform von MVP zu €20M ARR brachte.",
    ],
    technologies: [
      "GCP",
      "Kubernetes",
      "GKE",
      "ArgoCD",
      "GitOps",
      "Gravitee",
      "NestJS",
      "PostgreSQL",
      "Cloud Functions",
      "Cloud Run",
    ],
  },
  {
    company: "Data4Life (gefördert vom Hasso-Plattner-Institut)",
    role: "Resident Entrepreneur",
    location: "Potsdam, Deutschland",
    startDate: "Nov 2018",
    endDate: "Apr 2019",
    contextNote: "",
    description:
      "Ausgewählt für ein kompetitives F&E-Programm der Health-Cloud-Initiative des HPI.",
    highlights: [
      "Architektur für eine sprachgesteuerte Datenerfassungsplattform entworfen; funktionale Prototypen zur Validierung von Product-Market-Fit vor vollständiger Investition erstellt.",
      "Vertretung von Data4Life auf der HIMSS 2019 (Orlando), Pitches vor Healthcare-Führungskräften und potenziellen Partnern.",
      "Leitung des technischen Recruitings für die Erweiterung des Mobile-Teams in Barcelona.",
    ],
    technologies: ["Architektur", "Healthcare", "Voice AI", "Prototyping"],
  },
  {
    company: "DFKI GmbH",
    role: "Gastforscher",
    location: "Kaiserslautern, Deutschland",
    startDate: "Feb 2018",
    endDate: "Nov 2018",
    contextNote:
      "Deutsches Forschungszentrum für Künstliche Intelligenz — eines der größten KI-Forschungsinstitute Europas.",
    description:
      "Forschung an einem der größten KI-Forschungsinstitute Europas, Fokus auf kontextbewusstes Computing.",
    highlights: [
      "Erforschung kontextbewusster Umfragesysteme; umfassende Literaturrecherche zur Identifizierung von Lücken im adaptiven Fragendesign.",
      "Design und Implementierung einer regelbasierten dynamischen Umfrage-Engine, die Fragen basierend auf Echtzeitsignalen anpasst (Standort, Wetter, Sensordaten).",
      "Aufbau einer erweiterbaren Architektur für zukünftige biometrische Sensorintegration (Beschleunigungsmesser, Herzfrequenz).",
    ],
    technologies: ["Forschung", "Context-Aware Computing", "Python", "Sensor-APIs"],
  },
  {
    company: "Fraunhofer IESE · John Deere ETIC",
    role: "UI Designer (Industrieprojekt)",
    location: "Kaiserslautern, Deutschland",
    startDate: "Okt 2016",
    endDate: "Dez 2016",
    contextNote: "",
    description: "Gemeinsames Fraunhofer–John-Deere-Projekt für Agrartechnologie-Interfaces.",
    highlights: [
      "Design einer Spracherkennungs-UI für Bediener landwirtschaftlicher Maschinen im Rahmen eines gemeinsamen Fraunhofer–John-Deere-Projekts.",
      "Lieferung von Wireframes und interaktiven Prototypen, ausgerichtet am Design-System von John Deere.",
    ],
    technologies: ["UI Design", "Prototyping", "Agile", "Figma"],
  },
];

export const education = [
  {
    degree: "European Masters in Software Engineering",
    institution: "TU Kaiserslautern & Universidad Politécnica de Madrid",
    location: "Deutschland & Spanien",
    startYear: "2015",
    endYear: "2018",
    description:
      "Netzwerksicherheit, Product Line Engineering, Semantische Technologien, Mensch-Computer-Interaktion, Requirements Engineering, Software-Architektur",
  },
  {
    degree: "Bachelor of Technology in Informationstechnologie",
    institution: "Guru Gobind Singh Indraprastha University",
    location: "Neu-Delhi, Indien",
    startYear: "2008",
    endYear: "2014",
  },
];

export const spokenLanguages = [
  { language: "Hindi", level: "Muttersprache", cefr: null },
  { language: "Englisch", level: "Fortgeschritten", cefr: "C1" },
  { language: "Deutsch", level: "Grundkenntnisse", cefr: "A2" },
];

export const skills = [
  { name: "GCP", category: "cloud" as const },
  { name: "Kubernetes", category: "cloud" as const },
  { name: "Firebase", category: "cloud" as const },
  { name: "AWS", category: "cloud" as const },
  { name: "Cloud Run", category: "cloud" as const },
  { name: "Cloud Functions", category: "cloud" as const },
  { name: "Gravitee APIM", category: "devops" as const },
  { name: "ArgoCD", category: "devops" as const },
  { name: "GitOps", category: "devops" as const },
  { name: "Pulumi", category: "devops" as const },
  { name: "Terraform", category: "devops" as const },
  { name: "Helm", category: "devops" as const },
  { name: "Docker", category: "devops" as const },
  { name: "GitHub Actions", category: "devops" as const },
  { name: "CI/CD", category: "devops" as const },
  { name: "NestJS", category: "backend" as const },
  { name: "Node.js", category: "backend" as const },
  { name: "Express", category: "backend" as const },
  { name: "PostgreSQL", category: "backend" as const },
  { name: "MongoDB", category: "backend" as const },
  { name: "Redis", category: "backend" as const },
  { name: "GraphQL", category: "backend" as const },
  { name: "React", category: "frontend" as const },
  { name: "Next.js", category: "frontend" as const },
  { name: "TypeScript", category: "frontend" as const },
  { name: "Vue.js", category: "frontend" as const },
  { name: "Tailwind CSS", category: "frontend" as const },
  { name: "TypeScript", category: "languages" as const },
  { name: "JavaScript", category: "languages" as const },
  { name: "Python", category: "languages" as const },
  { name: "SQL", category: "languages" as const },
  { name: "Bash", category: "languages" as const },
];

export const navLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/skills", label: "skills" },
  { href: "/contact", label: "contact" },
] as const;
