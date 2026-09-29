import React from "react";
import { Play } from "lucide-react";
import { AWARDS } from "../../lib/portfolioData";

/**
 * Honors & Awards — its own app. Quiet editorial cards on warm paper; first
 * prizes carry a deep claret rosette edge (no gold-star clichés). Rich-media
 * entries — like the MTV feature — render as a watch-card with a playable
 * thumbnail.
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
          {AWARDS.length} recognitions across science fairs, robotics and media
        </p>

        <div className="mt-6 space-y-3.5 pb-8">
          {AWARDS.map((a, i) =>
            a.media ? (
              // ---- Rich-media watch-card (TV features, articles) ----
              <a
                key={i}
                href={a.link?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-xl overflow-hidden bg-white border border-black/[0.07] shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.14)] hover:-translate-y-[2px] transition-all"
              >
                <div className="relative">
                  <img
                    src={a.media}
                    alt={a.mediaAlt || a.title}
                    className="w-full aspect-[16/9] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-[#6d1f2c]/90 border border-white/40 backdrop-blur-sm flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
                      <Play size={18} className="ml-0.5" fill="currentColor" />
                    </span>
                  </span>
                  {a.link && (
                    <span className="absolute bottom-2.5 right-3 text-[10.5px] font-semibold uppercase tracking-wider text-white/85 bg-black/40 rounded-full px-2.5 py-1 backdrop-blur-sm">
                      {a.link.label}
                    </span>
                  )}
                </div>
                <div className="p-4 pl-6 relative">
                  <span
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#6d1f2c]"
                    aria-hidden="true"
                  />
                  <h2 className="text-[14.5px] md:text-[15.5px] font-bold text-gray-900 leading-snug">
                    {a.title}
                  </h2>
                  {a.issuer && <p className="text-[12px] text-gray-500 mt-0.5">{a.issuer}</p>}
                  <p className="text-[12.5px] md:text-[13px] text-gray-600 mt-2 leading-relaxed">
                    {a.detail}
                  </p>
                </div>
              </a>
            ) : (
              // ---- Standard award card ----
              <div
                key={i}
                className="relative rounded-xl bg-white border border-black/[0.07] shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-4 pl-6 md:p-5 md:pl-7 overflow-hidden"
              >
                {/* first-prize marker: deep claret edge; others: quiet neutral */}
                <span
                  className={`absolute left-0 top-0 bottom-0 w-[3px] ${
                    a.rank === 1 ? "bg-[#6d1f2c]" : "bg-black/15"
                  }`}
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-[14.5px] md:text-[15.5px] font-bold text-gray-900 leading-snug">
                    {a.title}
                    {a.rank === 1 && (
                      <span
                        className="ml-2 inline-flex items-center align-[2px] px-2 py-[2px] rounded-full bg-[#6d1f2c]/[0.08] text-[#6d1f2c] text-[10px] font-bold uppercase tracking-wider"
                        title="First prize"
                      >
                        1st Prize
                      </span>
                    )}
                  </h2>
                </div>
                {a.issuer && <p className="text-[12px] text-gray-500 mt-0.5">{a.issuer}</p>}
                <p className="text-[12.5px] md:text-[13px] text-gray-600 mt-2 leading-relaxed">
                  {a.detail}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HonorsApp;
