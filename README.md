
# Mwanachi loan — Prototype Repository

This repository contains the mwananchi capstone prototype: a client-side React application that demonstrates how ethically-designed AI agents can assist SACCO lending decisions while preserving oversight, auditability, and dignity.

Key ideas:
- The UI (client/) lets users apply for loans and view assessment results.
- Agent orchestration is simulated via n8n workflows that receive webhook payloads and return structured loan-assessment responses.
- Emphasis on clear decision paths, human escalation (`Hunter`/`Guardian` agents), and explainability in assessment outputs.

## What's in this repo
- `client/` — The full React + Vite + TypeScript frontend (UI, routes, components, services, assets).

Relevant files under `client/`:
- `client/src/services/api.ts` — HTTP client and webhook integration (n8n endpoints).
- `client/src/types/loan.ts` — Domain types used across the UI and services.
- `client/src/pages/AboutPrototypePage.tsx` — About page describing the prototype (displays workflow image).

 ## Preview Image

<img width="1350" height="616" alt="image" src="https://github.com/user-attachments/assets/c55740c0-063c-490a-a5c4-28e87b38ab1c" />

## Quick start (local development)

1. Open a terminal

```bash
cd client
pnpm install
pnpm dev
```

2. Open the URL printed by Vite (usually `http://localhost:5173`).

## Environment

The client reads webhook URLs from `client/.env` (Vite env vars):

- `VITE_N8N_WEBHOOK_URL` — n8n webhook for loan workflow (e.g. `http://localhost:5678/webhook/ujima-loan`).
- `VITE_N8N_CHATBOT_WEBHOOK_URL` — n8n webhook for the Scout/chatbot agent.

If you are running n8n locally use the default local webhook URL. When `import.meta.env.DEV` is true the client falls back to local development proxy endpoints.

## Type checking and build

Run a TypeScript check from the `client` folder:

```bash
cd client
pnpm tsc --noEmit
```

Build for production:

```bash
cd client
pnpm build
```

## How the prototype works (high-level)

- A member submits a loan application in the UI.
- The client posts the application to an n8n webhook (`submitLoanApplication` in `api.ts`).
- n8n runs a workflow with multiple nodes representing `Scout`, `Guardian`, and `Hunter` agents; the workflow returns a structured `LoanWorkflowResponse`.
- The client merges the live workflow response with a local mock assessment to present an explainable result to the user.

## Replacing the workflow image

The About page shows a workflow preview from `client/src/assets/n8n-workflow.svg` (or `client/src/assets/image.png` if present). Replace those files with your real screenshots to display them in the app.

## Contributing

If you'd like me to:
- add CI / GitHub Actions for build/test,
- include deployment notes (Vercel, Netlify), or
- expand architecture documentation (agent responsibilities, data flows),
tell me and I'll add those sections.

## License

Add a license file if you plan to publish this repo. I didn't include one by default.

# Ujima SACCO — Client

This folder contains the client application for the Ujima SACCO prototype.




## Quick start

```bash
cd client
pnpm install
pnpm dev
``


## Notes

- The placeholder `image.png` is currently an SVG file saved with a `.png` extension for convenience; replace it with a proper PNG file if you need raster output.
