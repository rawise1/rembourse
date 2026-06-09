# Kolak — Auth UI

A polished, dark-mode authentication screen built as a front-end craft study.
**React 18 + Vite + Tailwind CSS.** No backend, no secrets, no `.env` required —
it's a static UI you run and study.

> This project was rebuilt from scratch. It is intentionally front-end only: the
> login form is a demo (the submit handler does not call any backend). Wire it to
> a real auth provider (e.g. Supabase Auth, Auth0, your own API) before using it
> for anything real.

---

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints (default http://localhost:5173).

```bash
npm run build      # production build → dist/
npm run preview    # preview the build
```

---

## Layout

```
┌───────────────────────────────┬──────────────────────┐
│  BrandPanel (60%)             │  LoginForm (40%)     │
│  logo → heading → sub → image │  title, fields,      │
│  centered, dark + glow        │  social, footer      │
├───────────────────────────────┴──────────────────────┤
│  SiteFooter — nav · language select · © 2026 Kolak    │
└───────────────────────────────────────────────────────┘
```

Below the `lg` breakpoint the brand panel hides and the form takes the full
width.

## Structure

```
src/
├── components/
│   ├── Logo.jsx         # reusable gradient mark + wordmark
│   ├── BrandPanel.jsx   # left 60% — branding + image placeholder
│   ├── LoginForm.jsx    # right 40% — the auth form (demo only)
│   └── SiteFooter.jsx   # full-width footer
├── App.jsx              # grid shell: split + footer
├── main.jsx
└── index.css            # Tailwind + dark-theme base & helpers
```

## Design notes

The look comes from a few disciplined choices, all centralized in
`tailwind.config.js`:

- **Spacing scale** — consistent rhythm from a fixed ladder (4/8/12/16/24/32px).
- **Layered dark surfaces** — never pure black; each surface one step lighter.
- **One accent** — indigo, used only for the primary action and links.
- **Input focus** — animated border + soft glow ring for live feedback.
- **Type hierarchy** — tight tracking on large text, restrained sizes/weights.
- **Accessibility** — real labels, a native `<select>`, reduced-motion support.
