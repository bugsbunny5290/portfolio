export const personalInfo = {
  name: "Pranav Gautam",
  title: "Senior Software Engineer",
  tagline:
    "Entwicklung skalierbarer Systeme an der Schnittstelle von Cloud-Architektur und Platform Engineering",
  location: "Heidelberg, Deutschland",
  email: "pranav.gautam.pro@gmail.com",
  github: "https://github.com/bugsbunny5290",
  linkedin: "https://linkedin.com/in/pranavgautam",
} as const;

export const professionalSummary = `Senior Software Engineer bei DrAnsay AU-Schein GmbH mit 7 Jahren Erfahrung in der Entwicklung und Skalierung digitaler Gesundheitssysteme. Vom CTO zur praxisorientierten Platform-Engineering-Rolle gewechselt, mit Fokus auf Cloud-Architektur, Infrastructure as Code und technische Führung. Leidenschaft für robuste, wartbare Systeme, die echten Mehrwert liefern.`;

export interface Skill {
  name: string;
  category: "cloud" | "backend" | "frontend" | "devops" | "languages";
}

export const skills: Skill[] = [
  { name: "GCP", category: "cloud" },
  { name: "Firebase", category: "cloud" },
  { name: "AWS", category: "cloud" },
  { name: "Pulumi", category: "devops" },
  { name: "Docker", category: "devops" },
  { name: "CI/CD", category: "devops" },
  { name: "GitHub Actions", category: "devops" },
  { name: "NestJS", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Next.js", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Vue.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "TypeScript", category: "languages" },
  { name: "JavaScript", category: "languages" },
  { name: "Python", category: "languages" },
  { name: "SQL", category: "languages" },
];

export const skillCategories = {
  cloud: { label: "Cloud & Infrastruktur", icon: "cloud" },
  backend: { label: "Backend", icon: "server" },
  frontend: { label: "Frontend", icon: "layout" },
  devops: { label: "DevOps", icon: "git" },
  languages: { label: "Programmiersprachen", icon: "code" },
} as const;

export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export const whatIDo = [
  {
    title: "Platform Engineering",
    description:
      "Aufbau und Wartung von Cloud-Infrastruktur, CI/CD-Pipelines und Entwickler-Tools, die Teams schneller liefern lassen.",
  },
  {
    title: "API-Design & Architektur",
    description:
      "Entwurf robuster, skalierbarer APIs und Microservices. Integration von Drittanbietersystemen wie Zahlungsanbietern und Logistikplattformen.",
  },
  {
    title: "Technische Führung",
    description:
      "Beratung von Entwicklern bei Architekturentscheidungen, Durchführung von Code Reviews und Mentoring von Teammitgliedern.",
  },
  {
    title: "Full-Stack-Entwicklung",
    description:
      "End-to-End Feature-Entwicklung vom Datenbankdesign bis zur Frontend-Implementierung.",
  },
];

export const experiences: Experience[] = [
  {
    company: "DrAnsay AU-Schein GmbH",
    role: "Senior Software Engineer",
    location: "Hamburg, Deutschland (Remote aus Heidelberg)",
    startDate: "Dez 2019",
    endDate: "Heute",
    description:
      "Platform Engineering und Cloud-Architektur für digitale Gesundheitsplattform zur Ausstellung von Krankmeldungen. Zuvor als CTO tätig, dann Wechsel zur praxisorientierten Engineering-Rolle mit Unternehmenswachstum.",
    highlights: [
      "Architektur und Wartung der Microservices-Infrastruktur auf GCP",
      "Implementierung von Infrastructure as Code mit Pulumi",
      "Design und Entwicklung von RESTful APIs für Web- und Mobile-Clients",
      "Integration von Zahlungssystemen (PayPal, Adyen), Logistik (Deutsche Post) und Gesundheits-APIs",
      "Leitung technischer Entscheidungen und Beratung von Entwicklern zu Architektur und Best Practices",
      "Mentoring des Entwicklungsteams und Durchführung von Code Reviews",
    ],
    technologies: ["GCP", "Pulumi", "NestJS", "Next.js", "Firebase", "TypeScript", "Adyen"],
  },
  {
    company: "GameBuddy GmbH",
    role: "Full Stack Developer",
    location: "Hamburg, Deutschland",
    startDate: "Okt 2019",
    endDate: "Dez 2019",
    description:
      "Full-Stack-Entwicklung für eine soziale Gaming-Plattform. Kurzes Engagement vor dem Wechsel zu Au-Schein, aber wertvolle Erfahrungen mit modernen Frontend-Frameworks und Echtzeit-Datensystemen.",
    highlights: [
      "Entwicklung interaktiver UI-Komponenten mit React und TypeScript",
      "Implementierung von Echtzeit-Features mit Firebase Realtime Database",
      "Arbeit mit PostgreSQL für persistente Datenspeicherung und komplexe Abfragen",
      "Zusammenarbeit im agilen Team mit schnellen Iterationszyklen",
    ],
    technologies: ["React", "TypeScript", "Angular", "Firebase", "PostgreSQL"],
  },
  {
    company: "Data4Life",
    role: "Resident Entrepreneur",
    location: "Potsdam, Deutschland",
    startDate: "Nov 2018",
    endDate: "Apr 2019",
    description:
      "Ausgewählt für das renommierte Resident Entrepreneur Programm der Health Cloud Initiative des Hasso-Plattner-Instituts. Leitung von F&E-Aktivitäten an der Schnittstelle von Forschung und praktischen Gesundheitsanwendungen.",
    highlights: [
      "Erstellung von Architekturkonzepten für Spracherkennungssoftware und Datenerfassungsplattform",
      "Entwicklung funktionaler Prototypen zur Validierung von Produkthypothesen",
      "Vertretung von Data4Life auf der HIMSS 2019 in Orlando, Demonstration von Produkten an potenzielle Partner",
      "Durchführung technischer Interviews und Rekrutierung des Mobile-Entwicklungsteams für Barcelona",
    ],
    technologies: ["Node.js", "Prototyping", "Technische Architektur"],
  },
  {
    company: "DFKI GmbH",
    role: "Gastforscher",
    location: "Kaiserslautern, Deutschland",
    startDate: "Feb 2018",
    endDate: "Nov 2018",
    description:
      "Forschungsposition am Deutschen Forschungszentrum für Künstliche Intelligenz (DFKI), einem der weltweit größten KI-Forschungsinstitute. Fokus auf kontextbewusstes Computing und adaptive Systeme.",
    highlights: [
      "Durchführung einer umfassenden Literaturrecherche zu bestehenden Umfragesystemen",
      "Design und Implementierung einer regelbasierten dynamischen Umfrage-Engine",
      "Integration von Standortdiensten und Wetter-APIs für kontextbewusste Frageverzweigung",
      "Architektur eines erweiterbaren Systems für zukünftige Sensordatenintegration",
      "Veröffentlichung von Forschungsergebnissen und Beitrag zur akademischen Wissensbasis",
    ],
    technologies: ["JavaScript", "Node.js", "REST APIs", "Context-Aware Computing", "Forschung"],
  },
  {
    company: "Fraunhofer IESE / John Deere ETIC",
    role: "UI Designer Praktikant",
    location: "Kaiserslautern, Deutschland",
    startDate: "Okt 2016",
    endDate: "Dez 2016",
    description:
      "Industriekooperation zwischen dem Fraunhofer-Institut für Experimentelles Software Engineering und dem John Deere European Technology Innovation Center. Teil eines Master-Teamprojekts zur Entwicklung von Landwirtschaftstechnologie-Interfaces.",
    highlights: [
      "Design intuitiver UI-Screens für Spracherkennungsfunktion für Landwirte auf schweren Maschinen",
      "Erstellung von Wireframes und interaktiven Prototypen nach John Deeres Design-System",
      "Pair Programming mit erfahrenen Entwicklern zur Beschleunigung der Lernkurve",
      "Teilnahme an SCRUM-Zeremonien inkl. Daily Standups, Sprint Planning und Retrospektiven",
      "Prototyp erfolgreich vor Stakeholdern präsentiert und später in MyJohnDeere App integriert",
    ],
    technologies: ["UI/UX Design", "Wireframing", "SCRUM", "Agile", "Spracherkennung"],
  },
];

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  description?: string;
}

