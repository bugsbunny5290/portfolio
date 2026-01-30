export const personalInfo = {
  name: "Pranav Gautam",
  title: "Senior Software Engineer",
  tagline: "Building scalable systems at the intersection of cloud architecture and platform engineering",
  location: "Heidelberg, Germany",
  email: "pranav.gautam.pro@gmail.com",
  github: "https://github.com/bugsbunny5290",
  linkedin: "https://linkedin.com/in/pranavgautam",
} as const;

export const professionalSummary = `Senior Software Engineer at DrAnsay AU-Schein GmbH with 7 years of experience building and scaling digital healthcare systems. Evolved from CTO to hands-on platform engineering role, focusing on cloud architecture, infrastructure as code, and technical leadership. Passionate about building robust, maintainable systems that deliver real value.`;

export const whatIDo = [
  {
    title: "Platform Engineering",
    description: "Building and maintaining cloud infrastructure, CI/CD pipelines, and developer tooling that enables teams to ship faster.",
  },
  {
    title: "API Design & Architecture",
    description: "Designing robust, scalable APIs and microservices. Integrating third-party systems like payment providers and logistics platforms.",
  },
  {
    title: "Technical Leadership",
    description: "Consulting engineers on architecture decisions, conducting code reviews, and mentoring team members on best practices.",
  },
  {
    title: "Full-Stack Development",
    description: "End-to-end feature development from database design to frontend implementation when needed.",
  },
];

export const experiences = [
  {
    company: "DrAnsay AU-Schein GmbH",
    role: "Senior Software Engineer",
    location: "Hamburg, Germany (Remote from Heidelberg)",
    startDate: "Dec 2019",
    endDate: "Present",
    description:
      "Platform engineering and cloud architecture for digital healthcare platform providing sick leave certificates. Previously served as CTO, transitioned to hands-on engineering as company matured.",
    highlights: [
      "Architected and maintain microservices infrastructure on GCP",
      "Implemented infrastructure as code using Pulumi",
      "Designed and built RESTful APIs powering web and mobile clients",
      "Integrated payment systems (PayPal, Adyen), logistics (Deutsche Post), and healthcare APIs",
      "Lead technical decisions and consult engineers on architecture and best practices",
      "Mentor development team and conduct code reviews",
    ],
    technologies: ["GCP", "Pulumi", "NestJS", "Next.js", "Firebase", "TypeScript", "Adyen"],
  },
  {
    company: "GameBuddy GmbH",
    role: "Full Stack Developer",
    location: "Hamburg, Germany",
    startDate: "Oct 2019",
    endDate: "Dec 2019",
    description:
      "Full stack development for a social gaming platform connecting gamers. Short engagement before transitioning to Au-Schein, but gained valuable experience with modern frontend frameworks and real-time data systems.",
    highlights: [
      "Built interactive UI components using React with TypeScript for type-safe development",
      "Implemented real-time features using Firebase Realtime Database for live gaming sessions",
      "Worked with PostgreSQL for persistent data storage and complex queries",
      "Collaborated in agile team environment with rapid iteration cycles",
    ],
    technologies: ["React", "TypeScript", "Angular", "Firebase", "PostgreSQL"],
  },
  {
    company: "Data4Life",
    role: "Resident Entrepreneur",
    location: "Potsdam, Germany",
    startDate: "Nov 2018",
    endDate: "Apr 2019",
    description:
      "Selected for prestigious Resident Entrepreneur program at Hasso Plattner Institute's health cloud initiative. Led R&D efforts bridging cutting-edge research with practical healthcare applications, wearing multiple hats from technical architecture to international representation.",
    highlights: [
      "Created architectural concepts for voice recognition software and data collection platform",
      "Built functional prototypes to validate product hypotheses before full development investment",
      "Represented Data4Life at HIMSS 2019 in Orlando, demonstrating products to potential partners",
      "Conducted technical interviews and recruited mobile development team for Barcelona office expansion",
    ],
    technologies: ["Node.js", "Prototyping", "Technical Architecture"],
  },
  {
    company: "DFKI GmbH",
    role: "Guest Researcher",
    location: "Kaiserslautern, Germany",
    startDate: "Feb 2018",
    endDate: "Nov 2018",
    description:
      "Research position at German Research Center for Artificial Intelligence (DFKI), one of the world's largest AI research institutions. Focused on context-aware computing and adaptive systems research.",
    highlights: [
      "Conducted comprehensive literature review of existing survey systems, identifying gaps in context-awareness",
      "Designed and implemented rule-based dynamic survey engine that adapts questions based on external factors",
      "Integrated location services and weather APIs to demonstrate context-aware question branching",
      "Architected extensible system for future sensor data integration (accelerometer, heart rate, etc.)",
      "Published research findings and contributed to academic knowledge base",
    ],
    technologies: ["JavaScript", "Node.js", "REST APIs", "Context-Aware Computing", "Research"],
  },
  {
    company: "Fraunhofer IESE / John Deere ETIC",
    role: "UI Designer Intern",
    location: "Kaiserslautern, Germany",
    startDate: "Oct 2016",
    endDate: "Dec 2016",
    description:
      "Industry collaboration between Fraunhofer Institute for Experimental Software Engineering and John Deere European Technology Innovation Center. Part of Master's program team project developing next-generation agricultural technology interfaces.",
    highlights: [
      "Designed intuitive UI screens for speech recognition feature targeting farmers operating heavy machinery",
      "Created wireframes and interactive prototypes following John Deere's design system guidelines",
      "Practiced pair programming with experienced developers, accelerating learning curve",
      "Participated in SCRUM ceremonies including daily standups, sprint planning, and retrospectives",
      "Prototype successfully demonstrated to stakeholders and later integrated into MyJohnDeere mobile app",
    ],
    technologies: ["UI/UX Design", "Wireframing", "SCRUM", "Agile", "Speech Recognition"],
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

export const skills = [
  { name: "GCP", category: "cloud" as const },
  { name: "Firebase", category: "cloud" as const },
  { name: "AWS", category: "cloud" as const },
  { name: "Pulumi", category: "devops" as const },
  { name: "Docker", category: "devops" as const },
  { name: "CI/CD", category: "devops" as const },
  { name: "GitHub Actions", category: "devops" as const },
  { name: "NestJS", category: "backend" as const },
  { name: "Node.js", category: "backend" as const },
  { name: "Express", category: "backend" as const },
  { name: "PostgreSQL", category: "backend" as const },
  { name: "Next.js", category: "frontend" as const },
  { name: "React", category: "frontend" as const },
  { name: "Vue.js", category: "frontend" as const },
  { name: "Tailwind CSS", category: "frontend" as const },
  { name: "TypeScript", category: "languages" as const },
  { name: "JavaScript", category: "languages" as const },
  { name: "Python", category: "languages" as const },
  { name: "SQL", category: "languages" as const },
];

export const navLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/skills", label: "skills" },
  { href: "/contact", label: "contact" },
] as const;
