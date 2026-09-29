import React from "react";

/**
 * Hand-crafted macOS Sonoma/Sequoia-style app icons. Every icon is a local
 * SVG component — nothing is hotlinked from third-party CDNs.
 */

const SQUICLE = "0 0 64 64";

/** Subtle top-light gloss shared by all squircle icons. */
const Gloss: React.FC<{ id: string; opacity?: number }> = ({ id, opacity = 0.16 }) => (
  <>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity={opacity * 1.6} />
        <stop offset="0.45" stopColor="#ffffff" stopOpacity={opacity * 0.35} />
        <stop offset="0.55" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.06" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="62" height="62" rx="14.5" fill={`url(#${id})`} />
  </>
);

function Base({
  children,
  fill,
  stroke,
  glossId,
  glossOpacity,
}: {
  children: React.ReactNode;
  fill: string;
  stroke?: string;
  glossId: string;
  glossOpacity?: number;
}) {
  return (
    <svg viewBox={SQUICLE} className="w-full h-full" style={{ display: "block" }}>
      <rect x="1" y="1" width="62" height="62" rx="14.5" fill={fill} />
      {children}
      {stroke && (
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="none" stroke={stroke} strokeWidth="1" />
      )}
      <Gloss id={glossId} opacity={glossOpacity} />
    </svg>
  );
}

export const FinderIcon: React.FC = () => (
  <svg viewBox={SQUICLE} className="w-full h-full" style={{ display: "block" }}>
    <defs>
      <linearGradient id="fi-blue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3ea7f5" />
        <stop offset="1" stopColor="#1b7fd8" />
      </linearGradient>
      <linearGradient id="fi-light" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f4fbff" />
        <stop offset="1" stopColor="#cfe9fc" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="62" height="62" rx="14.5" fill="url(#fi-blue)" />
    {/* light left half, split down the middle */}
    <path d="M17 1 h13 v62 H17 A16 16 0 0 1 1 47 V17 A16 16 0 0 1 17 1 Z" fill="url(#fi-light)" />
    <path d="M30 1 v62" stroke="#8fc3e8" strokeWidth="1" opacity="0.65" />
    {/* eyes */}
    <path d="M11.5 24 q4.5 -4 9 0" stroke="#264a66" strokeWidth="2.8" fill="none" strokeLinecap="round" />
    <path d="M43.5 24 q4.5 -4 9 0" stroke="#264a66" strokeWidth="2.8" fill="none" strokeLinecap="round" />
    {/* nose bridge + smile */}
    <path d="M30 22 v18" stroke="#7ab6de" strokeWidth="1.4" opacity="0.8" />
    <path d="M19 45 q11 9 22 0" stroke="#264a66" strokeWidth="2.8" fill="none" strokeLinecap="round" />
    <Gloss id="fi-gloss" opacity={0.14} />
  </svg>
);

export const SafariIcon: React.FC = () => (
  <svg viewBox={SQUICLE} className="w-full h-full" style={{ display: "block" }}>
    <defs>
      <linearGradient id="sf-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f7fbff" />
        <stop offset="1" stopColor="#dbeafc" />
      </linearGradient>
      <linearGradient id="sf-ring" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#31c4ff" />
        <stop offset="1" stopColor="#0a6fe8" />
      </linearGradient>
      <linearGradient id="sf-needle" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ff5b52" />
        <stop offset="1" stopColor="#e8382e" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="62" height="62" rx="14.5" fill="url(#sf-bg)" />
    <circle cx="32" cy="32" r="26.5" fill="url(#sf-ring)" />
    <circle cx="32" cy="32" r="24" fill="#fdfeff" />
    {Array.from({ length: 48 }).map((_, i) => {
      const a = (i * 2 * Math.PI) / 48;
      const major = i % 4 === 0;
      const r1 = major ? 19.2 : 21.3;
      return (
        <line
          key={i}
          x1={32 + r1 * Math.cos(a)}
          y1={32 + r1 * Math.sin(a)}
          x2={32 + 23.5 * Math.cos(a)}
          y2={32 + 23.5 * Math.sin(a)}
          stroke={major ? "#7c93a6" : "#a9bac9"}
          strokeWidth={major ? 1.1 : 0.8}
        />
      );
    })}
    {/* needle */}
    <polygon points="32,12.5 36.8,32 32,32" fill="url(#sf-needle)" />
    <polygon points="32,51.5 27.2,32 32,32" fill="#c8d2da" />
    <circle cx="32" cy="32" r="2" fill="#f4f7f9" stroke="#aeb9c3" strokeWidth="0.6" />
    <Gloss id="sf-gloss" opacity={0.15} />
  </svg>
);

