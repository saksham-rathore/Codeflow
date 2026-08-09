CodeFlow

CodeFlow is an AI-powered developer workspace — a Cursor-style browser code editor that helps you write, edit, debug, and ship code faster with an intelligent coding assistant baked right into the UI.

Built with Next.js, Convex, and Clerk, CodeFlow pairs a real code-editing experience (file explorer, tabs, editor panes) with an AI agent sidebar that can read your project, hold a conversation, and help you move through your codebase.

> ⚠️ Actively under development. Expect breaking changes as the editor core, AI agent, and project/file model evolve.

---

## Features

- **Multi-project workspace** — create, switch between, and manage multiple coding projects from a command-driven project list (`cmdk`-powered command dialog included).
- **File explorer** — a VS Code–style tree view for creating, renaming, and nesting files and folders within a project.
- **Code editor** — a tabbed editor view with breadcrumbs and a top navigation bar for moving around a project.
- **AI conversation sidebar** — a persistent, per-project chat interface backed by Convex so context and history stay in sync in real time.
- **Background AI agent pipeline** — long-running or multi-step AI tasks are orchestrated with [Inngest](https://www.inngest.com/) rather than blocking the UI thread.
- **Web-aware AI** — [Firecrawl](https://www.firecrawl.dev/) integration lets the assistant pull in live web content when it needs more context than the codebase alone.
- **Auth out of the box** — [Clerk](https://clerk.com/) handles sign-in/sign-up, with Convex's Clerk integration wiring authenticated users straight into the reactive backend.
- **Real-time backend** — [Convex](https://www.convex.dev/) is the single source of truth for projects, files, and conversations, so UI state updates live across the app without manual refetching.
- **Error monitoring** — [Sentry](https://sentry.io/) is wired in across edge, server, and client boundaries.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router), React 19 |
| Backend / Data | [Convex](https://www.convex.dev/) (reactive database + functions) |
| Auth | [Clerk](https://clerk.com/) |
| AI / LLM | [Vercel AI SDK](https://sdk.vercel.ai/) + [Groq](https://groq.com/) (`@ai-sdk/groq`, `groq-sdk`) |
| Background jobs | [Inngest](https://www.inngest.com/) |
| Web scraping / retrieval | [Firecrawl](https://www.firecrawl.dev/) |
| UI components | Radix UI, shadcn, `cmdk`, `allotment` (resizable panes), Lucide & Hugeicons |
| Styling | Tailwind CSS v4 |
| State management | Zustand |
| Monitoring | Sentry |
| Language | TypeScript |

---

## Project Structure

```
Codeflow/
├── convex/                     # Convex backend: schema, functions, auth config
│   ├── schema.ts
│   ├── projects.ts
│   ├── files.ts
│   ├── conversations.ts
│   └── auth.ts / auth.config.ts
├── features/
│   └── auth/components/         # Auth-gated views (loading, unauthenticated, projects)
├── src/
│   ├── app/                    # Next.js App Router routes
│   │   ├── projects/           # Projects list + individual project workspace
│   │   ├── sign-in/, sign-up/  # Clerk auth pages
│   │   └── api/inngest/        # Inngest webhook route
│   ├── features/
│   │   ├── editor/             # Code editor, editor store, top nav, breadcrumbs
│   │   ├── conversations/      # AI chat sidebar
│   │   └── projects/           # File explorer, project views, project hooks
│   ├── inngest/                # Inngest client + background functions
│   ├── components/ui/          # shadcn/Radix-based UI primitives
│   └── lib/                    # Shared utilities (Firecrawl client, helpers)
├── AGENTS.md / CLAUDE.md        # Notes for AI coding agents working in this repo
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Convex](https://www.convex.dev/) account/project
- A [Clerk](https://clerk.com/) application
- A [Groq](https://groq.com/) API key
- A [Firecrawl](https://www.firecrawl.dev/) API key (optional, for web-aware AI features)

### 1. Clone and install

```bash
git clone https://github.com/saksham-rathore/Codeflow.git
cd Codeflow
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```bash
# Convex
NEXT_PUBLIC_CONVEX_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# AI
GROQ_API_KEY=
FIRECRAWL_API_KEY=

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

# Sentry (optional)
NEXT_PUBLIC_SENTRY_DSN=
```

### 3. Set up Convex

```bash
npx convex dev
```

This starts the Convex dev deployment and syncs your schema/functions in `convex/`.

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## Roadmap

- [ ] In-browser code execution (WebContainer-style sandboxing)
- [ ] AI-powered inline autocomplete / ghost text in the editor
- [ ] Cmd+K quick-edit for AI-assisted refactors
- [ ] Richer file operations (drag-and-drop, multi-select, bulk actions)
- [ ] Deployment/preview integration

---

## Contributing

This is currently a solo, actively evolving project. Issues and PRs are welcome, but expect the architecture to shift as core editor and AI agent features are built out.

## License

No license specified yet — all rights reserved by default until one is added.
