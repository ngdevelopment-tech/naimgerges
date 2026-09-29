import React from "react";
import { Star, GitBranch, BookOpen, ExternalLink, MapPin, Users, FolderGit2 } from "lucide-react";
import { GITHUB_URL, GITHUB_REPO_FULLSTACK_OPEN } from "../../constants";

/**
 * Native GitHub profile view for ngdevelopment-tech. Data mirrors the public
 * profile; the header links to the live page on github.com.
 */
export const GitHubApp: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto bg-[#0d1117] text-[#e6edf3]">
      <div className="max-w-3xl mx-auto px-4 md:px-6 pt-12 pb-6">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-full border border-[#30363d] bg-gradient-to-br from-[#161b22] to-[#0d1117] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 64 64" className="w-12 h-12" fill="#e6edf3">
              <path d="M32 8 a24 24 0 0 0 -7.6 46.8 c1.2 .2 1.6 -.5 1.6 -1.1 v-3.9 c-6.7 1.5 -8.1 -3.2 -8.1 -3.2 c-1.1 -2.8 -2.7 -3.5 -2.7 -3.5 c-2.2 -1.5 .2 -1.5 .2 -1.5 c2.4 .2 3.7 2.5 3.7 2.5 c2.1 3.7 5.6 2.6 7 2 c.2 -1.5 .8 -2.6 1.5 -3.2 c-5.3 -.6 -10.9 -2.7 -10.9 -11.9 c0 -2.6 .9 -4.8 2.5 -6.5 c-.3 -.6 -1.1 -3 .2 -6.4 c0 0 2 -.6 6.6 2.5 a23 23 0 0 1 12 0 c4.6 -3.1 6.6 -2.5 6.6 -2.5 c1.3 3.4 .5 5.8 .2 6.4 c1.6 1.7 2.5 3.9 2.5 6.5 c0 9.2 -5.6 11.3 -11 11.9 c.9 .8 1.6 2.2 1.6 4.4 v6.6 c0 .6 .4 1.3 1.6 1.1 A24 24 0 0 0 32 8 z" />
            </svg>
          </div>
          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl font-semibold">ngdevelopment-tech</h1>
            <p className="text-[#7d8590] text-sm mt-0.5">
              Naim Gerges · Full-Stack Software Engineer & Solutions Architect
            </p>
            <div className="flex items-center gap-4 mt-2 text-[13px] text-[#7d8590]">
              <span className="flex items-center gap-1">
                <Users size={13} /> Followers
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={13} /> Lebanon
              </span>
            </div>
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] text-[13px] font-medium transition-colors"
          >
            View on GitHub <ExternalLink size={13} />
          </a>
        </div>

        <h2 className="text-[15px] font-semibold border-b border-[#21262d] pb-2 mb-4">
          Pinned repositories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a
            href={GITHUB_REPO_FULLSTACK_OPEN}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-md border border-[#30363d] bg-[#0d1117] hover:border-[#8b949e] p-4 transition-colors group"
          >
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={15} className="text-[#7d8590]" />
              <span className="text-[#2f81f7] font-semibold text-sm group-hover:underline truncate">
                ngdevelopment-tech / fullstack-open
              </span>
            </div>
            <p className="text-[12.5px] text-[#7d8590] leading-relaxed">
              Exercises and projects for the University of Helsinki Full Stack Open course (2026).
            </p>
            <div className="flex items-center gap-4 mt-3 text-[11.5px] text-[#7d8590]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f1e05a] inline-block" /> JavaScript
              </span>
              <span className="flex items-center gap-1">
                <Star size={12} /> Public
              </span>
              <span className="flex items-center gap-1">
                <GitBranch size={12} /> 26 commits
              </span>
            </div>
          </a>

          <div className="rounded-md border border-dashed border-[#30363d] p-4 flex flex-col text-center">
            <FolderGit2 size={18} className="text-[#484f58] mb-2 mx-auto" />
            <p className="text-[12.5px] text-[#7d8590] leading-relaxed">
              One of several projects — fullstack-open is the public companion repository. New course parts and public work land here as they are completed.
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-[12px] text-[#2f81f7] hover:underline font-medium"
            >
              Follow the profile for updates
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-md border border-[#30363d] bg-[#161b22] p-4 md:p-5">
          <h3 className="text-[13px] font-semibold uppercase tracking-wider text-[#7d8590] mb-3">
            Course coverage — Full Stack Open
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {["part0", "part1", "part2", "part3", "part4", "part5", "part6", "part7", "part8", "part9", "patientor"].map(
              (p) => (
                <span
                  key={p}
                  className="px-2 py-0.5 rounded-full bg-[#0d1117] border border-[#30363d] text-[11.5px] text-[#e6edf3]"
                >
                  {p}
                </span>
              )
            )}
          </div>
          <p className="text-[12px] text-[#7d8590] mt-3 leading-relaxed">
            React, Node.js, Express, MongoDB, PostgreSQL, GraphQL, TypeScript, React Native, testing and CI/CD.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GitHubApp;