export const TerminalIcon: React.FC = () => (
  <Base fill="#1b1b1d" glossId="tm-gloss" glossOpacity={0.1}>
    {/* screen */}
    <rect x="7" y="11" width="50" height="42" rx="6" fill="#0c0c0d" stroke="#3f3f43" strokeWidth="1" />
    {/* title bar */}
    <path d="M7 17 a6 6 0 0 1 6 -6 h38 a6 6 0 0 1 6 6 v3 H7 z" fill="#2a2a2c" />
    <circle cx="13" cy="15.5" r="1.6" fill="#ff5f57" />
    <circle cx="18" cy="15.5" r="1.6" fill="#febc2e" />
    <circle cx="23" cy="15.5" r="1.6" fill="#28c840" />
    {/* prompt */}
    <path d="M13 27 l6.5 5.5 -6.5 5.5" stroke="#4cd964" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="23.5" y1="38" x2="37" y2="38" stroke="#f2f2f7" strokeWidth="2.8" strokeLinecap="round" />
    <rect x="40" y="35.6" width="2.6" height="4.8" fill="#4cd964" opacity="0.9" />
  </Base>
);

export const CalculatorIcon: React.FC = () => (
  <Base fill="#2b2b2e" glossId="ca-gloss" glossOpacity={0.1}>
    {/* display */}
    <rect x="9" y="9" width="46" height="13" rx="4" fill="#1a1a1c" stroke="#3c3c40" strokeWidth="0.8" />
    <text x="50" y="19" textAnchor="end" fill="#f5f5f7" fontSize="9.5" fontFamily="ui-monospace, 'SF Mono', monospace">
      1,024
    </text>
    {/* function keys */}
    {[0, 1, 2, 3].map((r) =>
      [0, 1, 2].map((c) => (
        <rect
          key={`k${r}${c}`}
          x={10 + c * 10.5}
          y={26 + r * 8.2}
          width="9"
          height="6.8"
          rx="2.4"
          fill="#5a5a5f"
        />
      ))
    )}
    {/* operator column */}
    {[0, 1, 2, 3].map((r) => (
      <rect key={`o${r}`} x={42.5} y={26 + r * 8.2} width="11.5" height="6.8" rx="2.4" fill="#ff9f0a" />
    ))}
    {/* highlights */}
    <rect x="10" y="26" width="9" height="6.8" rx="2.4" fill="#7a7a80" />
  </Base>
);

export const MusicIcon: React.FC = () => (
  <Base fill="#fa233b" glossId="mu-gloss" glossOpacity={0.18}>
    <defs>
      <linearGradient id="mu-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fb5c74" />
        <stop offset="1" stopColor="#fa233b" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="62" height="62" rx="14.5" fill="url(#mu-bg)" />
    <path
      d="M42.5 13.5 c-8.2 1.6 -15 3.1 -16 3.4 c-2 .5 -3.3 2.1 -3.3 4.2 v21 c-1 -.5 -2.4 -.8 -3.8 -.8 c-4.5 0 -8.1 2.8 -8.1 6.6 c0 3.9 3.6 6.6 8.1 6.6 c4.5 0 8.1 -2.8 8.1 -6.6 V27.6 c0 -.6 .3 -1.1 .9 -1.3 c1.7 -.5 7.7 -1.8 14.1 -3.1 v12.4 c-1 -.4 -2.4 -.7 -3.8 -.7 c-4.5 0 -8.1 2.8 -8.1 6.6 c0 3.9 3.6 6.6 8.1 6.6 c4.5 0 8.1 -2.8 8.1 -6.6 V17.6 c0 -2.7 -2.1 -4.6 -4.4 -4.1 z"
      fill="#ffffff"
    />
  </Base>
);

