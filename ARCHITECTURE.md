# OpenCut Architecture Guide

This document outlines the architecture and directory structure of the **OpenCut** project.

---

## Workspace Structure

OpenCut is structured as a monorepo containing web, desktop, and backend apps:

```
openCUT/
├── apps/
│   ├── web/               # Primary Web Application (React 19, Vite, Tailwind CSS v4)
│   ├── desktop/           # Desktop App wrapper
│   └── api/               # Backend API / Cloudflare Workers service
├── brand/                 # OpenCut logos, SVG icons, and branding assets
├── .prototools            # Pinned tool versions (moon, bun, rust)
├── moon.yml               # Moonrepo task runner configuration
├── SETUP.md               # Setup and installation instructions
├── ARCHITECTURE.md        # Architecture overview (this file)
└── DEVELOPMENT.md         # Customization and feature development guide
```

---

## Tech Stack Overview

| Category | Technology | Purpose |
| --- | --- | --- |
| **Frontend Framework** | React 19 | Component-based UI rendering |
| **Build Tool** | Vite 8 | Ultra-fast HMR dev server & bundler |
| **Routing** | TanStack Router | Type-safe client & SSR routing |
| **Styling** | Tailwind CSS v4 | Utility-first CSS engine |
| **UI Components** | Radix UI / Base UI / Hugeicons | Accessible primitives & icon system |
| **Runtime / Package Mgr** | Bun | Speedy package installer & script runner |

---

## Core Web Application Architecture (`apps/web/src`)

- `routes/`: File-based application routes processed by TanStack Router.
- `components/`: UI modules including timeline, preview monitor, sidebar controls, and toolbars.
- `hooks/`: State management and reactive hooks for video playback and UI state.
- `styles.css`: Global styles and custom CSS utility rules.
