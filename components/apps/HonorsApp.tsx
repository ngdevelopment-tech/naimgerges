import React from "react";
import { AWARDS } from "../../lib/portfolioData";

/**
 * Honors & Awards — its own app. Each recognition is a card with the date
 * as a chip, the issuer in small caps, and a gold laurel marker for
 * first-prize winners. Quiet, editorial, no clip-art.
 */
const HonorsApp: React.FC = () => {
  return (
    <div className="h-full bg-[#faf9f7] text-gray-800 overflow-y-auto">
      <div className="h-9 shrink-0" />
      <div className="px-5 md:px-8 pt-3 pb-2 max-w-2xl mx-auto w-full">
        <h1 className="text-[20px] md:text-[24px] font-bold text-gray-900 tracking-tight">
          Honors & Awards
        </h1>
        <p className="text-[12.5px] text-gray-500 mt-0.5">
          {AWARDS.length} recognitions across science fairs, robotics and competitions
        </p>

        <div className="mt-6 space-y-3.5 pb-8">
          {AWARDS.map((a, i) => (
            <div
              key={i}
              className="relative rounded-xl bg-white border border-black/[0.07] shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-4 pl-6 md:p-5 md:pl-7 overflow-hidden"
            >
              {/* first-prize marker: warm gold edge; others: quiet neutral */}
              <span
                className={`absolute left-0 top-0 bottom-0 w-[3px] ${
                  a.rank === 1 ? "bg-[#c9a227]" : "bg-black/15"
                }`}
                aria-hidden="true"
              />

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-[14.5px] md:text-[15.5px] font-bold text-gray-900 leading-snug">
                    {a.title}
                    {a.rank === 1 && (
                      <span
                        className="ml-2 inline-flex items-center align-[2px] px-2 py-[2px] rounded-full bg-[#c9a227]/10 text-[#8a6d14] text-[10px] font-bold uppercase tracking-wider"
                        title="First prize"
                      >
                        1st Prize
                      </span>
                    )}
                  </h2>
                  {a.issuer && (
                    <p className="text-[12px] text-gray-500 mt-0.5">{a.issuer}</p>
                  )}
                </div>
                {a.period && (
                  <span className="shrink-0 text-[11px] font-semibold text-gray-600 bg-black/[0.05] rounded-full px-2.5 py-1 whitespace-nowrap">
                    {a.period}
                  </span>
                )}
              </div>

              <p className="text-[12.5px] md:text-[13px] text-gray-600 mt-2 leading-relaxed">
                {a.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HonorsApp;
