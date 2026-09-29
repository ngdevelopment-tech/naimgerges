import React, { useState, useRef, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Plus,
  Lock,
  ShieldAlert,
  ExternalLink,
  X,
} from "lucide-react";
import { LINKEDIN_URL, LINKEDIN_API_ROUTE } from "../../constants";
import TypingGameApp from "./TypingGameApp";

type ViewMode = "start" | "linkedin-live" | "external";

interface Tab {
  id: number;
  title: string;
  mode: ViewMode;
  iframeUrl: string | null;
}

const BrowserApp: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, title: "Start Page", mode: "start", iframeUrl: null },
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [addressInput, setAddressInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const nextTabId = useRef(2);

  const tab = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  const updateTab = (patch: Partial<Tab>) => {
    setTabs((prev) => prev.map((t) => (t.id === activeTab ? { ...t, ...patch } : t)));
  };

  const navigate = useCallback(
    (raw: string) => {
      const value = raw.trim();
      if (!value) return;

      // LinkedIn stays inside the app through the passthrough route.
      if (/linkedin\.com/i.test(value)) {
        setIframeFailed(false);
        updateTab({ mode: "linkedin-live", iframeUrl: LINKEDIN_API_ROUTE, title: "Naim Gerges — LinkedIn" });
        setAddressInput("linkedin.com/in/naim-gerges-892591271");
        setLoading(true);
        return;
      }

      let target: string;
      if (/^https?:\/\//i.test(value)) {
        target = value;
      } else if (value.includes(".") && !value.includes(" ")) {
        target = "https://" + value;
      } else {
        target = "https://www.bing.com/search?q=" + encodeURIComponent(value);
      }

      let host = target;
      try {
        host = new URL(target).hostname;
      } catch {
        // keep the raw target as the display host
      }

      setIframeFailed(false);
      updateTab({ mode: "external", iframeUrl: target, title: host });
      setAddressInput(host);
      setLoading(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTab]
  );

  const handleLoad = () => setLoading(false);

  const handleIframeError = () => {
    setLoading(false);
    setIframeFailed(true);
  };

  const newTab = () => {
    const id = nextTabId.current++;
    setTabs((prev) => [...prev, { id, title: "Start Page", mode: "start", iframeUrl: null }]);
    setActiveTab(id);
    setAddressInput("");
  };

  const closeTab = (id: number) => {
    const rest = tabs.filter((t) => t.id !== id);
    if (rest.length === 0) {
      const fresh: Tab = { id: nextTabId.current++, title: "Start Page", mode: "start", iframeUrl: null };
      setTabs([fresh]);
      setActiveTab(fresh.id);
      setAddressInput("");
      return;
    }
    setTabs(rest);
    if (id === activeTab) {
      const idx = tabs.findIndex((t) => t.id === id);
      const next = rest[Math.min(idx, rest.length - 1)];
      setActiveTab(next.id);
      setAddressInput("");
    }
  };

  const goHome = () => {
    updateTab({ mode: "start", iframeUrl: null, title: "Start Page" });
    setAddressInput("");
  };

  return (
    <div className="flex flex-col h-full bg-[#f6f6f6]">
      {/* Clearance for the unified window drag strip */}
      <div className="h-9 shrink-0" />
      {/* Toolbar */}
      <div className="h-12 flex items-center px-2 md:px-4 gap-2 md:gap-3 border-b border-black/10 shrink-0">
        <div className="flex gap-3.5 text-[#7a7a7e] shrink-0 pl-1">
          <button onClick={goHome} className="hover:text-black transition-colors" title="Back to start page">
            <ArrowLeft size={18} strokeWidth={2.2} />
          </button>
          <button className="hover:text-black transition-colors opacity-40" title="Forward" disabled>
            <ArrowRight size={18} strokeWidth={2.2} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(addressInput);
          }}
          className="flex-1 max-w-2xl mx-auto min-w-0"
        >
          <div className="flex items-center h-[30px] bg-[#e8e8ea] focus-within:bg-white rounded-lg px-3 border border-transparent focus-within:border-[#0a66ff]/40 focus-within:ring-2 focus-within:ring-[#0a66ff]/25 transition-all">
            {tab.mode === "start" ? (
              <Lock size={11} className="text-gray-500 mr-2 shrink-0" />
            ) : (
              <Lock size={11} className="text-gray-500 mr-2 shrink-0" fill="currentColor" />
            )}
            <input
              className="flex-1 bg-transparent outline-none min-w-0 text-[13px] text-gray-800 placeholder-gray-400 text-center focus:text-left"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              onFocus={(e) => e.target.select()}
              placeholder="Search or enter website name"
            />
            {loading && <RotateCw size={11} className="text-gray-400 animate-spin ml-2 shrink-0" />}
          </div>
        </form>

        <div className="flex gap-3 text-[#7a7a7e] shrink-0">
          <button
            className="hover:text-black transition-colors"
            title="Reload"
            onClick={() => tab.iframeUrl && navigate(tab.iframeUrl)}
          >
            <RotateCw size={15} />
          </button>
          <button className="hover:text-black transition-colors" title="New Tab" onClick={newTab}>
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Tab strip */}
      <div className="h-9 flex items-end px-2 gap-1 bg-[#eeeeee] border-b border-black/10 shrink-0 overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <div
            key={t.id}
            onClick={() => {
              setActiveTab(t.id);
              setAddressInput("");
            }}
            className={`group flex items-center gap-2 h-[30px] px-3 rounded-t-lg cursor-default min-w-[120px] max-w-[220px] text-[12px] ${
              t.id === activeTab ? "bg-[#f6f6f6] text-gray-900 font-medium" : "text-gray-500 hover:bg-black/5"
            }`}
          >
            <span className="truncate flex-1">{t.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(t.id);
              }}
              className="opacity-0 group-hover:opacity-100 hover:text-black"
              aria-label="Close tab"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0 relative bg-white">
        {/* Start page: the typing game, with favorites docked below. */}
        {tab.mode === "start" && (
          <>
            <TypingGameApp />
            <div className="absolute bottom-0 left-0 right-0 hidden sm:flex items-center gap-2 px-4 py-2 bg-[#f6f6f6]/92 backdrop-blur border-t border-black/5 z-10">
              <span className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider mr-1">
                Favorites
              </span>
              <button
                onClick={() => navigate(LINKEDIN_URL)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/10 text-[12px] font-medium text-gray-700 hover:bg-black/5 active:scale-95 transition-all"
              >
                <span className="w-4 h-4 rounded-[4px] bg-[#0a66c2] text-white text-[9px] font-bold flex items-center justify-center">
                  in
                </span>
                LinkedIn
              </button>
            </div>
          </>
        )}

        {tab.mode === "linkedin-live" &&
          (!iframeFailed ? (
            <iframe
              src={tab.iframeUrl ?? LINKEDIN_API_ROUTE}
              className="w-full h-full border-0"
              title="LinkedIn"
              referrerPolicy="no-referrer"
              onLoad={handleLoad}
              onError={handleIframeError}
            />
          ) : (
            <Fallback
              message="The live LinkedIn view could not be loaded."
              url={LINKEDIN_URL}
            />
          ))}

        {tab.mode === "external" && tab.iframeUrl && !iframeFailed && (
          <iframe
            src={tab.iframeUrl}
            className="w-full h-full border-0"
            title={tab.title}
            onLoad={handleLoad}
            onError={handleIframeError}
          />
        )}

        {tab.mode === "external" && iframeFailed && (
          <Fallback message="This site refused to be displayed inside another page." url={tab.iframeUrl ?? ""} />
        )}
      </div>
    </div>
  );
};

const Fallback: React.FC<{ message: string; url: string }> = ({ message, url }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-[#f9f9f9] text-center p-8">
    <ShieldAlert size={44} className="text-gray-400 mb-4" />
    <h2 className="text-lg font-semibold text-gray-800 mb-2">Cannot display this page</h2>
    <p className="text-gray-500 max-w-md text-sm leading-relaxed mb-6">{message}</p>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-[#0a66ff] hover:bg-[#0055d4] text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-md active:scale-95"
    >
      Open directly <ExternalLink size={15} />
    </a>
  </div>
);

export default BrowserApp;