export const MailIcon: React.FC = () => (
  <Base fill="#1d6ff2" glossId="ml-gloss" glossOpacity={0.16}>
    <defs>
      <linearGradient id="ml-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5aabff" />
        <stop offset="1" stopColor="#1a6cf5" />
      </linearGradient>
      <linearGradient id="ml-flap" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#eef4fd" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="62" height="62" rx="14.5" fill="url(#ml-bg)" />
    <rect x="9" y="19" width="46" height="27" rx="5.5" fill="url(#ml-flap)" />
    <path d="M11 22.5 L32 38 L53 22.5" fill="none" stroke="#9cc3f7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 43.5 L24.5 32.5 M53 43.5 L39.5 32.5" fill="none" stroke="#cdddf3" strokeWidth="1.6" strokeLinecap="round" />
  </Base>
);

export const SettingsIcon: React.FC = () => (
  <Base fill="#85878b" glossId="st-gloss" glossOpacity={0.14}>
    <defs>
      <linearGradient id="st-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#b0b3b8" />
        <stop offset="1" stopColor="#7d8085" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="62" height="62" rx="14.5" fill="url(#st-bg)" />
    {/* gear with 12 teeth */}
    <g transform="translate(32 32)">
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x="-3.1"
          y="-24"
          width="6.2"
          height="9"
          rx="2"
          fill="#f5f5f7"
          transform={`rotate(${i * 30})`}
        />
      ))}
      <circle r="16.5" fill="#f5f5f7" />
      <circle r="10.5" fill="#6f7277" />
      <circle r="7" fill="url(#st-bg)" />
      <circle r="7" fill="none" stroke="#5d6065" strokeWidth="0.8" />
    </g>
  </Base>
);

export const GitHubIcon: React.FC = () => (
  <Base fill="#ffffff" glossId="gh-gloss" glossOpacity={0.08}>
    <rect x="1" y="1" width="62" height="62" rx="14.5" fill="#ffffff" />
    <path
      d="M32 12 a20.4 20.4 0 0 0 -6.45 39.77 c1 .19 1.4 -.44 1.4 -.98 v-3.44 c-5.67 1.23 -6.87 -2.73 -6.87 -2.73 c-.93 -2.36 -2.27 -3 -2.27 -3 c-1.85 -1.26 .14 -1.24 .14 -1.24 c2.05 .14 3.12 2.1 3.12 2.1 c1.82 3.12 4.78 2.22 5.94 1.7 c.19 -1.32 .71 -2.22 1.29 -2.73 c-4.53 -.52 -9.29 -2.27 -9.29 -10.09 c0 -2.23 .8 -4.05 2.1 -5.48 c-.21 -.52 -.91 -2.6 .2 -5.42 c0 0 1.71 -.55 5.6 2.09 a19.5 19.5 0 0 1 10.2 0 c3.89 -2.64 5.6 -2.09 5.6 -2.09 c1.11 2.82 .41 4.9 .2 5.42 c1.3 1.43 2.1 3.25 2.1 5.48 c0 7.84 -4.77 9.56 -9.32 10.07 c.73 .63 1.38 1.87 1.38 3.77 v5.59 c0 .54 .39 1.18 1.41 .98 A20.4 20.4 0 0 0 32 12 z"
      fill="#171515"
    />
    <rect x="1" y="1" width="62" height="62" rx="14.5" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
  </Base>
);

