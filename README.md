# Portfolio OS — by Naim Gerges

[![Live](https://img.shields.io/badge/Live-Portfolio%20OS-0a66ff)](https://ngdevelopment-tech.github.io/naimgerges/)
[![Built with](https://img.shields.io/badge/Built%20with-React%2019%20·%20TypeScript%20·%20Vite-3178c6)](https://vitejs.dev/)

**An interactive macOS desktop you can actually use — and inside it, everything I build.**

This isn't a scrolling PDF. It's a full desktop operating system simulation running in the
browser: a real boot sequence, a lock screen, draggable windows, a dock — and every app
inside it is a chapter of my career. If you want to know what I do, stop reading and start
clicking.

👉 **[Open the live portfolio](https://ngdevelopment-tech.github.io/naimgerges/)**

---

## What's inside

**The portfolio itself** — every chapter of my career, running as its own app:

Projects · Experience · Education · Skills · Licenses & Certifications · Languages · Honors & Awards

Real work, real credentials, real recognitions. Nothing inflated, nothing templated.

**And a few apps that are exactly what they claim to be:**

- **Beat Lab** — a drum kit you can actually play. Every drum sound is written in code.
- **Safari** — opens on a typing game. Your WPM is waiting.
- **FaceTime** — it rings. Answer it.
- **Terminal** — a working shell. Try `neofetch`.
- **Calculator, Notes, Finder, Music, Trash, Tic Tac Toe, Settings, Contact** — all real, all functional.

Everything on screen — the window manager, the sounds, the icons, the games — was designed
and coded from scratch. No templates, no UI kits, no iframes-to-somewhere-else.

## Tech stack

- **React 19 + TypeScript** — strict mode, zero `any` in the app layer
- **Vite 6** — instant HMR, optimized production builds
- **Tailwind CSS 4** — the entire design system
- **WebAudio API** — the startup chime, call tones, key clicks, and every
  Beat Lab drum voice are synthesized or streamed in code
- **Zero backend required** — the whole thing is static; the optional Express server only
  powers a preview passthrough in development

## Run it locally

```bash
git clone https://github.com/ngdevelopment-tech/naimgerges.git
cd naimgerges
npm install
npm run dev        # → http://localhost:3000
```

Production build:

```bash
npm run build      # → dist/
npm run preview    # serve the built bundle locally
```

## How it's organized

```
components/
  apps/            # every app is a self-contained React component
  icons/           # hand-drawn SVG app icons (macOS squircle style)
  Desktop.tsx      # window manager: drag, resize, zoom, minimize, focus
  MenuBar.tsx      # the macOS menu bar with working Apple menu
  LoginScreen.tsx  # lock screen with responsive clock
lib/
  sounds.ts        # WebAudio engine: chime, call tones, key clicks
  portfolioData.ts # ALL resume content lives here — data, not markup
  systemState.ts   # cross-app state (Low Power Mode)
public/
  assets/          # logos, certificates, startup chime
  wallpapers/      # the wallpaper collection
```

**Want to update the resume content?** It's all in `lib/portfolioData.ts` — one file,
strongly typed. No component edits needed.

## Deployment

Published with **GitHub Pages**. The `base` in `vite.config.ts` is relative (`./`), so it
also works from any subpath or any other static host (Netlify, Vercel, Cloudflare Pages)
with zero config.

## About me

I'm Naim — a full-stack developer based in Beirut who likes the whole stack: the app in
your hand, the platform behind it, and the hardware integrations everyone else is afraid
to touch. Web, mobile, desktop-grade UIs, and machine intelligence — from multi-agent
reinforcement learning to transformer search pipelines.

- GitHub · [ngdevelopment-tech](https://github.com/ngdevelopment-tech)
- LinkedIn · [naim-gerges](https://lb.linkedin.com/in/naim-gerges-892591271)
- Hugging Face · [naimgerges](https://huggingface.co/naimgerges)
- Email · [naiimgerges@outlook.com](mailto:naiimgerges@outlook.com)
- WhatsApp · [+961 76 923 233](https://wa.me/96176923233)

---

Built with a lot of coffee and an unreasonable attention to detail.
If something made you smile, it did its job.
