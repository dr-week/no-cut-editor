# OpenCut Development & Customization Guide

This guide explains how to customize OpenCut, add features, and modify the UI.

---

## 1. Customizing the User Interface

### Modifying Routes & Pages
Application routes are located in:
`apps/web/src/routes/`

TanStack Router generates the route tree dynamically in `routeTree.gen.ts`.

### Adding New UI Components
Component primitives and editor controls are located in:
`apps/web/src/components/`

- Use `@hugeicons/react` or `lucide-react` for adding icons.
- UI styling follows Tailwind CSS v4 conventions (`apps/web/src/styles.css`).

---

## 2. Modifying Styles & Themes

Global CSS definitions are stored in [`apps/web/src/styles.css`](file:///d:/CODES/openCUT/apps/web/src/styles.css).

To change color themes or dark mode behavior:
- Modify CSS variables or Tailwind tokens in `styles.css`.
- OpenCut uses `next-themes` for theme toggling (Light/Dark mode).

---

## 3. Running Web Installation & Build Commands

Run these commands inside `apps/web`:

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Production build check
bun run build
```