export const FolderIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className || "w-full h-full"} style={{ display: "block" }}>
    <defs>
      <linearGradient id="fo-back" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#87c8f8" />
        <stop offset="1" stopColor="#4a9ff0" />
      </linearGradient>
      <linearGradient id="fo-front" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#a6d7fb" />
        <stop offset="1" stopColor="#5fa9f0" />
      </linearGradient>
    </defs>
    <path d="M6 17 a5 5 0 0 1 5 -5 h11.5 l4.5 4.5 H53 a5 5 0 0 1 5 5 v26 a5 5 0 0 1 -5 5 H11 a5 5 0 0 1 -5 -5 z" fill="url(#fo-back)" />
    <path d="M6 25.5 h52 v22 a5 5 0 0 1 -5 5 H11 a5 5 0 0 1 -5 -5 z" fill="url(#fo-front)" />
    <path d="M6 25.5 h52 v2 H6 z" fill="#ffffff" opacity="0.4" />
  </svg>
);

export const CVIcon: React.FC = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" style={{ display: "block" }}>
    <defs>
      <linearGradient id="cv-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#e9e9ee" />
      </linearGradient>
    </defs>
    <path d="M14 6 h26 l12 12 v38 a4 4 0 0 1 -4 4 H14 a4 4 0 0 1 -4 -4 V10 a4 4 0 0 1 4 -4 z" fill="url(#cv-g)" stroke="#c9c9cf" strokeWidth="1" />
    <path d="M40 6 l12 12 h-12 z" fill="#d4d4da" />
    <circle cx="24" cy="24" r="5" fill="#b8c8d8" />
    <rect x="32" y="20" width="14" height="2.6" rx="1.3" fill="#a9b4c0" />
    <rect x="32" y="25.5" width="10" height="2.6" rx="1.3" fill="#c3ccd6" />
    <rect x="14" y="35" width="36" height="2.6" rx="1.3" fill="#d4dae0" />
    <rect x="14" y="41" width="36" height="2.6" rx="1.3" fill="#d4dae0" />
    <rect x="14" y="47" width="24" height="2.6" rx="1.3" fill="#d4dae0" />
  </svg>
);

export const ProjectsIcon: React.FC = () => <FolderIcon />;

export const NotesIcon: React.FC = () => (
  <Base fill="#fdfcf5" glossId="no-gloss" glossOpacity={0.1}>
    <rect x="1" y="1" width="62" height="62" rx="14.5" fill="#fdfcf5" />
    <path d="M1 15.5 A14.5 14.5 0 0 1 15.5 1 h33 A14.5 14.5 0 0 1 63 15.5 v4 H1 z" fill="#f7d354" />
    <rect x="1" y="19" width="62" height="1" fill="#e3bf45" />
    {["M14 30 h36", "M14 38 h36", "M14 46 h24"].map((d, i) => (
      <path key={i} d={d} stroke="#c8c2a8" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    ))}
    <rect x="1" y="1" width="62" height="62" rx="14.5" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
  </Base>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className || "w-full h-full"} style={{ display: "block" }}>
    <defs>
      <linearGradient id="tr-rim" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f5f6f7" />
        <stop offset="0.5" stopColor="#b9bdc3" />
        <stop offset="1" stopColor="#e8eaed" />
      </linearGradient>
      <linearGradient id="tr-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#eceff2" stopOpacity="0.55" />
        <stop offset="1" stopColor="#aeb4bc" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* fluted body */}
    <path d="M14 22 h36 l-3.4 30 a6 6 0 0 1 -6 5.4 H23.4 a6 6 0 0 1 -6 -5.4 z" fill="url(#tr-body)" stroke="#9aa0a8" strokeWidth="1" />
    {/* vertical ridges */}
    {[19, 23.5, 28, 32.5, 37, 41.5, 46].map((x) => (
      <line key={x} x1={x} y1="26" x2={x - (x - 32) * 0.12} y2="53" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.6" />
    ))}
    {[21, 25.8, 30.6, 35.4, 40.2, 45].map((x) => (
      <line key={x} x1={x} y1="26" x2={x - (x - 32) * 0.12} y2="53" stroke="#6d747d" strokeOpacity="0.35" strokeWidth="1" />
    ))}
    {/* rim */}
    <ellipse cx="32" cy="21" rx="19" ry="4.6" fill="url(#tr-rim)" stroke="#8f959d" strokeWidth="1" />
    <ellipse cx="32" cy="21" rx="14.5" ry="3" fill="#8e939b" fillOpacity="0.35" />
    {/* metallic footing */}
    <path d="M21.5 56.5 q10.5 3.4 21 0" stroke="#b9bdc3" strokeWidth="2.6" fill="none" strokeLinecap="round" />
  </svg>
);

