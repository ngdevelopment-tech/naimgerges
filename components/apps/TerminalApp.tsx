import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  USER_NAME,
  USER_TITLE,
  USER_EMAIL,
  USER_WHATSAPP_NUMBER,
  GITHUB_URL,
  LINKEDIN_URL,
} from "../../constants";
import {
  EXPERIENCE as PROFILE_EXPERIENCE,
  EDUCATION as PROFILE_EDUCATION,
  CERTIFICATIONS as PROFILE_CERTIFICATIONS,
  PROJECTS,
} from "../../lib/portfolioData";
import { useLauncher } from "../WindowContext";

interface Line {
  kind: "input" | "output" | "error";
  text: string;
}

const BANNER = [
  "                    'c.          ",
  "                 ,xNMM.          -------------------------------",
  "               .OMMMMo           OS: Portfolio OS (macOS Tahoe 26.2)",
  "               OMMM0,            Host: MacBook Pro (M5 Max, 2026)",
  "     .;loddo:' loolloddol;.      Kernel: react-19 / vite-6",
  "   cKMMMMMMMMMMNWMMMMMMMMMM0:    Shell: zsh 5.9",
  " .KMMMMMMMMMMMMMMMMMMMMMMMWd.    Resolution: any (320px to 4K)",
  " XMMMMMMMMMMMMMMMMMMMMMMMX.      Terminal: Portfolio Terminal",
  ";MMMMMMMMMMMMMMMMMMMMMMMM:       CPU: Apple M5 Max",
  ":MMMMMMMMMMMMMMMMMMMMMMMM:       GPU: Apple M5 Max (40-core)",
  ".MMMMMMMMMMMMMMMMMMMMMMMMX.      Memory: 48 GB unified",
  " kMMMMMMMMMMMMMMMMMMMMMMMMWd.    ",
  " 'XMMMMMMMMMMMMMMMMMMMMMMMMMMk   Type 'help' for available commands.",
  "  'XMMMMMMMMMMMMMMMMMMMMMMMMK.   ",
  "    kMMMMMMMMMMMMMMMMMMMMMMd     ",
  "     ;KMMMMMMMWXXWMMMMMMMk.      ",
  "       .cooc,.    .,coo:.        ",
];

