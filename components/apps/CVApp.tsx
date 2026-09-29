import React, { useState, useMemo } from "react";
import { Download, ExternalLink, ZoomIn, ZoomOut, FileText } from "lucide-react";

const CV_PATH = "./cv/Naim_Gerges_CV.pdf";

/**
 * CV Preview — renders the bundled PDF exactly like macOS Preview.
 * Replace public/cv/Naim_Gerges_CV.pdf to update the document.
 * On Apple mobile devices (which refuse PDFs inside iframes) a clean
 * open/download card is shown instead.
 */
const CVApp: React.FC = () => {
  const [zoom, setZoom] = useState(100);
  const [missing, setMissing] = useState(false);

  const isIOS = useMemo(
    () =>
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    []
  );

  return (
    <div className="flex flex-col h-full bg-[#3e3e40]">
      {/* Clearance for the unified window drag strip */}
      <div className="h-9 shrink-0" />
      {/* Toolbar */}
      <div className="h-11 bg-[#2d2d2f] border-b border-black/40 flex items-center justify-between px-3 shrink-0">
        <span className="text-[13px] font-semibold text-gray-300 truncate">Naim_Gerges_CV.pdf</span>
        <div className="flex items-center gap-1 text-gray-400">
          {!isIOS && (
            <>
              <button
                onClick={() => setZoom((z) => Math.max(50, z - 10))}
                className="p-1.5 hover:bg-white/10 rounded"
                title="Zoom out"
                aria-label="Zoom out"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-[11.5px] tabular-nums w-10 text-center">{zoom}%</span>
              <button
                onClick={() => setZoom((z) => Math.min(200, z + 10))}
                className="p-1.5 hover:bg-white/10 rounded"
                title="Zoom in"
                aria-label="Zoom in"
              >
                <ZoomIn size={16} />
              </button>
              <span className="w-px h-4 bg-gray-600 mx-1.5" />
            </>
          )}
          <a
            href={CV_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 hover:bg-white/10 rounded"
            title="Open in new tab"
          >
            <ExternalLink size={16} />
          </a>
          <a
            href={CV_PATH}
            download="Naim_Gerges_CV.pdf"
            className="p-1.5 rounded bg-[#0a66ff]/20 text-[#6db3ff] hover:bg-[#0a66ff] hover:text-white transition-colors"
            title="Download"
          >
            <Download size={16} />
          </a>
        </div>
      </div>

      {/* Document */}
      <div className="flex-1 overflow-auto bg-[#525659] p-3 md:p-5">
        {isIOS ? (
          <div className="h-full flex items-center justify-center p-2">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
              <span className="w-16 h-16 mx-auto rounded-2xl bg-[#f2f2f7] border border-black/5 flex items-center justify-center text-[#0a66ff]">
                <FileText size={30} strokeWidth={1.4} />
              </span>
              <div className="mt-4 font-semibold text-[15px] text-gray-900">Naim_Gerges_CV.pdf</div>
              <p className="text-[12.5px] text-gray-500 mt-1.5 leading-relaxed">
                iOS doesn't render PDFs inside embedded viewers. Open it in a new tab or download it — it's one tap either way.
              </p>
              <div className="flex gap-2.5 mt-5">
                <a
                  href={CV_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-full bg-[#0a66ff] text-white text-[13px] font-semibold hover:bg-[#0055d4] active:scale-95 transition-all"
                >
                  Open
                </a>
                <a
                  href={CV_PATH}
                  download="Naim_Gerges_CV.pdf"
                  className="flex-1 py-2.5 rounded-full border border-black/15 text-gray-800 text-[13px] font-semibold hover:bg-black/5 active:scale-95 transition-all"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ) : !missing ? (
          <iframe
            src={`${CV_PATH}#view=FitH`}
            className="w-full h-full border-0 bg-white shadow-2xl mx-auto block"
            style={{ maxWidth: 900, width: `${zoom}%` }}
            title="Naim Gerges CV"
            onError={() => setMissing(true)}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3 text-center px-6">
            <div className="text-[15px] font-semibold text-gray-300">CV document not found</div>
            <p className="text-[13px] max-w-sm leading-relaxed">
              Add the file at <code className="font-mono text-[12px] bg-black/30 px-1.5 py-0.5 rounded">public/cv/Naim_Gerges_CV.pdf</code> and reload.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVApp;