export const GameIcon: React.FC = () => (
  <Base fill="#f2f2f7" glossId="gm-gloss" glossOpacity={0.08}>
    <rect x="1" y="1" width="62" height="62" rx="14.5" fill="#f2f2f7" />
    {/* grid */}
    <path d="M26 18 v28 M38 18 v28 M18 26 h28 M18 38 h28" stroke="#c7c7cc" strokeWidth="2.2" strokeLinecap="round" />
    {/* X and O */}
    <path d="M19.5 19.5 l4.5 4.5 M24 19.5 l-4.5 4.5" stroke="#1c1c1e" strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="44" cy="44" r="3.2" stroke="#ff453a" strokeWidth="2.6" fill="none" />
    <circle cx="32" cy="32" r="3.2" stroke="#5e5ce6" strokeWidth="2.6" fill="none" />
    <rect x="1" y="1" width="62" height="62" rx="14.5" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
  </Base>
);

export const FaceTimeIcon: React.FC = () => (
  <Base fill="#34c759" glossId="ft-gloss" glossOpacity={0.16}>
    <defs>
      <linearGradient id="ft-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#67e08b" />
        <stop offset="1" stopColor="#2fb84e" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="62" height="62" rx="14.5" fill="url(#ft-bg)" />
    <rect x="11" y="21.5" width="28" height="21" rx="6.5" fill="#ffffff" />
    <path d="M41.5 28.5 l10 -6.5 v20 l-10 -6.5 z" fill="#ffffff" />
  </Base>
);

export const PreviewIcon: React.FC = () => <CVIcon />;

/** Shared squircle tile with a lucide glyph, for the profile section apps. */
const GlyphTile: React.FC<{
  from: string;
  to: string;
  glossId: string;
  children: React.ReactNode;
}> = ({ from, to, glossId, children }) => (
  <>
    <defs>
      <linearGradient id={glossId + "-bg"} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={from} />
        <stop offset="1" stopColor={to} />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="62" height="62" rx="14.5" fill={`url(#${glossId}-bg)`} />
    {children}
    <Gloss id={glossId} opacity={0.14} />
  </>
);

export const ExperienceIcon: React.FC = () => (
  <svg viewBox={SQUICLE} className="w-full h-full" style={{ display: "block" }}>
    <GlyphTile from="#5b8def" to="#2f5fd0" glossId="ex-ic">
      {/* briefcase */}
      <rect x="14" y="22" width="36" height="26" rx="5" fill="#ffffff" opacity="0.95" />
      <path d="M25 22 v-4 a4 4 0 0 1 4 -4 h6 a4 4 0 0 1 4 4 v4" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="14" y="31" width="36" height="3.5" fill="#2f5fd0" opacity="0.35" />
      <rect x="29" y="29.5" width="6" height="6.5" rx="1.6" fill="#2f5fd0" />
    </GlyphTile>
  </svg>
);

export const EducationIcon: React.FC = () => (
  <svg viewBox={SQUICLE} className="w-full h-full" style={{ display: "block" }}>
    <GlyphTile from="#4da3ff" to="#1f6fd0" glossId="ed-ic">
      {/* open book — two facing pages with a spine, NOT a graduation cap */}
      <path d="M32 20 c-4-3.4 -10-4.6 -17-4.2 v28 c7-.4 13 .8 17 4.2 z" fill="#ffffff" opacity="0.96" />
      <path d="M32 20 c4-3.4 10-4.6 17-4.2 v28 c-7-.4 -13 .8 -17 4.2 z" fill="#ffffff" opacity="0.8" />
      <path d="M32 20 v28" stroke="#1f6fd0" strokeWidth="1.6" opacity="0.65" />
      {["M19 24.5 c3.4-.2 6.8.1 10 1", "M19 30 c3.4-.2 6.8.1 10 1", "M19 35.5 c3.4-.2 6.8.1 10 1"].map((d, i) => (
        <path key={i} d={d} stroke="#8fb8e8" strokeWidth="1.7" strokeLinecap="round" fill="none" />
      ))}
      {["M45 24.5 c-3.4-.2 -6.8.1 -10 1", "M45 30 c-3.4-.2 -6.8.1 -10 1", "M45 35.5 c-3.4-.2 -6.8.1 -10 1"].map((d, i) => (
        <path key={i} d={d} stroke="#5e93c9" strokeWidth="1.7" strokeLinecap="round" fill="none" />
      ))}
    </GlyphTile>
  </svg>
);

