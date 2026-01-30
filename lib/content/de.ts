export const personalInfo = {
  name: "Pranav Gautam",
  title: "Staff Engineer",
  tagline: "Entwicklung skalierbarer Systeme an der Schnittstelle von Cloud-Architektur und Platform Engineering",
  location: "Heidelberg, Deutschland",
  email: "pranav.gautam.pro@gmail.com",
  website: "https://pranavgautam.me",
  github: "https://github.com/bugsbunny5290",
  linkedin: "https://linkedin.com/in/pranavgautam",
} as const;

export const professionalSummary = `Staff Engineer mit 8+ Jahren Erfahrung im Aufbau und der Skalierung digitaler Systeme in den Bereichen Gesundheitswesen, Gaming und KI-Forschung. Ehemaliger CTO bei DrAnsay AU-Schein GmbH, jetzt fokussiert auf praxisorientiertes Platform Engineering. Nachgewiesene Erfolgsbilanz beim Wachstum von Startups vom Frühstadium zu etablierten Unternehmen. Zusammenarbeit mit renommierten Institutionen wie DFKI (Deutsches Forschungszentrum für Künstliche Intelligenz), Data4Life (Hasso-Plattner-Institut), Fraunhofer und John Deere. Experte für Cloud-Architektur, Kubernetes und Infrastructure as Code.`;

export const whatIDo = [
  {
    title: "Platform Engineering",
    description: "Aufbau und Wartung von Cloud-Infrastruktur, CI/CD-Pipelines und Entwickler-Tools, die Teams schneller liefern lassen.",
  },
  {
    title: "API-Design & Architektur",
    description: "Entwurf robuster, skalierbarer APIs und Microservices. Integration von Drittanbietersystemen wie Zahlungsanbietern und Logistikplattformen.",
  },
  {
    title: "Technische Führung",
    description: "Beratung von Entwicklern bei Architekturentscheidungen, Durchführung von Code Reviews und Mentoring von Teammitgliedern.",
  },
  {
    title: "Full-Stack-Entwicklung",
    description: "End-to-End Feature-Entwicklung vom Datenbankdesign bis zur Frontend-Implementierung.",
  },
];

export const experiences = [
  {
    company: "DrAnsay AU-Schein GmbH",
    role: "Staff Engineer",
    location: "Hamburg, Deutschland (Remote aus Heidelberg)",
    startDate: "Dez 2019",
    endDate: "Heute",
    description:
      "Platform Engineering und Cloud-Architektur für digitale Gesundheitsplattform zur Ausstellung von Krankmeldungen. Zuvor als CTO tätig, dann Wechsel zur praxisorientierten Engineering-Rolle mit Unternehmenswachstum.",
    highlights: [
      "Architektur und Wartung der Microservices-Infrastruktur auf GCP",
      "Leitung der Transformation von Cloud Functions zu Managed APIs auf Kubernetes (GKE)",
      "Implementierung von GitOps-Workflows und CI/CD-Pipelines für automatisierte Deployments",
      "Einrichtung eines API-Management-Portals mit Gravitee für Developer Experience und Governance",
      "Implementierung von Infrastructure as Code mit Pulumi",
      "Design und Entwicklung von RESTful APIs für Web- und Mobile-Clients",
      "Integration von Zahlungssystemen (PayPal, Adyen), Logistik (Deutsche Post) und Gesundheits-APIs",
      "Leitung technischer Entscheidungen und Beratung von Entwicklern zu Architektur und Best Practices",
    ],
    technologies: ["GCP", "Kubernetes", "Pulumi", "Gravitee", "GitOps", "NestJS", "Next.js", "TypeScript"],
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

export const skills = [
  { name: "GCP", category: "cloud" as const },
  { name: "Kubernetes", category: "cloud" as const },
  { name: "Firebase", category: "cloud" as const },
  { name: "AWS", category: "cloud" as const },
  { name: "Cloud Run", category: "cloud" as const },
  { name: "Cloud Functions", category: "cloud" as const },
  { name: "Pulumi", category: "devops" as const },
  { name: "Terraform", category: "devops" as const },
  { name: "GitOps", category: "devops" as const },
  { name: "ArgoCD", category: "devops" as const },
  { name: "Docker", category: "devops" as const },
  { name: "Helm", category: "devops" as const },
  { name: "CI/CD", category: "devops" as const },
  { name: "GitHub Actions", category: "devops" as const },
  { name: "Gravitee", category: "devops" as const },
  { name: "NestJS", category: "backend" as const },
  { name: "Node.js", category: "backend" as const },
  { name: "Express", category: "backend" as const },
  { name: "PostgreSQL", category: "backend" as const },
  { name: "MongoDB", category: "backend" as const },
  { name: "Redis", category: "backend" as const },
  { name: "GraphQL", category: "backend" as const },
  { name: "Next.js", category: "frontend" as const },
  { name: "React", category: "frontend" as const },
  { name: "Vue.js", category: "frontend" as const },
  { name: "Angular", category: "frontend" as const },
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
