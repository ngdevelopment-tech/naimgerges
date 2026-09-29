# Naim Gerges — Portfolio OS

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

| App | What it really is |
|---|---|
| **Projects** | 13 shipped products — fleet-management platforms, a 3D WebGL globe, POS systems, mobile games, e-waste tech — with real architecture notes |
| **Experience** | 10 roles from IT support at a bank to deep-reinforcement-learning specialists, with the actual work I did at each |
| **Education** | University of Helsinki (Grade 5/5), Arab Open University, Saints-Cœurs — with verified certificates |
| **Skills** | 31 skills grouped the LinkedIn way, plus the Courses & events section |
| **Licenses & Certifications** | IBM, Dubai Future Foundation, University of Helsinki, Hugging Face — real logos and clickable credential links |
| **Languages** | Arabic, English, French with LinkedIn-style proficiency bars |
| **Honors & Awards** | 1st Prize at USJ Science Fair, a perfect Deep-RL score, national TV feature |
| **Beat Lab** | A free-play drum kit — kick, snare, hi-hat, clap, playable by tap or keyboard, every drum voice synthesized live in WebAudio |
| **Safari** | Opens to a built-in monkeytype-style typing game — escape time by practicing typing (yes, with your WPM) |
| **FaceTime** | Rings like the real thing — Decline / Accept, language picker, and a message from me |
| **Terminal** | A working shell: `help`, `about`, `experience`, `projects`, `neofetch` and more |
| **Calculator, Notes, Finder, Music, Trash, Tic Tac Toe, Settings** | All fully functional. Settings even turns your battery yellow in Low Power Mode |
| **Contact** | Every way to reach me, one tap away |

Everything on screen — the window manager, the sounds, the icons, the games — was designed
and coded from scratch. No templates, no UI kits, no iframes-to-somewhere-else.

## Tech stack

- **React 19 + TypeScript** — strict mode, zero `any` in the app layer
- **Vite 6** — instant HMR, optimized production builds
- **Tailwind CSS 4** — the entire design system
- **WebAudio API** — the Mac startup chime, FaceTime ring/connect/end tones, and every
  Beat Lab drum voice are synthesized or streamed in code
- **Zero backend required** — the whole thing is static; the optional Express server only
  powers a LinkedIn preview passthrough in development

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

**Want to update my resume content?** It's all in `lib/portfolioData.ts` — one file,
strongly typed. No component edits needed.

## Deployment

This repo is published with **GitHub Pages** from the `main` branch (`/` root).
The `base` in `vite.config.ts` is relative (`./`), so it also works from any subpath
or any other static host (Netlify, Vercel, Cloudflare Pages) with zero config.

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
