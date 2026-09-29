import React, { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { SKILLS, SKILL_GROUPS, COURSES } from "../../lib/portfolioData";

/**
 * Skills — LinkedIn's Skills section, standalone: 31 skills with the same
 * group filter tabs, followed by the Courses & events section. Everything
 * else (certifications, languages, awards) lives in its own app.
 */
const SkillsApp: React.FC = () => {
  const [group, setGroup] = useState<string>("All");

  const filtered = group === "All" ? SKILLS : SKILLS.filter((s) => s.group === group);

  return (
    <div className="h-full flex bg-white text-gray-800 overflow-hidden">
      {/* ----- List ----- */}
      <div className="w-full md:w-[380px] lg:w-[420px] shrink-0 flex flex-col border-r border-black/10">
        <div className="h-9 shrink-0" />
        <div className="px-4 pt-2 pb-3 border-b border-black/5 shrink-0">
          <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">Skills</h1>
          <p className="text-[12px] text-gray-500 mt-0.5">{SKILLS.length} skills · {COURSES.length} courses & events</p>
        </div>
        {/* group tabs */}
        <div className="px-3 py-2.5 flex flex-wrap gap-1 border-b border-black/5 shrink-0">
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
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
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

          {/* Courses & events */}
          <div className="pt-4 pb-1 px-3">
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
              Courses & events
            </h2>
          </div>
          {COURSES.map((c) => (
            <div
              key={c.name}
              className="rounded-xl px-3 py-2.5 hover:bg-black/[0.035] transition-colors"
            >
              <span className="block text-[13.5px] font-semibold text-gray-900">{c.name}</span>
              <span className="block text-[11.5px] text-gray-500 mt-0.5">{c.org}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ----- Detail / summary pane ----- */}
      <div className="hidden md:flex flex-1 min-w-0 flex-col bg-[#f7f7f9]">
        <div className="h-9 shrink-0" />
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-2xl">
            <h2 className="text-[18px] font-bold text-gray-900 tracking-tight">
              How the skills map to the work
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-gray-600">
              Every skill here was earned inside a real project — the GraphQL and React
              toolset in the University of Helsinki portfolio, algorithms and Python in
              Harvard's CS50 problem sets, and the machine-learning stack across
              reinforcement-learning agents trained and evaluated end to end.
            </p>

            <div className="mt-6 space-y-3">
              {SKILL_GROUPS.filter((g) => g !== "All").map((g) => {
                const items = SKILLS.filter((s) => s.group === g);
                return (
                  <div key={g} className="rounded-2xl bg-white border border-black/[0.08] shadow-sm p-4">
                    <h3 className="text-[13px] font-bold text-gray-900">{g}</h3>
                    <p className="text-[12px] text-gray-500 mt-0.5">{items.length} skills</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {items.map((s) => (
                        <span
                          key={s.name}
                          className="px-2.5 py-1 rounded-full bg-black/[0.05] text-gray-700 text-[11.5px] font-medium"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="rounded-2xl bg-white border border-black/[0.08] shadow-sm p-4">
                <h3 className="text-[13px] font-bold text-gray-900">Courses & events</h3>
                <p className="text-[12px] text-gray-500 mt-0.5">
                  Workshops, hackathons and community events across Beirut's tech scene
                </p>
                <ul className="mt-2.5 space-y-1.5">
                  {COURSES.map((c) => (
                    <li key={c.name} className="text-[12.5px] text-gray-700 leading-relaxed">
                      <span className="font-semibold">{c.name}</span>
                      <span className="text-gray-500"> — {c.org}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsApp;
