---
title: 'Personal Portfolio Website'
slug: 'personal-portfolio-website'
created: '2026-01-29'
status: 'ready-for-dev'
stepsCompleted: [1, 2, 3, 4]
tech_stack:
  - Next.js 14+ (App Router)
  - TypeScript (strict mode)
  - Tailwind CSS
  - next-themes
  - '@react-pdf/renderer'
  - Vercel
files_to_create:
  - package.json
  - tsconfig.json
  - tailwind.config.ts
  - next.config.ts
  - app/layout.tsx
  - app/page.tsx
  - app/about/page.tsx
  - app/skills/page.tsx
  - app/contact/page.tsx
  - app/api/cv/route.ts
  - components/layout/*
  - components/ui/*
  - lib/data.ts
  - lib/utils.ts
  - lib/cv-template.tsx
code_patterns:
  - App Router with server components by default
  - Client components only when needed (interactivity)
  - Tailwind for all styling
  - CSS variables for theming (dark/light mode)
  - Single data source for site + PDF
---

# Tech-Spec: Personal Portfolio Website

**Created:** 2026-01-29

## Overview

### Problem Statement

pg needs a professional portfolio website that showcases his career as a Senior Software Engineer. The site must demonstrate engineering quality and include a practical feature: on-the-fly ATS-friendly CV generation.

### Solution

Build a lean Next.js 14+ portfolio with TypeScript, Tailwind CSS, dark mode, and a PDF CV generator. Single data source powers both the website and downloadable CV.

### Scope

**In Scope:**
- Next.js 14+ with App Router
- TypeScript strict mode
- Tailwind CSS + dark/light mode
- 4 pages: Home, About, Skills, Contact
- PDF CV generation via API route (ATS-friendly)
- Responsive design
- Basic SEO (meta tags, OG)
- Vercel deployment

**Out of Scope:**
- Testing frameworks (manual testing sufficient)
- Animation libraries (CSS only)
- Blog/CMS
- Contact form backend
- Analytics

## Implementation Plan

### Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── skills/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── api/
│   │   └── cv/
│   │       └── route.ts
│   ├── globals.css
│   └── not-found.tsx
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-nav.tsx
│   │   └── theme-toggle.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── section.tsx
│   ├── home/
│   │   └── hero.tsx
│   ├── about/
│   │   └── timeline.tsx
│   ├── skills/
│   │   └── tech-grid.tsx
│   └── contact/
│       └── contact-info.tsx
├── lib/
│   ├── data.ts
│   ├── utils.ts
│   └── cv-template.tsx
├── public/
│   └── og-image.png
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

### Tasks

#### Task 1: Project Initialization
- [ ] 1.1 Initialize Next.js 14+ with TypeScript
- [ ] 1.2 Configure TypeScript strict mode
- [ ] 1.3 Set up Tailwind CSS with theme config
- [ ] 1.4 Add dependencies: next-themes, clsx, tailwind-merge, @react-pdf/renderer
- [ ] 1.5 Create lib/utils.ts with cn helper

#### Task 2: Data Layer
- [ ] 2.1 Create lib/data.ts with all portfolio content
- [ ] 2.2 Define TypeScript types for all data structures
- [ ] 2.3 Populate with updated career info from CV

#### Task 3: Layout System
- [ ] 3.1 Create app/globals.css with CSS variables
- [ ] 3.2 Create app/layout.tsx with ThemeProvider
- [ ] 3.3 Build components/layout/header.tsx
- [ ] 3.4 Build components/layout/footer.tsx
- [ ] 3.5 Build components/layout/theme-toggle.tsx (client)
- [ ] 3.6 Build components/layout/mobile-nav.tsx (client)

#### Task 4: Home Page
- [ ] 4.1 Create components/home/hero.tsx
- [ ] 4.2 Create app/page.tsx with hero + CTA

#### Task 5: About Page
- [ ] 5.1 Create components/about/timeline.tsx
- [ ] 5.2 Create app/about/page.tsx with bio + experience

#### Task 6: Skills Page
- [ ] 6.1 Create components/skills/tech-grid.tsx
- [ ] 6.2 Create app/skills/page.tsx with categorized skills

#### Task 7: Contact Page
- [ ] 7.1 Create components/contact/contact-info.tsx
- [ ] 7.2 Create app/contact/page.tsx

#### Task 8: PDF CV Generation
- [ ] 8.1 Create lib/cv-template.tsx with @react-pdf/renderer
- [ ] 8.2 Create app/api/cv/route.ts to generate PDF
- [ ] 8.3 Add download button to Contact page
- [ ] 8.4 Test ATS compatibility

#### Task 9: SEO and Polish
- [ ] 9.1 Add metadata to all pages
- [ ] 9.2 Create public/og-image.png
- [ ] 9.3 Add not-found.tsx
- [ ] 9.4 Final responsive check

#### Task 10: Deployment
- [ ] 10.1 Deploy to Vercel
- [ ] 10.2 Update README

### Acceptance Criteria

- [ ] AC1: Given fresh clone, when running `npm run dev`, then site loads without errors
- [ ] AC2: Given any page, when clicking nav links, then navigation works
- [ ] AC3: Given light mode, when clicking theme toggle, then switches to dark mode
- [ ] AC4: Given Contact page, when clicking Download CV, then PDF downloads
- [ ] AC5: Given downloaded PDF, when uploaded to ATS parser, then text extracts correctly
- [ ] AC6: Given mobile viewport, when viewing site, then layout is usable
- [ ] AC7: Given production build, when deployed, then all pages load fast

## Content Data

### Personal Info
- Name: Pranav Gautam
- Title: Senior Software Engineer
- Location: Heidelberg, Germany
- Email: pranav.gautam.pro@gmail.com
- GitHub: github.com/bugsbunny5290

### Professional Summary
Senior Software Engineer at Au-Schein GmbH with 7 years of experience building and scaling digital healthcare systems. Evolved from CTO to hands-on platform engineering role. Expert in cloud architecture (GCP), infrastructure as code (Pulumi), and full-stack development.

### Tech Stack
**Cloud & Infrastructure:** GCP, Firebase, Pulumi, Docker, CI/CD
**Backend:** NestJS, Node.js, Python
**Frontend:** Next.js, React, Vue.js, TypeScript
**Languages:** TypeScript, JavaScript, Python, SQL

### Experience
1. **Au-Schein GmbH** (Dec 2019 - Present) - Senior Software Engineer
   - Platform engineering, cloud architecture, technical leadership
   - Previously CTO, transitioned as company matured
   - GCP, Pulumi, NestJS, Next.js, Firebase

2. **GameBuddy GmbH** (Oct 2019 - Dec 2019) - Full Stack Developer
   - React, TypeScript, Angular, Firebase, PostgreSQL

3. **Data4Life** (Nov 2018 - Apr 2019) - Resident Entrepreneur
   - Tech Lead on R&D, prototyping, voice recognition architecture
   - Represented company at HIMSS Orlando

4. **DFKI GmbH** (Feb 2018 - Nov 2018) - Guest Researcher
   - Rule-based dynamic survey system research

5. **Fraunhofer IESE / John Deere** (Oct 2016 - Dec 2016) - UI Designer Intern
   - Speech recognition prototype for MyJohnDeere app

### Education
- **European Masters in Software Engineering** - TU Kaiserslautern + UPM Madrid (2015-2018)
- **B.Tech Information Technology** - GGSIPU (2008-2014)

## Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next-themes": "^0.2.1",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "@react-pdf/renderer": "^3.1.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  }
}
```
