import React, { useState } from "react";
import { Copy, Check, ExternalLink, Phone } from "lucide-react";
import {
  USER_NAME,
  USER_TITLE,
  USER_AVATAR,
  USER_EMAIL,
  USER_WHATSAPP_NUMBER,
  USER_WHATSAPP_LINK,
  LINKEDIN_URL,
  GITHUB_URL,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
} from "../../constants";

/**
 * iOS-style brand icons: rounded-square tiles with authentic gradients and
 * glyphs, each with a subtle top-light highlight like the real thing.
 */

const Tile: React.FC<{ gradient: string; children: React.ReactNode; label: string }> = ({
  gradient,
  children,
  label,
}) => (
  <span
    aria-label={label}
    role="img"
    className="relative w-11 h-11 rounded-[12px] overflow-hidden shrink-0 shadow-[0_1.5px_4px_rgba(0,0,0,0.22)] block"
  >
    <span className={`absolute inset-0 ${gradient}`} />
    {/* top-light sheen like iOS icons */}
    <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-[12px]" />
    <span className="absolute inset-0 flex items-center justify-center">{children}</span>
  </span>
);

const MailTile: React.FC = () => (
  <Tile label="Mail" gradient="bg-[linear-gradient(180deg,#5fc7ff_0%,#1d7bff_100%)]">
    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none">
      <rect x="2.5" y="5" width="19" height="14" rx="2.8" fill="#ffffff" />
      <path
        d="M3.5 6.8 L12 13 L20.5 6.8"
        stroke="#7fb6ee"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.5 17.5 L9.5 11.8 M20.5 17.5 L14.5 11.8" stroke="#cfe4f9" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  </Tile>
);

const WhatsAppTile: React.FC = () => (
  <Tile label="WhatsApp" gradient="bg-[linear-gradient(180deg,#61e884_0%,#1fb84e_55%,#0e9d3e_100%)]">
    <svg viewBox="0 0 24 24" className="w-[24px] h-[24px]" fill="#ffffff">
      <path d="M12.05 2.6a9.4 9.4 0 0 0-8.1 14.13L2.5 21.4l4.83-1.42a9.4 9.4 0 1 0 4.72-17.38Zm0 1.75a7.65 7.65 0 1 1-3.9 14.23l-.28-.17-2.86.84.85-2.79-.18-.3a7.65 7.65 0 0 1 6.37-11.81Z" />
      <path d="M9.1 7.2c-.18-.4-.37-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.68 4.18 3.64 2.07.8 2.49.66 2.94.62.45-.04 1.45-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.46-.28s-1.45-.72-1.68-.8c-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06s-1.09-.4-2.08-1.28c-.77-.68-1.29-1.53-1.44-1.77-.15-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.32-.75-1.8Z" />
    </svg>
  </Tile>
);

const LinkedInTile: React.FC = () => (
  <Tile label="LinkedIn" gradient="bg-[linear-gradient(180deg,#3ba2e0_0%,#0a66c2_60%,#084d95_100%)]">
    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="#ffffff">
      <path d="M6.94 8.75H4.1V19h2.84V8.75ZM5.52 4.1a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3ZM13.2 13.4c0-1.24.57-1.98 1.66-1.98 1 0 1.48.71 1.48 1.98V19h2.83v-6.63c0-2.64-1.5-3.92-3.59-3.92-2.09 0-2.97 1.63-2.97 1.63V8.75H9.9V19h3.3v-5.6Z" />
    </svg>
  </Tile>
);

const GitHubTile: React.FC = () => (
  <Tile label="GitHub" gradient="bg-[linear-gradient(180deg,#3d3d41_0%,#171515_100%)]">
    <svg viewBox="0 0 24 24" className="w-[24px] h-[24px]" fill="#ffffff">
      <path d="M12 2.2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2.2Z" />
    </svg>
  </Tile>
);

const InstagramTile: React.FC = () => (
  <Tile label="Instagram" gradient="bg-[linear-gradient(45deg,#f9ce34_0%,#ee2a7b_50%,#6228d7_100%)]">
    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5.2" stroke="#ffffff" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4.1" stroke="#ffffff" strokeWidth="1.9" />
      <circle cx="17.2" cy="6.8" r="1.25" fill="#ffffff" />
    </svg>
  </Tile>
);

const ContactApp: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  const channels = [
    {
      key: "email",
      label: "Email",
      value: USER_EMAIL,
      href: `mailto:${USER_EMAIL}`,
      icon: <MailTile />,
      copyable: true,
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      value: USER_WHATSAPP_NUMBER,
      href: USER_WHATSAPP_LINK,
      icon: <WhatsAppTile />,
      copyable: true,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      value: "in/naim-gerges-892591271",
      href: LINKEDIN_URL,
      icon: <LinkedInTile />,
      copyable: true,
    },
    {
      key: "github",
      label: "GitHub",
      value: "ngdevelopment-tech",
      href: GITHUB_URL,
      icon: <GitHubTile />,
      copyable: false,
    },
    {
      key: "instagram",
      label: "Instagram",
      value: INSTAGRAM_HANDLE,
      href: INSTAGRAM_URL,
      icon: <InstagramTile />,
      copyable: true,
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#f2f2f7]">
      <div className="max-w-md mx-auto px-4 pt-14 md:pt-16 pb-8">
        {/* Profile header */}
        <div className="flex flex-col items-center text-center mb-7">
          <img
            src={USER_AVATAR}
            alt={USER_NAME}
            className="w-[88px] h-[88px] rounded-full object-cover shadow-lg border-[3px] border-white"
          />
          <h1 className="mt-3 text-[20px] font-bold text-gray-900 tracking-tight">{USER_NAME}</h1>
          <p className="text-[13px] text-gray-500 mt-0.5">{USER_TITLE}</p>
        </div>

        {/* Channels */}
        <div className="rounded-2xl bg-white shadow-sm border border-black/5 overflow-hidden divide-y divide-black/5">
          {channels.map((c) => (
            <div key={c.key} className="flex items-center gap-3 pl-3 pr-2 py-2.5">
              {c.icon}
              <a
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex-1 min-w-0 group"
              >
                <div className="text-[13.5px] font-semibold text-gray-900 leading-tight">{c.label}</div>
                <div className="text-[12.5px] text-[#0a66ff] group-hover:underline truncate">{c.value}</div>
              </a>
              {c.copyable && (
                <button
                  onClick={() => copy(c.value, c.key)}
                  className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-black/5 transition-colors shrink-0"
                  aria-label={`Copy ${c.label}`}
                  title={`Copy ${c.label}`}
                >
                  {copied === c.key ? <Check size={15} className="text-[#30d158]" /> : <Copy size={15} />}
                </button>
              )}
              <a
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-black/5 transition-colors shrink-0"
                aria-label={`Open ${c.label}`}
              >
                {c.key === "whatsapp" ? <Phone size={15} /> : <ExternalLink size={15} />}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-[12px] text-gray-400 mt-6 leading-relaxed">
          Usually replies within a day. For job opportunities, freelance work or
          collaborations, email or WhatsApp are fastest.
        </p>
      </div>
    </div>
  );
};

export default ContactApp;
