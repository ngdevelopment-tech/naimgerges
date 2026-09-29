import React, { useState } from "react";
import { X } from "lucide-react";
import { EDUCATION, type Education } from "../../lib/portfolioData";

/**
 * Education — the schools from LinkedIn, one per entry, with the Helsinki
 * grade, activities and certificate media in the detail pane.
 */
const EducationApp: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(EDUCATION[0].id);
  const [detailOpen, setDetailOpen] = useState(false);
  const active: Education = EDUCATION.find((e) => e.id === activeId) ?? EDUCATION[0];

  return (
    <div className="h-full flex bg-white text-gray-800 overflow-hidden">
      {/* ----- List ----- */}
      <div
        className={`${
          detailOpen ? "hidden md:flex" : "flex"
        } w-full md:w-[320px] lg:w-[350px] shrink-0 flex-col border-r border-black/10`}
      >
        <div className="h-9 shrink-0" />
        <div className="px-4 pt-2 pb-3 border-b border-black/5 shrink-0">
          <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">Education</h1>
          <p className="text-[12px] text-gray-500 mt-0.5">{EDUCATION.length} schools</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {EDUCATION.map((e) => (
            <button
              key={e.id}
              onClick={() => {
                setActiveId(e.id);
                setDetailOpen(true);
              }}
              className={`w-full text-left rounded-xl p-2.5 flex items-center gap-3 transition-colors ${
                e.id === activeId && detailOpen
                  ? "bg-[#e8f0fe] ring-1 ring-[#0a66ff]/30"
                  : "hover:bg-black/[0.04]"
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
                  className={`w-11 h-11 rounded-[10px] bg-gradient-to-b ${e.accent} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}
                >
                  {e.logoFallback}
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] font-semibold text-gray-900 truncate">
                  {e.school}
                </span>
                <span className="block text-[12px] text-gray-600 truncate">{e.program}</span>
                <span className="block text-[11px] text-gray-400">{e.period}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ----- Detail ----- */}
      <div
        className={`${detailOpen ? "flex" : "hidden md:flex"} flex-1 min-w-0 flex-col bg-[#f7f7f9]`}
      >
        <div className="h-9 shrink-0" />
        <div className="md:hidden shrink-0 px-3 py-2 bg-white border-b border-black/5">
          <button
            onClick={() => setDetailOpen(false)}
            className="text-[13px] font-medium text-[#0a66ff] flex items-center gap-1"
          >
            <X size={14} /> Back
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
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-b ${active.accent} text-white text-[14px] font-bold flex items-center justify-center shrink-0`}
                >
                  {active.logoFallback}
                </span>
              )}
              <div className="min-w-0">
                <h2 className="text-[20px] md:text-[24px] font-bold text-gray-900 leading-tight tracking-tight">
                  {active.school}
                </h2>
                <p className="text-[14px] text-gray-700 mt-0.5">{active.program}</p>
                <p className="text-[12.5px] text-gray-500 mt-1">
                  {active.period}
                  {active.grade && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">
                      Grade {active.grade}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {active.activities && (
              <p className="mt-4 text-[12.5px] text-gray-500 leading-relaxed">
                <span className="font-semibold text-gray-600">Activities and societies: </span>
                {active.activities}
              </p>
            )}

            {active.description && (
              <p className="mt-4 text-[14px] leading-relaxed text-gray-700">{active.description}</p>
            )}

            {active.highlights && (
              <ul className="mt-4 space-y-2.5">
                {active.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-gray-600">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#0a66ff]/60 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {active.media && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {active.media.map((m, i) => (
                  <figure
                    key={i}
                    className="rounded-2xl bg-white border border-black/10 shadow-sm overflow-hidden"
                  >
                    <img src={m.src} alt={m.title} className="w-full aspect-[4/3] object-cover" />
                    <figcaption className="p-3.5">
                      <p className="text-[13px] font-bold text-gray-900">{m.title}</p>
                      <p className="text-[12px] text-gray-600 mt-1 leading-relaxed">{m.caption}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationApp;
