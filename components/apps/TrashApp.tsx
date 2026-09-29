import React, { useState } from "react";
import { Trash2, FileText, Image as ImageIcon, FileCode2, FileArchive, RotateCcw } from "lucide-react";
import { TrashIcon } from "../icons/AppIcons";

interface TrashedItem {
  name: string;
  kind: "doc" | "image" | "code" | "archive";
  size: string;
  deleted: string;
}

const DEMO_ITEMS: TrashedItem[] = [
  { name: "old-resume-v2.pdf", kind: "doc", size: "248 KB", deleted: "Today, 9:41 AM" },
  { name: "Screenshot 2026-08-14 at 10.32.png", kind: "image", size: "1.2 MB", deleted: "Yesterday" },
  { name: "deprecated-api-draft.ts", kind: "code", size: "18 KB", deleted: "Yesterday" },
  { name: "wallpaper-draft.jpg", kind: "image", size: "3.4 MB", deleted: "Sep 12" },
  { name: "meeting-notes-archived.txt", kind: "doc", size: "6 KB", deleted: "Sep 12" },
  { name: "portfolio-assets.zip", kind: "archive", size: "48.9 MB", deleted: "Sep 8" },
  { name: "test-logger-output.log", kind: "code", size: "842 KB", deleted: "Aug 28" },
  { name: "invoice-draft-2026.pdf", kind: "doc", size: "112 KB", deleted: "Aug 21" },
];

const kindIcon = (kind: TrashedItem["kind"]) => {
  const cls = "w-full h-full";
  switch (kind) {
    case "image":
      return <ImageIcon size={20} strokeWidth={1.5} className="text-sky-500" />;
    case "code":
      return <FileCode2 size={20} strokeWidth={1.5} className="text-violet-500" />;
    case "archive":
      return <FileArchive size={20} strokeWidth={1.5} className="text-amber-500" />;
    default:
      return <FileText size={20} strokeWidth={1.5} className="text-red-400" />;
  }
};

const TrashApp: React.FC = () => {
  const [items, setItems] = useState<TrashedItem[]>(DEMO_ITEMS);
  const [confirming, setConfirming] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [justEmptied, setJustEmptied] = useState(false);

  const empty = () => {
    if (confirming) {
      setItems([]);
      setConfirming(false);
      setJustEmptied(true);
      setTimeout(() => setJustEmptied(false), 4000);
    } else {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
    }
  };

  const putBack = (name: string) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
    setSelected(null);
  };

  return (
    <div className="h-full flex flex-col bg-white text-gray-800">
      <div className="h-9 shrink-0" />
      {/* toolbar */}
      <div className="h-11 border-b border-black/5 flex items-center justify-between px-4 shrink-0 bg-[#f6f6f6]">
        <span className="text-[13px] font-semibold text-gray-700">
          Trash
          {items.length > 0 && (
            <span className="ml-2 text-[11.5px] font-normal text-gray-400">
              {items.length} items
            </span>
          )}
        </span>
        <div className="flex items-center gap-2">
          {selected && items.some((i) => i.name === selected) && (
            <button
              onClick={() => putBack(selected)}
              className="px-3 py-1 rounded-md text-[12px] font-medium bg-white border border-black/10 hover:bg-black/5 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw size={12} /> Put Back
            </button>
          )}
          <button
            onClick={empty}
            disabled={items.length === 0}
            className={`px-3 py-1 rounded-md text-[12px] font-medium transition-colors ${
              items.length === 0
                ? "text-gray-300 cursor-default"
                : confirming
                ? "bg-red-500 text-white"
                : "bg-white border border-black/10 hover:bg-black/5"
            }`}
          >
            {confirming ? "Are you sure?" : "Empty"}
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-3 p-6">
          <span className="w-20 h-20 opacity-30">
            <TrashIcon />
          </span>
          <p className="text-[13px] text-gray-400 font-medium">
            {justEmptied ? "Trash emptied" : "Trash is empty"}
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-3 md:p-4">
          {/* header row (desktop) */}
          <div className="hidden sm:grid grid-cols-[1fr_80px_140px] gap-3 px-3 pb-2 text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider border-b border-black/5">
            <span>Name</span>
            <span className="text-right">Size</span>
            <span className="text-right">Date Deleted</span>
          </div>
          <div className="mt-1">
            {items.map((f) => (
              <button
                key={f.name}
                onClick={() => setSelected(selected === f.name ? null : f.name)}
                className={`w-full text-left rounded-lg px-3 py-2 grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_80px_140px] gap-3 items-center transition-colors ${
                  selected === f.name ? "bg-[#0a66ff] text-white" : "hover:bg-black/[0.04]"
                }`}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <span className="w-7 h-7 shrink-0 rounded-md bg-black/[0.04] flex items-center justify-center">
                    {kindIcon(f.kind)}
                  </span>
                  <span
                    className={`text-[13px] truncate ${
                      selected === f.name ? "font-medium" : "text-gray-700"
                    }`}
                  >
                    {f.name}
                  </span>
                </span>
                <span
                  className={`text-[11.5px] tabular-nums text-right hidden sm:block ${
                    selected === f.name ? "text-white/80" : "text-gray-400"
                  }`}
                >
                  {f.size}
                </span>
                <span
                  className={`text-[11.5px] text-right hidden sm:block ${
                    selected === f.name ? "text-white/80" : "text-gray-400"
                  }`}
                >
                  {f.deleted}
                </span>
                {/* mobile meta line */}
                <span
                  className={`text-[10.5px] text-right sm:hidden ${
                    selected === f.name ? "text-white/80" : "text-gray-400"
                  }`}
                >
                  {f.size}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* status bar */}
      <div className="h-6 shrink-0 border-t border-black/5 bg-[#f6f6f6] flex items-center px-4">
        <span className="text-[10.5px] text-gray-400 flex items-center gap-1">
          <Trash2 size={10} />
          {items.length > 0
            ? "Items moved here are deleted permanently when the Trash is emptied"
            : "Nothing to recover — sparkle clean"}
        </span>
      </div>
    </div>
  );
};

export default TrashApp;
