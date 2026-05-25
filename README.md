# Repoid

Repoid is a technical interview preparation platform that adapts to your domain and your actual projects. Rather than generic question banks, it generates questions from your GitHub repositories, runs structured interview rounds, tracks your readiness over time, and surfaces the specific topics where you are weakest.

Live at [repoid.space](https://repoid.space)

---

## Overview

Most interview prep tools give you the same static question list regardless of what you have built or what role you are targeting. Repoid takes a different approach: you pick a domain, optionally attach a GitHub repository, and the platform generates a curated prep path specific to your stack and your gaps.

The product is designed for software engineers, data practitioners, and security professionals preparing for technical interviews at any level — from first jobs to senior and FAANG-track roles.

---

## Screenshot

<!-- Attach a screenshot of the dashboard or the question bank view here -->

---

## Features

### Domain Selection

When you sign up, you choose a primary technical domain. The six supported domains are:

- Frontend Engineering
- Backend Engineering
- AI / Machine Learning
- Data Science
- Data Analytics
- Cybersecurity

Your domain selection controls which question banks are loaded, which topics appear in the Question Bank, and which round types are surfaced.

### Question Bank

The Question Bank is a browsable, filterable database of curated interview questions. Each question is tagged by domain, topic, and type.

**Question types available:**

| Type | Description |
|---|---|
| Concept MCQ | Multiple-choice questions testing conceptual knowledge |
| Fill in the Blank | Targeted recall questions for syntax, definitions, and key terms |
| Scenario | Open-ended situational questions requiring analysis and explanation |
| Architecture | System-design and design-decision questions |
| Coding Round | Algorithm and implementation problems |
| Mock Interview | Conversational Q&A simulating an interviewer asking follow-ups |
| FAANG Tagged | Questions drawn from known FAANG interview patterns |

You can filter by topic within your active domain, or by question type. Selecting a question shows a full answer breakdown with structured key points.

### Interview Rounds

Repoid offers four distinct round types, each simulating a different stage of a real technical interview.

**Practice Round**

A classic question-and-answer flow. You are shown one question at a time, write your answer or record a voice answer, and receive a structured score with key-point feedback. Supports voice input via Web Speech API. Sessions are saved to history.

**Coding Round**

An in-browser coding environment with a Monaco-based editor, language selection, and test case output. Problems are AI-generated based on your domain and chosen topic. Submissions are evaluated automatically and scored.

**Scenario Round**

You are given a contextual technical scenario — for example, designing a service, debugging a system, or choosing between architectural approaches — and must walk through your thinking. The AI evaluator scores your answer and explains the expected reasoning. Topics can be typed freely or chosen from a suggested tag cloud.

**Mock Interview**

A multi-turn conversational interview simulation. The AI acts as the interviewer, asks an opening question, and follows up based on your response. Designed to practice live verbal reasoning and progressive answer depth.

### GitHub Repository Scanner

You can attach any public or private GitHub repository to your Repoid workspace. The scanner:

1. Fetches the repository structure and key source files
2. Sends the codebase to the AI for analysis
3. Generates a set of interview questions specific to the technologies, patterns, and decisions visible in your code

Questions generated from your repos are tied to that repo record and are available in a dedicated view separate from the curated question bank. This makes your prep directly relevant to what you have actually built and can speak to in an interview.

### Readiness and Analytics

The Dashboard aggregates your activity into a readiness score across practice sessions, rounds, and the question bank. It surfaces:

- Overall readiness percentage
- Per-topic strength and weakness breakdown
- Recent session history with scores
- Suggested focus areas based on your lowest-scoring topics

### Saved Sessions and History

All round attempts — practice, coding, scenario, and mock — are saved to your account. You can review any past attempt, revisit questions you answered incorrectly, and track how your score on a topic has changed over time.

### PDF Export

On the Yearly plan, you can export any session or round attempt as a PDF for offline review or sharing. Useful for placement seasons where you want to keep annotated notes.

### Settings

From the Settings page you can change your display name, email, password, active domain, and theme preference (light or dark). Theme preference persists across sessions.

---

## Pricing

Repoid uses a usage-based tiered model. All plans include the full question bank and all question types.

| Plan | Price | Rounds | Repo Scans | PDF Export |
|---|---|---|---|---|
| Free | Free forever | 3 coding, 3 scenario, 3 mock per month | 3 total | No |
| Monthly | 99 INR per 3 months | Unlimited | 7 per month | No |
| Yearly | 299 INR per year | Unlimited | Unlimited | Yes |

Payments are processed via Razorpay. Upgrades and downgrades take effect immediately. Your saved sessions and history are preserved across plan changes.

---

## Screenshot

<!-- Attach a screenshot of a coding round or scenario round in progress here -->

---

## Local Development

### Prerequisites

- Node.js 20 or later
- A Neon PostgreSQL database (or any PostgreSQL instance)
- A DeepSeek API key for question generation and answer evaluation
- A GitHub OAuth app (client ID and secret) for repository scanning
- A Razorpay key pair for payments (can be skipped if not testing billing)
- A nodemailer-compatible SMTP config for OTP emails (can be a Gmail app password)

### Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/SATWIKKKKK/AutoMata.git
cd AutoMata
npm install
```

Copy the environment template and fill in your values:

```bash
cp .env.example .env   # or create .env manually
```

Required environment variables:

```
DATABASE_URL=           # PostgreSQL connection string (Neon or self-hosted)
SESSION_SECRET=         # Random secret for session cookies (use openssl rand -hex 32)
DEEPSEEK_API_KEY=       # DeepSeek API key for AI-powered rounds
GITHUB_CLIENT_ID=       # GitHub OAuth app client ID
GITHUB_CLIENT_SECRET=   # GitHub OAuth app client secret
GITHUB_TOKEN=           # GitHub personal access token for repo scanning
SMTP_HOST=              # SMTP host for email OTP
SMTP_PORT=              # SMTP port (e.g. 587)
SMTP_USER=              # SMTP username / email address
SMTP_PASS=              # SMTP password or app password
RAZORPAY_KEY_ID=        # Razorpay key ID (omit if not testing payments)
RAZORPAY_KEY_SECRET=    # Razorpay key secret
```

Run the database migration:

```bash
npm run db:migrate
```

Start the development server (Express + Vite in one process):

```bash
npm run dev
```

The app runs at `http://localhost:3000` by default.

For a split process setup where the API and frontend run independently:

```bash
# Terminal 1 — API server on port 3110
npm run dev:server

# Terminal 2 — Vite frontend on port 3109 (proxies /api to 3110)
npm run dev:client
```

### Other commands

```bash
npm run build       # Production Vite build (outputs to dist/)
npm run lint        # TypeScript type-check (no emit)
npm run preview     # Serve the production build locally
npm run db:migrate  # Run pending database migrations
```

---

## Project Structure

```
AutoMata/
  server.ts               Express backend (auth, API routes, session, Vite dev embed)
  api/entry.ts            Vercel serverless entry (wraps Express app)
  src/
    App.tsx               React Router route definitions
    views/                Full page components (Dashboard, QuestionBank, rounds, Auth, Settings, ...)
    components/           Shared UI components (Sidebar, Header, RoundShell, ...)
    lib/                  Frontend logic, API clients, billing, question banks, round state
    hooks/                Custom React hooks
    index.css             Tailwind CSS v4 base + design tokens + utility classes
  data/                   Curated question bank markdown files (one per domain)
  prisma/
    schema.prisma         Database schema
    migrations/           SQL migration history
  scripts/
    migrate.ts            Migration runner
```

---

## Deployment

The production app is deployed on Vercel using the configuration in `vercel.json`. The build step runs `npm run build` and the output directory is `dist/`. All `/api/*` requests are routed to `api/entry.ts` as a serverless function.

All environment variables listed above must be set in the Vercel project dashboard under Settings > Environment Variables before deploying.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite 6 |
| Styling | Tailwind CSS v4, custom design tokens |
| Routing | React Router v7 |
| Backend | Express.js on Node.js |
| Database | PostgreSQL via Neon, Prisma ORM |
| AI | DeepSeek API |
| Payments | Razorpay |
| Code Editor | CodeMirror 6 |
| Charts | Recharts |
| Deployment | Vercel |

---

## License

This project is private and not open for redistribution. All rights reserved.
