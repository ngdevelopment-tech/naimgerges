import React from "react";
import { AWARDS } from "../../lib/portfolioData";

/**
 * Honors & Awards — its own app: each recognition as a card with a gold
 * edge bar, the same treatment as the rest of the profile suite.
 */
const HonorsApp: React.FC = () => {
  return (
    <div className="h-full bg-[#f7f7f9] text-gray-800 overflow-y-auto">
      <div className="h-9 shrink-0" />
      <div className="px-5 md:px-8 pt-3 pb-2 max-w-2xl mx-auto w-full">
        <h1 className="text-[20px] md:text-[24px] font-bold text-gray-900 tracking-tight">
          Honors & Awards
        </h1>
        <p className="text-[12.5px] text-gray-500 mt-0.5">{AWARDS.length} recognitions</p>

        <div className="mt-6 space-y-4 pb-8">
          {AWARDS.map((a, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white border border-black/[0.08] shadow-sm p-5 relative overflow-hidden"
            >
              <span
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#c9a227]"
                aria-hidden="true"
              />
              <h2 className="text-[15px] font-bold text-gray-900 pr-4">{a.title}</h2>
              <p className="text-[12.5px] text-gray-500 mt-0.5 font-medium">{a.issuer}</p>
              <p className="text-[13px] text-gray-600 mt-2 leading-relaxed">{a.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HonorsApp;
