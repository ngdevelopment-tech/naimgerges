import React, { useState } from "react";
import { X, MapPin, Building2 } from "lucide-react";
import { EXPERIENCE, type Experience } from "../../lib/portfolioData";

/**
 * Experience — the full work history from LinkedIn, one role per card with
 * company logos, locations and bullet highlights. Master/detail like Mail.
 */
const ExperienceApp: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(EXPERIENCE[0].id);
  const [detailOpen, setDetailOpen] = useState(false);
  const active: Experience = EXPERIENCE.find((e) => e.id === activeId) ?? EXPERIENCE[0];

  return (
    <div className="h-full flex bg-white text-gray-800 overflow-hidden">
      {/* ----- List ----- */}
      <div
        className={`${
          detailOpen ? "hidden md:flex" : "flex"
        } w-full md:w-[320px] lg:w-[360px] shrink-0 flex-col border-r border-black/10`}
      >
        <div className="h-9 shrink-0" />
        <div className="px-4 pt-2 pb-3 border-b border-black/5 shrink-0">
          <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">Experience</h1>
          <p className="text-[12px] text-gray-500 mt-0.5">
            {EXPERIENCE.length} roles — from IT support to deep RL
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {EXPERIENCE.map((e) => (
            <button
              key={e.id}
              onClick={() => {
                setActiveId(e.id);
                setDetailOpen(true);
              }}
              className={`w-full text-left rounded-xl p-2.5 flex items-center gap-3 transition-colors ${
                e.id === activeId ? "bg-[#e8f0fe] ring-1 ring-[#0a66ff]/30" : "hover:bg-black/[0.04]"
              }`}
            >
              {e.logo ? (
                <img
                  src={e.logo}
                  alt=""
                  className="w-11 h-11 rounded-[10px] object-cover border border-black/10 bg-white shrink-0"
                />
              ) : (
                <span
                  className={`w-11 h-11 rounded-[10px] bg-gradient-to-b ${e.accent} text-white text-[11px] font-bold flex items-center justify-center shrink-0`}
                >
                  {e.logoFallback}
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] font-semibold text-gray-900 truncate">
                  {e.company}
                </span>
                <span className="block text-[12px] text-gray-600 truncate">{e.role}</span>
                <span className="block text-[11px] text-gray-400 truncate">{e.period}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ----- Detail ----- */}
      <div
        className={`${
          detailOpen ? "flex" : "hidden md:flex"
        } flex-1 min-w-0 flex-col bg-[#f7f7f9]`}
      >
        <div className="h-9 shrink-0" />
        <div className="md:hidden shrink-0 px-3 py-2 bg-white border-b border-black/5">
          <button
            onClick={() => setDetailOpen(false)}
            className="text-[13px] font-medium text-[#0a66ff] flex items-center gap-1"
          >
            <X size={14} /> All Experience
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
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
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-b ${active.accent} text-white text-[15px] font-bold flex items-center justify-center shadow-sm shrink-0`}
                >
                  {active.logoFallback}
                </span>
              )}
              <div className="min-w-0">
                <h2 className="text-[20px] md:text-[24px] font-bold text-gray-900 leading-tight tracking-tight">
                  {active.role}
                </h2>
                <p className="text-[14px] text-gray-700 mt-0.5 flex items-center gap-1.5 flex-wrap">
                  <Building2 size={13} className="text-gray-400" /> {active.company}
                  <span className="text-gray-300">·</span>
                  <span className="text-gray-500">{active.kind}</span>
                </p>
                <p className="text-[12.5px] text-gray-500 mt-1">
                  {active.period}
                  {active.location && (
                    <span className="inline-flex items-center gap-1 ml-2">
                      <MapPin size={11} /> {active.location}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <p className="mt-5 text-[14px] leading-relaxed text-gray-700">{active.description}</p>

            {active.highlights.length > 0 && (
              <ul className="mt-5 space-y-2.5">
                {active.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-gray-600">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#0a66ff]/60 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceApp;
