export const personalInfo = {
  name: "Pranav Gautam",
  title: "Staff Engineer",
  subtitle: "Staff Engineer · Platform & Backend",
  tagline:
    "Staff Engineer with 8+ years building cloud-native systems at scale. Previously CTO at DrAnsay AU-Schein GmbH — scaled the platform from zero to 2M+ users and ~€200K to €20M ARR. Now focused on platform engineering, distributed systems, and API architecture as an individual contributor.",
  location: "Heidelberg, Germany",
  workAuth: "Work-authorised (EU Blue Card)",
  email: "pranav.gautam.pro@gmail.com",
  website: "https://pranavgautam.me",
  github: "https://github.com/bugsbunny5290",
  linkedin: "https://linkedin.com/in/pranavgautam",
  metaDescription:
    "Staff Engineer with 8+ years in cloud-native systems, GCP, Kubernetes, and API architecture. Previously CTO at DrAnsay (2M+ users, €20M ARR). Based in Heidelberg, Germany.",
} as const;

export const professionalSummary = `I'm a Staff Engineer based in Heidelberg, Germany, with 8+ years of experience designing and scaling cloud-native systems — primarily in healthcare tech and B2C platforms.

My background spans the full arc from researcher to founder to individual contributor. I spent time at DFKI and the Hasso Plattner Institute early in my career, then co-founded and served as CTO at DrAnsay AU-Schein GmbH, where I grew the engineering organisation from 3 to 15 people and the platform to 2M+ users. I deliberately stepped back from management to go deeper on architecture, platform engineering, and systems design — which is where I do my best work.

I'm currently based in Heidelberg, working remotely for a Hamburg-based company.

Outside of work: I'm interested in personal finance systems, European geography, and building tools that make developer workflows faster.`;

export const whatIDo = [
  {
    title: "Technical Strategy",
    description:
      "Defining architecture roadmaps, evaluating build-vs-buy decisions, and making high-impact technical choices that align with business goals.",
  },
  {
    title: "Platform Engineering",
    description:
      "Building cloud infrastructure, CI/CD pipelines, and developer platforms that enable teams to ship faster and more reliably.",
  },
  {
    title: "AI-Assisted Development",
    description:
      "Leveraging AI tools for rapid concept-to-solution prototyping. Accelerating development cycles while maintaining code quality and architectural integrity.",
  },
  {
    title: "Hands-On Execution",
    description:
      "Staying close to the code — architecting systems, writing critical path code, and unblocking teams on tough technical challenges.",
  },
];

export const experiences = [
  {
    company: "DrAnsay AU-Schein GmbH",
    role: "Staff Engineer",
    location: "Hamburg, Germany (Remote from Heidelberg)",
    startDate: "Dec 2019",
    endDate: "Present",
    contextNote:
      "Digital health platform for sick leave certificates. Previously CTO (team of 15); transitioned to Staff Engineer as the organisation scaled to 40 engineers.",
    description:
      "Platform engineering and cloud architecture for a telemedicine platform connecting patients with licensed physicians for online consultations, prescriptions, and digital healthcare services — serving 3M+ patients across Germany. Previously served as CTO, transitioned to hands-on engineering as the company scaled.",
    highlights: [
      "Own end-to-end cloud architecture on GCP — 10+ microservices processing 100K+ requests/day with a P90 SLA commitment.",
      "Reduced production incidents from several per day to approximately twice per month through structured on-call, runbooks, and automated alerting.",
      "Leading platform migration from Cloud Functions to GKE-hosted managed services, improving deployment isolation and enabling independent service scaling.",
      "Implemented GitOps workflows with ArgoCD, enabling multiple production deployments per day with full audit trail and one-click rollback.",
      "Designed and rolled out Gravitee API management platform governing 10+ internal and external APIs; enabled self-service API publishing for the engineering team.",
      "Defined engineering standards, ADR process, and code review culture adopted across a 40-person engineering org.",
      "As CTO: hired and grew engineering from 3 to 15 people; led the technical strategy that took the platform from MVP to €20M ARR.",
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
    company: "Data4Life · Hasso Plattner Institute",
    role: "Resident Entrepreneur",
    location: "Potsdam, Germany",
    startDate: "Nov 2018",
    endDate: "Apr 2019",
    contextNote: "",
    description: "Selected for a competitive R&D programme at HPI's health cloud initiative.",
    highlights: [
      "Designed architecture for a voice-driven data collection platform; built functional prototypes used to validate product-market fit before full investment.",
      "Represented Data4Life at HIMSS 2019 (Orlando), pitching to healthcare executives and potential partners.",
      "Led technical hiring for the Barcelona mobile team expansion.",
    ],
    technologies: ["Architecture", "Healthcare", "Voice AI", "Prototyping"],
  },
  {
    company: "DFKI GmbH",
    role: "Guest Researcher",
    location: "Kaiserslautern, Germany",
    startDate: "Feb 2018",
    endDate: "Nov 2018",
    contextNote:
      "German Research Center for Artificial Intelligence — one of Europe's largest AI research institutions.",
    description:
      "Research at one of Europe's largest AI research institutions, focused on context-aware computing.",
    highlights: [
      "Researched context-aware survey systems; conducted comprehensive literature review identifying gaps in adaptive question design.",
      "Designed and implemented a rule-based dynamic survey engine adapting questions based on real-time signals (location, weather, sensor data).",
      "Built extensible architecture supporting future biometric sensor integration (accelerometer, heart rate).",
    ],
    technologies: ["Research", "Context-Aware Computing", "Python", "Sensor APIs"],
  },
  {
    company: "Fraunhofer IESE · John Deere ETIC",
    role: "UI Designer (Industry Project)",
    location: "Kaiserslautern, Germany",
    startDate: "Oct 2016",
    endDate: "Dec 2016",
    contextNote: "",
    description: "Joint Fraunhofer–John Deere project for agricultural technology interfaces.",
    highlights: [
      "Designed speech recognition UI for agricultural machinery operators as part of a joint Fraunhofer–John Deere project.",
      "Delivered wireframes and interactive prototypes aligned to John Deere's design system.",
    ],
    technologies: ["UI Design", "Prototyping", "Agile", "Figma"],
  },
];

export const education = [
  {
    degree: "European Masters in Software Engineering",
    institution: "TU Kaiserslautern & Universidad Politécnica de Madrid",
    location: "Germany & Spain",
    startYear: "2015",
    endYear: "2018",
    description:
      "Network Security, Product Line Engineering, Semantic Technologies, Human Computer Interaction, Requirements Engineering, Software Architecture",
  },
  {
    degree: "Bachelor of Technology in Information Technology",
    institution: "Guru Gobind Singh Indraprastha University",
    location: "New Delhi, India",
    startYear: "2008",
    endYear: "2014",
  },
];

export const spokenLanguages = [
  { language: "Hindi", level: "Native", cefr: null },
  { language: "English", level: "Advanced", cefr: "C1" },
  { language: "German", level: "Elementary", cefr: "A2" },
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
