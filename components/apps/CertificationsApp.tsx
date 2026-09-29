import React, { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { CERTIFICATIONS, type Certification } from "../../lib/portfolioData";

/**
 * Licenses & Certifications — its own app, LinkedIn section for LinkedIn
 * section: real issuer logos, certificate media, and clickable credentials.
 */
const CertificationsApp: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(CERTIFICATIONS[0].id);
  const [detailOpen, setDetailOpen] = useState(false);
  const active: Certification =
    CERTIFICATIONS.find((c) => c.id === activeId) ?? CERTIFICATIONS[0];

  return (
    <div className="h-full flex bg-white text-gray-800 overflow-hidden">
      {/* ----- List ----- */}
      <div
        className={`${
          detailOpen ? "hidden md:flex" : "flex"
        } w-full md:w-[340px] lg:w-[380px] shrink-0 flex-col border-r border-black/10`}
      >
        <div className="h-9 shrink-0" />
        <div className="px-4 pt-2 pb-3 border-b border-black/5 shrink-0">
          <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">
            Licenses & Certifications
          </h1>
          <p className="text-[12px] text-gray-500 mt-0.5">{CERTIFICATIONS.length} credentials</p>
        </div>
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

export default CertificationsApp;
