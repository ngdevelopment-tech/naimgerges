import React from "react";
import { LANGUAGES } from "../../lib/portfolioData";

/**
 * Languages — its own app: the three spoken languages with LinkedIn-style
 * proficiency bars. A quiet, elegant pane — no list noise, no tabs.
 */
const LanguagesApp: React.FC = () => {
  return (
    <div className="h-full bg-[#f7f7f9] text-gray-800 overflow-y-auto">
      <div className="h-9 shrink-0" />
      <div className="px-5 md:px-8 pt-3 pb-2 max-w-2xl mx-auto w-full">
        <h1 className="text-[20px] md:text-[24px] font-bold text-gray-900 tracking-tight">
          Languages
        </h1>
        <p className="text-[12.5px] text-gray-500 mt-0.5">
          {LANGUAGES.length} languages, from native to working proficiency
        </p>

        <div className="mt-6 space-y-4 pb-8">
          {LANGUAGES.map((l) => (
            <div
              key={l.name}
              className="rounded-2xl bg-white border border-black/[0.08] shadow-sm p-5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[16px] font-bold text-gray-900">{l.name}</span>
                <span className="text-[11.5px] text-gray-500 text-right">{l.proficiency}</span>
              </div>
              <div className="mt-3 flex gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      i < l.level ? "bg-[#0a66ff]" : "bg-black/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}

          <p className="text-[12px] text-gray-400 leading-relaxed px-1 pt-2">
            Arabic at home, English in every codebase and classroom, French across Beirut —
            the working mix behind client projects and international coursework alike.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguagesApp;