export const SkillsIcon: React.FC = () => (
  <svg viewBox={SQUICLE} className="w-full h-full" style={{ display: "block" }}>
    <GlyphTile from="#ffb340" to="#e07800" glossId="sk-ic">
      {/* toolbelt: three sliders at different levels — skill calibration */}
      {[16, 26, 36].map((y, row) => (
        <g key={y}>
          <line x1="15" y1={y + 6} x2="49" y2={y + 6} stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
          <circle cx={22 + row * 10} cy={y + 6} r="4.6" fill="#ffffff" />
          <circle cx={22 + row * 10} cy={y + 6} r="2.2" fill="#e07800" />
        </g>
      ))}
    </GlyphTile>
  </svg>
);

export const PlaygroundIcon: React.FC = () => (
  <svg viewBox={SQUICLE} className="w-full h-full" style={{ display: "block" }}>
    <GlyphTile from="#3a3a3e" to="#1c1c1e" glossId="pg-ic">
      {/* terminal prompt with colorful bars — code at play */}
      <path d="M15 24 l7 6 -7 6" stroke="#4da3ff" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="27" y="33" width="16" height="3.4" rx="1.7" fill="#ffffff" opacity="0.9" />
      <rect x="45" y="33" width="4" height="3.4" rx="1.7" fill="#28c840" />
      <rect x="15" y="45" width="10" height="3.4" rx="1.7" fill="#ffbd2e" />
      <rect x="28" y="45" width="21" height="3.4" rx="1.7" fill="#ff5f57" opacity="0.85" />
    </GlyphTile>
  </svg>
);

export const BeatLabIcon: React.FC = () => (
  <svg viewBox={SQUICLE} className="w-full h-full" style={{ display: "block" }}>
    <GlyphTile from="#ff5f6d" to="#b8174a" glossId="bl-ic">
      {/* drum-machine grid: 2 rows of pads + play triangle */}
      <rect x="14" y="22" width="10" height="10" rx="2.5" fill="#ffffff" opacity="0.95" />
      <rect x="27" y="22" width="10" height="10" rx="2.5" fill="#ffffff" opacity="0.55" />
      <rect x="40" y="22" width="10" height="10" rx="2.5" fill="#ffffff" opacity="0.95" />
      <rect x="14" y="35" width="10" height="10" rx="2.5" fill="#ffd60a" />
      <rect x="27" y="35" width="10" height="10" rx="2.5" fill="#ffffff" opacity="0.55" />
      <rect x="40" y="35" width="10" height="10" rx="2.5" fill="#ffffff" opacity="0.95" />
      <path d="M30 12 l5 3.4 -5 3.4 z" fill="#ffffff" opacity="0.9" />
    </GlyphTile>
  </svg>
);

export const AvatarBadge: React.FC<{ size?: number }> = ({ size = 96 }) => (
  <svg width={size} height={size} viewBox="0 0 96 96" style={{ display: "block" }}>
    <defs>
      <linearGradient id="av-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8fb8d8" />
        <stop offset="1" stopColor="#5a7d9a" />
      </linearGradient>
    </defs>
    <circle cx="48" cy="48" r="47" fill="url(#av-g)" />
    <text x="48" y="60" textAnchor="middle" fill="#ffffff" fontSize="34" fontFamily="inherit" fontWeight="500">
      NG
    </text>
  </svg>
);
