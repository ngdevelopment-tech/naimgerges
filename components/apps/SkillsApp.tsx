import React, { useState } from "react";
import { X, ExternalLink, BadgeCheck } from "lucide-react";
import {
  SKILLS,
  SKILL_GROUPS,
  CERTIFICATIONS,
  LANGUAGES,
  AWARDS,
  type Certification,
} from "../../lib/portfolioData";

/**
 * Skills — LinkedIn-style skills browser with group filter tabs, plus the
 * Licenses & Certifications pane with real logos and credential links.
 * Languages and Honors & Awards live here too, as their own tabs.
 */
const SkillsApp: React.FC = () => {
  const [group, setGroup] = useState<string>("All");
  const [view, setView] = useState<"skills" | "certs" | "languages" | "awards">("skills");
  const [activeId, setActiveId] = useState<string>(CERTIFICATIONS[0].id);
  const [detailOpen, setDetailOpen] = useState(false);
  const active: Certification =
    CERTIFICATIONS.find((c) => c.id === activeId) ?? CERTIFICATIONS[0];

  const filtered = group === "All" ? SKILLS : SKILLS.filter((s) => s.group === group);

  const TABS: { id: typeof view; label: string }[] = [
    { id: "skills", label: `Skills · ${SKILLS.length}` },
    { id: "certs", label: `Licenses & Certs · ${CERTIFICATIONS.length}` },
    { id: "languages", label: "Languages" },
    { id: "awards", label: "Honors & Awards" },
  ];

  return (
    <div className="h-full flex bg-white text-gray-800 overflow-hidden">
      {/* ----- Sidebar ----- */}
      <div
        className={`${
          detailOpen ? "hidden md:flex" : "flex"
        } w-full md:w-[340px] lg:w-[380px] shrink-0 flex-col border-r border-black/10`}
      >
        <div className="h-9 shrink-0" />
        <div className="px-4 pt-2 pb-2 shrink-0">
          <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">Skills</h1>
        </div>
        {/* view switch */}
        <div className="px-2 pb-2 flex flex-wrap gap-1 shrink-0">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setView(t.id);
                setDetailOpen(false);
              }}
              className={`px-2.5 py-1.5 rounded-full text-[11px] font-semibold transition-colors ${
                view === t.id
                  ? "bg-[#0a66ff] text-white shadow-sm"
                  : "bg-black/[0.05] text-gray-600 hover:bg-black/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {view === "skills" ? (
          <>
            {/* group tabs */}
            <div className="px-2 pb-2 flex flex-wrap gap-1 border-b border-black/5 shrink-0">
              {SKILL_GROUPS.map((g) => (
                <button
                  key={g}
                  onClick={() => setGroup(g)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                    group === g
                      ? "bg-[#0a66ff] text-white shadow-sm"
                      : "bg-black/[0.05] text-gray-600 hover:bg-black/10"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filtered.map((s) => (
                <div
                  key={s.name}
                  className="rounded-xl px-3 py-2.5 hover:bg-black/[0.035] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <BadgeCheck size={15} className="text-[#0a66ff] shrink-0" />
                    <span className="text-[13.5px] font-semibold text-gray-900">{s.name}</span>
                  </div>
                  {s.source && (
                    <p className="text-[11.5px] text-gray-500 mt-0.5 pl-[23px]">{s.source}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : view === "certs" ? (
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {CERTIFICATIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveId(c.id);
                  setDetailOpen(true);
                }}
                className={`w-full text-left rounded-xl p-2.5 flex items-center gap-3 transition-colors ${
                  c.id === activeId && detailOpen
                    ? "bg-[#e8f0fe] ring-1 ring-[#0a66ff]/30"
                    : "hover:bg-black/[0.04]"
                }`}
              >
                {c.logo ? (
                  <img
                    src={c.logo}
                    alt=""
                    className="w-11 h-11 rounded-[10px] object-cover border border-black/10 bg-white shrink-0"
                  />
                ) : (
                  <span
                    className={`w-11 h-11 rounded-[10px] bg-gradient-to-b ${c.accent} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}
                  >
                    {c.logoFallback}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-semibold text-gray-900 leading-snug">
                    {c.title}
                  </span>
                  <span className="block text-[12px] text-gray-600 truncate">{c.issuer}</span>
                </span>
              </button>
            ))}
          </div>
        ) : view === "languages" ? (
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {LANGUAGES.map((l) => (
              <div key={l.name} className="rounded-xl border border-black/5 bg-[#f7f7f9] p-3.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[14px] font-semibold text-gray-900">{l.name}</span>
                  <span className="text-[11px] text-gray-500">{l.proficiency}</span>
                </div>
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${
                        i < l.level ? "bg-[#0a66ff]" : "bg-black/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {AWARDS.map((a, i) => (
              <div
                key={i}
                className="rounded-xl border border-black/[0.08] bg-[#f7f7f9] p-3.5 relative overflow-hidden"
              >
                <span
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#c9a227]"
                  aria-hidden="true"
                />
                <span className="text-[13.5px] font-bold text-gray-900">{a.title}</span>
                <p className="text-[12px] text-gray-500 mt-0.5 font-medium">{a.issuer}</p>
                <p className="text-[12.5px] text-gray-600 mt-1.5 leading-relaxed">{a.detail}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ----- Certification detail ----- */}
      <div
        className={`${detailOpen ? "flex" : "hidden md:flex"} flex-1 min-w-0 flex-col bg-[#f7f7f9]`}
      >
        <div className="h-9 shrink-0" />
        <div className="md:hidden shrink-0 px-3 py-2 bg-white border-b border-black/5">
          <button
            onClick={() => setDetailOpen(false)}
            className="text-[13px] font-medium text-[#0a66ff] flex items-center gap-1"
          >
            <X size={14} /> All Certifications
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {active.media && (
            <img src={active.media} alt={active.title} className="w-full max-h-64 object-cover" />
          )}
          <div className="p-5 md:p-8 max-w-3xl">
            <div className="flex items-start gap-4">
              {active.logo ? (
                <img
                  src={active.logo}
                  alt=""
                  className="w-16 h-16 rounded-2xl object-cover border border-black/10 bg-white shadow-sm shrink-0"
                />
              ) : (
                <span
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-b ${active.accent} text-white text-[13px] font-bold flex items-center justify-center shrink-0`}
                >
                  {active.logoFallback}
                </span>
              )}
              <div className="min-w-0">
                <h2 className="text-[19px] md:text-[23px] font-bold text-gray-900 leading-tight tracking-tight">
                  {active.title}
                </h2>
                <p className="text-[14px] text-gray-700 mt-0.5">Issued by {active.issuer}</p>
              </div>
            </div>

            <p className="mt-5 text-[14px] leading-relaxed text-gray-700">{active.detail}</p>

            {active.credentialUrl && (
              <a
                href={active.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a66ff] text-white text-[13px] font-semibold hover:bg-[#0055d4] transition-colors shadow"
              >
                <ExternalLink size={14} /> Show credential
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsApp;
