import React, { useState } from "react";
import { ExternalLink, X, Award } from "lucide-react";
import { PROJECTS, type PortfolioProject } from "../../lib/portfolioData";

/**
 * Projects — the real portfolio. A two-pane browser: card list on the left,
 * rich detail on the right (stacked on mobile). Deliberately neutral styling —
 * content-first, no decorative color.
 */
const ProjectsApp: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);
  const [detailOpen, setDetailOpen] = useState(false);
  const active: PortfolioProject = PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0];

  const select = (id: string) => {
    setActiveId(id);
    setDetailOpen(true);
  };

  return (
    <div className="h-full flex bg-[#f5f5f7] text-gray-800 overflow-hidden">
      {/* ----- List pane ----- */}
      <div
        className={`${
          detailOpen ? "hidden md:flex" : "flex"
        } w-full md:w-[340px] lg:w-[380px] shrink-0 flex-col border-r border-black/10 bg-white`}
      >
        <div className="h-9 shrink-0" />
        <div className="px-4 pt-2 pb-3 border-b border-black/5 shrink-0">
          <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">Projects</h1>
          <p className="text-[12px] text-gray-500 mt-0.5">
            {PROJECTS.length} shipped products — fleet systems, 3D engines, POS, games
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-2.5 space-y-1">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => select(p.id)}
              className={`w-full text-left rounded-lg p-2.5 flex items-start gap-3 transition-colors ${
                p.id === activeId ? "bg-[#e8f0fe] ring-1 ring-[#0a66ff]/25" : "hover:bg-black/[0.04]"
              }`}
            >
              <span className="w-10 h-10 shrink-0 rounded-[10px] bg-[#f0f0f2] border border-black/[0.08] text-gray-500 text-[10px] font-bold flex items-center justify-center">
                {p.glyph}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] font-semibold text-gray-900 truncate">
                  {p.title}
                </span>
                <span className="block text-[11.5px] text-gray-500 truncate">{p.tagline}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ----- Detail pane ----- */}
      <div
        className={`${
          detailOpen ? "flex" : "hidden md:flex"
        } flex-1 min-w-0 flex-col bg-[#f5f5f7]`}
      >
        <div className="h-9 shrink-0" />
        {/* mobile back */}
        <div className="md:hidden shrink-0 px-3 py-2 bg-white border-b border-black/5">
          <button
            onClick={() => setDetailOpen(false)}
            className="text-[13px] font-medium text-[#0a66ff] flex items-center gap-1"
          >
            <X size={14} /> All Projects
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* neutral header */}
          <div className="bg-white border-b border-black/[0.08] px-6 py-7">
            <div className="flex items-start gap-4">
              <span className="w-14 h-14 shrink-0 rounded-2xl bg-[#f0f0f2] border border-black/[0.08] text-gray-500 text-[13px] font-bold flex items-center justify-center">
                {active.glyph}
              </span>
              <div className="min-w-0">
                <h2 className="text-[21px] md:text-[25px] font-bold text-gray-900 leading-tight tracking-tight">
                  {active.title}
                </h2>
                <p className="text-gray-500 text-[13px] mt-1">{active.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {active.id === "libatourism" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/[0.06] text-gray-700 text-[11.5px] font-semibold">
                      <Award size={12} /> 1st Prize — Foire des Sciences USJ
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 md:p-7 max-w-3xl">
            <p className="text-[14px] leading-relaxed text-gray-700 whitespace-pre-line">
              {active.description}
            </p>

            {active.highlights && (
              <div className="mt-6">
                {active.highlights.heading && (
                  <h3 className="text-[15px] font-bold text-gray-900 mb-2.5">
                    {active.highlights.heading}
                  </h3>
                )}
                <ul className="space-y-2">
                  {active.highlights.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-gray-600">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {active.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-full bg-white border border-black/10 text-[11.5px] font-medium text-gray-600"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {active.repo && (
              <a
                href={active.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white text-[13px] font-semibold hover:bg-black transition-colors"
              >
                <ExternalLink size={14} /> View repository
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsApp;
