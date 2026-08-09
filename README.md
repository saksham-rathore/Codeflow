CodeFlow
CodeFlow is an AI-powered developer workspace — a Cursor-style browser code editor for writing, editing, and debugging code with an AI assistant built into the UI.

Built with Next.js, Convex, and Clerk: a real editor experience (file explorer, tabs, panes) paired with an AI sidebar that can read your project and help you move through it.

🚧 Launching soon. Not deployed yet — actively in development, so expect breaking changes.


Features
Multi-project workspace — create and switch projects via a command-driven dialog (cmdk).
File explorer — VS Code–style tree for creating, renaming, and nesting files/folders.
Code editor — tabbed editor with breadcrumbs and top navigation.
AI conversation sidebar — per-project chat, synced in real time via Convex.
Background AI agent pipeline — multi-step AI tasks run through Inngest, off the UI thread.
Web-aware AI — Firecrawl lets the assistant pull in live web content.
Auth — Clerk, wired into Convex for authenticated real-time data.
Error monitoring — Sentry across edge, server, and client.


Tech Stack
Layer
Technology
Framework
Next.js 16 (App Router), React 19
Backend / Data
Convex
Auth
Clerk
AI / LLM
Vercel AI SDK + Groq
Background jobs
Inngest
Web retrieval
Firecrawl
UI
Radix, shadcn, cmdk, allotment, Lucide/Hugeicons
Styling
Tailwind CSS v4
State
Zustand
Monitoring
Sentry
Language
TypeScript



Project Structure
Codeflow/

├── convex/               # Schema, functions, auth config

├── features/auth/        # Auth-gated views

├── src/

│   ├── app/               # Routes (projects, sign-in/up, inngest webhook)

│   ├── features/

│   │   ├── editor/         # Code editor + store

│   │   ├── conversations/  # AI chat sidebar

│   │   └── projects/       # File explorer + project views

│   ├── inngest/            # Background functions

│   ├── components/ui/      # shadcn/Radix primitives

│   └── lib/                # Firecrawl client, utils

└── package.json


Getting Started
Prerequisites: Node 18+, a Convex project, a Clerk app, a Groq API key, (optional) a Firecrawl key.

git clone https://github.com/saksham-rathore/Codeflow.git

cd Codeflow

npm install

Add a .env.local:

NEXT_PUBLIC_CONVEX_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

GROQ_API_KEY=

FIRECRAWL_API_KEY=

INNGEST_EVENT_KEY=

INNGEST_SIGNING_KEY=

NEXT_PUBLIC_SENTRY_DSN=

npx convex dev   # start Convex

npm run dev      # start Next.js — http://localhost:3000


Scripts
Command
Description
npm run dev
Dev server
npm run build
Production build
npm run start
Production server
npm run lint
Lint



Roadmap
Public launch / first deployment
In-browser code execution (WebContainer-style)
AI inline autocomplete (ghost text)
Cmd+K quick-edit for AI refactors
Richer file operations (drag-and-drop, multi-select)


Contributing
Solo project for now — issues and PRs welcome, but expect the architecture to shift pre-launch.
License
None yet — all rights reserved until one is added.