export const TerminalApp: React.FC<{ onOpenApp?: (id: string) => void }> = ({ onOpenApp: onOpenAppProp }) => {
  const launchFromContext = useLauncher().launchApp;
  const onOpenApp = onOpenAppProp ?? launchFromContext;
  const [lines, setLines] = useState<Line[]>([
    ...BANNER.map((text) => ({ kind: "output" as const, text })),
    { kind: "output", text: "" },
    { kind: "output", text: "Welcome to Portfolio Terminal. Type a command and press Enter." },
    { kind: "output", text: "Start with:  help        (list every command)" },
    { kind: "output", text: "Then try:    about · projects · contact · open safari" },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const push = (kind: Line["kind"], text: string) =>
    setLines((prev) => [...prev, { kind, text }]);

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      push("input", cmd);
      if (!cmd) return;
      setCmdHistory((h) => [...h, cmd]);
      setHistIndex(-1);

      const [name, ...args] = cmd.split(/\s+/);
      const arg = args.join(" ");

      switch (name.toLowerCase()) {
        case "help":
          push(
            "output",
            [
              "Available commands:",
              "  about        Who is Naim Gerges",
              "  experience   Work history",
              "  education    Schools & programs",
              "  certs        Licenses & certifications",
              "  projects     List projects",
              "  contact      Email and WhatsApp",
              "  github       Open the GitHub profile",
              "  linkedin     Open the LinkedIn profile",
              "  socials      All links at once",
              "  open <app>   Launch an app (safari, music, calculator, ...)",
              "  date         Current date & time",
              "  whoami       Current user",
              "  clear        Clear the terminal",
            ].join("\n")
          );
          break;
        case "about":
          push("output", `${USER_NAME} — ${USER_TITLE}`);
          push(
            "output",
            "Full-stack engineer working across mobile, web and the server systems behind them: telemetry pipelines, point-of-sale hardware, offline-first apps."
          );
          break;
        case "experience":
          PROFILE_EXPERIENCE.forEach((e) => {
            push("output", `• ${e.role} — ${e.company}`);
            e.highlights.forEach((h) => push("output", `    - ${h}`));
          });
          break;
        case "education":
          PROFILE_EDUCATION.forEach((e) => push("output", `• ${e.school} — ${e.program}${e.period ? ` (${e.period})` : ""}`));
          break;
        case "certs":
        case "certifications":
          PROFILE_CERTIFICATIONS.forEach((c) => push("output", `• ${c.title} — ${c.issuer}`));
          break;
        case "projects":
          PROJECTS.forEach((p) => push("output", `• ${p.title} — ${p.tagline}`));
          break;
        case "contact":
          push("output", `Email:    ${USER_EMAIL}`);
          push("output", `WhatsApp: ${USER_WHATSAPP_NUMBER}`);
          break;
        case "github":
          push("output", `Opening ${GITHUB_URL}`);
          window.open(GITHUB_URL, "_blank", "noopener");
          break;
        case "linkedin":
          push("output", `Opening ${LINKEDIN_URL}`);
          window.open(LINKEDIN_URL, "_blank", "noopener");
          break;
        case "socials":
          push("output", `GitHub:   ${GITHUB_URL}`);
          push("output", `LinkedIn: ${LINKEDIN_URL}`);
          push("output", `Email:    ${USER_EMAIL}`);
          push("output", `WhatsApp: ${USER_WHATSAPP_NUMBER}`);
          break;
        case "open": {
          const app = arg.toLowerCase();
          const known = ["finder", "safari", "music", "calculator", "projects", "settings", "contact", "notes", "cv", "trash", "tictactoe", "facetime"];
          if (known.includes(app)) {
            push("output", `Launching ${app}…`);
            onOpenApp?.(app);
          } else {
            push("error", `open: unknown app '${arg}'. Try: ${known.join(", ")}`);
          }
          break;
        }
        case "date":
          push("output", new Date().toString());
          break;
        case "whoami":
          push("output", "naim");
          break;
        case "clear":
          setLines([]);
          break;
        case "echo":
          push("output", arg);
          break;
        case "neofetch":
          BANNER.forEach((t) => push("output", t));
          break;
        default:
          push("error", `zsh: command not found: ${name}`);
      }
    },
    [onOpenApp]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const next = histIndex === -1 ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setInput(cmdHistory[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === -1) return;
      const next = histIndex + 1;
      if (next >= cmdHistory.length) {
        setHistIndex(-1);
        setInput("");
      } else {
        setHistIndex(next);
        setInput(cmdHistory[next]);
      }
    }
  };

  return (
    <div
      className="h-full bg-[#1e1e20] dark-scroll font-mono text-[12.5px] md:text-[13px] overflow-y-auto p-3 pt-[52px] md:pt-[56px] cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          className={`whitespace-pre-wrap break-words leading-[1.45] ${
            line.kind === "error" ? "text-[#ff6b6b]" : "text-[#d6d6d6]"
          }`}
        >
          {line.kind === "input" ? (
            <>
              <span className="text-[#4cd964]">➜</span>
              <span className="text-[#5ac8fa]"> ~ </span>
              {line.text}
            </>
          ) : (
            line.text
          )}
        </div>
      ))}
      <div className="flex flex-wrap gap-1.5 pb-2 pt-1 shrink-0">
        {["help", "about", "projects", "contact", "open safari", "neofetch"].map((c) => (
          <button
            key={c}
            onClick={() => { run(c); }}
            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-[#9adcf5] hover:bg-white/10 active:scale-95 transition-all"
          >
            {c}
          </button>
        ))}
      </div>
      <div className="flex items-center">
        <span className="text-[#4cd964]">➜</span>
        <span className="text-[#5ac8fa]">&nbsp;~&nbsp;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent outline-none border-none text-[#f2f2f2] caret-[#4cd964]"
          autoFocus
          aria-label="Terminal input"
        />
      </div>
      <div ref={endRef} />
    </div>
  );
};

export default TerminalApp;
