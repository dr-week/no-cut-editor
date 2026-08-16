# OpenCut Setup & Installation Guide

This guide covers installing dependencies and running **OpenCut** on Windows.

---

## 1. Environment Requirements

- **Bun**: v1.3+ (Installed)
- **Node.js**: v24+ (Installed)
- **Rust**: v1.97+ (Optional for Web-only development)
- **Proto / Moon**: (Optional repository tool manager)

---

## 2. Quick Start (Web Application)

### Step 1: Clone Repository
```bash
git clone https://github.com/opencut-app/opencut.git
cd openCUT
```

### Step 2: Install Dependencies
To install dependencies for the web editor:

```bash
cd apps/web
bun install
```

### Step 3: Start Local Development Server
```bash
bun run dev
```

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 3. Available Scripts (`apps/web/package.json`)

| Command | Action |
| --- | --- |
| `bun run dev` | Starts Vite dev server with hot reload |
| `bun run build` | Builds production output |
| `bun run preview` | Previews built production assets |
| `bun run test` | Runs unit tests using Vitest |

---

## 4. Troubleshooting

- **PowerShell Script Execution Policy Error:**
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
  ```
- **Port 5173 in use:** Change the port in `apps/web/package.json` under `"scripts" -> "dev"`.