export const education: Education[] = [
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

export const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/about", label: "Über mich" },
  { href: "/skills", label: "Fähigkeiten" },
  { href: "/contact", label: "Kontakt" },
] as const;

// UI Translations
export const ui = {
  hero: {
    greeting: "Hallo, ich bin",
    yearsExperience: "Jahre Erfahrung",
    currentRole: "Aktuelle Rolle",
    focus: "Fokus",
    aboutMe: "Über mich",
    getInTouch: "Kontakt",
    downloadCV: "Lebenslauf",
  },
  about: {
    title: "Über mich",
    subtitle: "Mein beruflicher Werdegang und Erfahrung",
    whatIDo: "Was ich mache",
    experience: "Berufserfahrung",
    education: "Ausbildung",
  },
  skills: {
    title: "Fähigkeiten & Technologien",
    subtitle: "Die Tools und Technologien, mit denen ich arbeite",
  },
  contact: {
    title: "Kontakt aufnehmen",
    subtitle: "Nehmen Sie gerne Kontakt auf für Möglichkeiten oder Zusammenarbeit",
    email: "E-Mail",
    location: "Standort",
    cvResume: "Lebenslauf",
    downloadPdf: "PDF herunterladen",
    downloadWord: "Word herunterladen",
  },
  footer: {
    allRightsReserved: "Alle Rechte vorbehalten.",
  },
  nav: {
    home: "Startseite",
    about: "Über mich",
    skills: "Fähigkeiten",
    contact: "Kontakt",
  },
};
