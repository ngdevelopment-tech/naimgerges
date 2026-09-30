import React from "react";

/**
 * Hand-crafted macOS Sonoma/Sequoia-style app icons. Every icon is a local
 * SVG component — nothing is hotlinked from third-party CDNs.
 */

const SQUICLE = "0 0 64 64";

/**
 * An icon rendered from a real PNG asset (public/assets/icons/*). Used where
 * the photographic macOS artwork beats a hand-drawn vector.
 */
export const ImgIcon: React.FC<{ src: string; alt?: string }> = ({ src, alt = "" }) => (
  <img
    src={src}
    alt={alt}
    draggable={false}
    className="w-full h-full object-contain"
    style={{ display: "block" }}
  />
);

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
  <ImgIcon src="./assets/icons/finder.png" alt="Finder" />
);

export const SafariIcon: React.FC = () => (
  <ImgIcon src="./assets/icons/safari.png" alt="Safari" />
);

export const TerminalIcon: React.FC = () => (
  <ImgIcon src="./assets/icons/terminal.png" alt="Terminal" />
);

export const CalculatorIcon: React.FC = () => (
  <ImgIcon src="./assets/icons/calculator.png" alt="Calculator" />
);

export const MusicIcon: React.FC = () => (
  <ImgIcon src="./assets/icons/music.png" alt="Music" />
);

export const MailIcon: React.FC = () => (
  <ImgIcon src="./assets/icons/mail.png" alt="Mail" />
);

export const SettingsIcon: React.FC = () => (
  <ImgIcon src="./assets/icons/settings.png" alt="Settings" />
);

export const GitHubIcon: React.FC = () => (
  <ImgIcon src="./assets/icons/github-dark.png" alt="GitHub" />
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

export const ProjectsIcon: React.FC = () => (
  <ImgIcon src="./assets/icons/desktop-folder.png" alt="Projects" />
);

export const NotesIcon: React.FC = () => (
  <ImgIcon src="./assets/icons/notes.png" alt="Notes" />
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
  <ImgIcon src="./assets/icons/games.png" alt="Tic Tac Toe" />
);

export const FaceTimeIcon: React.FC = () => (
  <ImgIcon src="./assets/icons/facetime.png" alt="FaceTime" />
);

export const PreviewIcon: React.FC = () => (
  <ImgIcon src="./assets/icons/preview.png" alt="Preview" />
);

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
  <ImgIcon src="./assets/icons/work-folder.png" alt="Experience" />
);

export const EducationIcon: React.FC = () => (
  <ImgIcon src="./assets/icons/education.png" alt="Education" />
);

export const SkillsIcon: React.FC = () => (
  <ImgIcon src="./assets/icons/pencil-folder.png" alt="Skills" />
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
  <ImgIcon src="./assets/icons/garageband.png" alt="Beat Lab" />
);

export const CertificationsIcon: React.FC = () => (
  <ImgIcon src="./assets/icons/skills.png" alt="Certifications" />
);

export const LanguagesIcon: React.FC = () => (
  <ImgIcon src="./assets/icons/translate.png" alt="Languages" />
);

export const HonorsIcon: React.FC = () => (
  <svg viewBox={SQUICLE} className="w-full h-full" style={{ display: "block" }}>
    <GlyphTile from="#3f5a52" to="#1d332c" glossId="ho-ic">
      {/* laurel wreath around a star — quiet recognition, deep pine green */}
      <g transform="translate(32 33)">
        {[-1, 1].map((side) => (
          <g key={side} transform={`scale(${side} 1)`}>
            {Array.from({ length: 5 }).map((_, i) => {
              const angle = -150 + i * 24;
              const rad = (angle * Math.PI) / 180;
              return (
                <ellipse
                  key={i}
                  cx={15.5 * Math.cos(rad)}
                  cy={15.5 * Math.sin(rad)}
                  rx="4.6"
                  ry="2.3"
                  fill="#ffffff"
                  opacity="0.92"
                  transform={`rotate(${angle + 90} ${15.5 * Math.cos(rad)} ${15.5 * Math.sin(rad)})`}
                />
              );
            })}
          </g>
        ))}
        <path d="M0 -9.5 l2.8 5.7 6.3 .9 -4.6 4.4 1.1 6.3 -5.6 -3 -5.6 3 1.1 -6.3 -4.6 -4.4 6.3 -.9 z" fill="#ffffff" />
      </g>
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
