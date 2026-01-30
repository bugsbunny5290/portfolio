# Pranav Gautam - Portfolio

Personal portfolio and CV website built with Next.js 16, showcasing professional experience, skills, and providing downloadable CV in multiple formats.

## Live Demo

[pranavgautam.dev](https://pranavgautam.dev) (coming soon)

## Features

- **Bilingual Support** - Full English and German translations with language toggle
- **Dynamic CV Generation** - Download CV as PDF or Word document in both languages
- **Dark/Light Mode** - System preference detection with manual toggle
- **Responsive Design** - Mobile-first approach, works on all devices
- **ATS-Friendly CV** - Generated CVs optimized for Applicant Tracking Systems
- **Accessible** - WCAG compliant with proper ARIA labels and semantic HTML

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 4 |
| PDF Generation | @react-pdf/renderer |
| Word Generation | docx |
| Theme | next-themes |
| Linting | Biome |
| CI/CD | GitHub Actions + Vercel |

## Getting Started

### Prerequisites

- Node.js 22+
- npm 10+

### Installation

```bash
# Clone the repository
git clone git@github.com:bugsbunny5290/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run Biome linter |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format code with Biome |
| `npm run check` | Run all Biome checks |
| `npm run typecheck` | TypeScript type checking |

## Project Structure

```
portfolio/
├── app/                    # Next.js App Router pages
│   ├── api/cv/            # CV generation API route
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── skills/            # Skills page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles + Tailwind
├── components/
│   ├── about/             # About page components
│   ├── contact/           # Contact page components
│   ├── home/              # Home page components
│   ├── layout/            # Header, Footer, Navigation
│   ├── skills/            # Skills page components
│   ├── ui/                # Reusable UI components
│   └── providers.tsx      # Theme + Language providers
├── lib/
│   ├── data.ts            # English content/data
│   ├── data-de.ts         # German content/data
│   ├── cv-template.tsx    # PDF CV template
│   ├── cv-docx.ts         # Word CV generator
│   ├── language-context.tsx # i18n context
│   └── utils.ts           # Utility functions
├── .github/workflows/     # CI pipeline
└── biome.json             # Linter configuration
```

## CV Download API

The CV is generated dynamically via API routes:

```
GET /api/cv?lang=en&format=pdf   # English PDF
GET /api/cv?lang=de&format=pdf   # German PDF
GET /api/cv?lang=en&format=docx  # English Word
GET /api/cv?lang=de&format=docx  # German Word
```

## Deployment

This project is configured for deployment on Vercel:

1. Push to GitHub
2. Import repository in Vercel
3. Deploy automatically

GitHub Actions runs lint and type checks on every PR.

## License

MIT

## Contact

- Email: pranav.gautam.pro@gmail.com
- GitHub: [@bugsbunny5290](https://github.com/bugsbunny5290)
- LinkedIn: [pranavgautam](https://linkedin.com/in/pranavgautam)
