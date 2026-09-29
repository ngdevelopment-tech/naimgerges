import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Monitor,
  Clock,
  Cloud,
  Download,
  FileText,
  Folder,
  Menu,
  Grid2x2,
} from "lucide-react";
import { FolderIcon, CVIcon, ProjectsIcon, TerminalIcon } from "../icons/AppIcons";
import { useLauncher } from "../WindowContext";

type FileType = "folder" | "file" | "app";

interface FsItem {
  id: string;
  name: string;
  type: FileType;
  open?: string; // app id to launch on double click
  children?: FsItem[];
}

const TREE: FsItem[] = [
  {
    id: "desktop",
    name: "Desktop",
    type: "folder",
    children: [
      { id: "cv", name: "Naim_Gerges_CV.pdf", type: "file", open: "cv" },
      { id: "projects-shortcut", name: "Projects", type: "folder", open: "projects" },
      { id: "github-shortcut", name: "GitHub", type: "app", open: "github" },
    ],
  },
  {
    id: "documents",
    name: "Documents",
    type: "folder",
    children: [
      {
        id: "certificates",
        name: "Certificates",
        type: "folder",
        children: [
          { id: "c1", name: "Full Stack Open — University of Helsinki.pdf", type: "file" },
          { id: "c2", name: "Foire des Sciences USJ — 1st Prize.pdf", type: "file" },
        ],
      },
      { id: "n1", name: "Professional Bio.txt", type: "file", open: "notes" },
    ],
  },
  {
    id: "downloads",
    name: "Downloads",
    type: "folder",
    children: [],
  },
  {
    id: "icloud",
    name: "iCloud Drive",
    type: "folder",
    children: [],
  },
  {
    id: "applications",
    name: "Applications",
    type: "folder",
    children: [
      { id: "a-safari", name: "Safari", type: "app", open: "safari" },
      { id: "a-terminal", name: "Terminal", type: "app", open: "terminal" },
      { id: "a-calc", name: "Calculator", type: "app", open: "calculator" },
      { id: "a-music", name: "Music", type: "app", open: "music" },
      { id: "a-settings", name: "System Settings", type: "app", open: "settings" },
    ],
  },
  {
    id: "projects",
    name: "Projects",
    type: "folder",
    children: [
      { id: "p1", name: "LibaTourism", type: "folder", open: "projects" },
      { id: "p2", name: "Deals On Wheels", type: "folder", open: "projects" },
      { id: "p3", name: "Patisserie Sidawi", type: "folder", open: "projects" },
      { id: "p4", name: "fullstack-open", type: "folder", open: "github" },
      { id: "p5", name: "FinVisio", type: "folder", open: "projects" },
    ],
  },
];

const SIDEBAR: { section: string; items: { id: string; label: string; icon: React.ReactNode }[] }[] = [
  {
    section: "Favorites",
    items: [
      { id: "desktop", label: "Desktop", icon: <Monitor size={16} /> },
      { id: "documents", label: "Documents", icon: <FileText size={16} /> },
      { id: "downloads", label: "Downloads", icon: <Download size={16} /> },
      { id: "applications", label: "Applications", icon: <Grid2x2 size={16} /> },
      { id: "projects", label: "Projects", icon: <Folder size={16} /> },
    ],
  },
  {
    section: "iCloud",
    items: [{ id: "icloud", label: "iCloud Drive", icon: <Cloud size={16} /> }],
  },
];

const findFolder = (items: FsItem[], id: string): FsItem | undefined => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findFolder(item.children, id);
      if (found) return found;
    }
  }
  return undefined;
};

interface FinderAppProps {
  onOpenApp?: (id: string) => void;
}

const FinderApp: React.FC<FinderAppProps> = ({ onOpenApp: onOpenAppProp }) => {
  const launchFromContext = useLauncher().launchApp;
  const onOpenApp = onOpenAppProp ?? launchFromContext;
  const [path, setPath] = useState<string[]>(["desktop"]);
  const [selected, setSelected] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState<string[][]>([["desktop"]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const currentId = path[path.length - 1];
  const current = findFolder(TREE, currentId) ?? TREE[0];

  const navigate = (id: string, open?: string) => {
    if (open) {
      onOpenApp?.(open);
      return;
    }
    const target = findFolder(TREE, id);
    if (!target || target.type !== "folder") return;
    const newPath = [...path, id];
    setPath(newPath);
    setSelected(null);
    setSidebarOpen(false);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newPath);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setPath(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setPath(history[historyIndex + 1]);
    }
  };

  return (
    <div className="flex h-full w-full bg-white text-gray-800 overflow-hidden relative">
      {/* Sidebar */}
      <aside
        className={`absolute inset-y-0 left-0 z-30 w-60 bg-[#f2f2f4]/95 backdrop-blur-xl border-r border-black/5 transition-transform duration-300 md:relative md:translate-x-0 md:shadow-none md:w-56 ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="h-11 hidden md:flex items-center pl-4 shrink-0" />
        <div className="h-12 md:hidden" />
        <div className="overflow-y-auto px-2.5 pb-4 h-[calc(100%-3.5rem)]">
          {SIDEBAR.map((group) => (
            <div key={group.section} className="mb-4">
              <div className="text-[11px] font-bold text-gray-400 px-2 mb-1 uppercase tracking-wide">
                {group.section}
              </div>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    const target = findFolder(TREE, item.id);
                    if (target?.type === "folder") {
                      setPath([item.id]);
                      setSelected(null);
                      setSidebarOpen(false);
                    }
                  }}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-[5px] rounded-md text-[13px] font-medium transition-colors ${
                    currentId === item.id ? "bg-black/10 text-gray-900" : "text-gray-600 hover:bg-black/5"
                  }`}
                >
                  <span className={currentId === item.id ? "text-[#0a66ff]" : "text-gray-400"}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {sidebarOpen && (
        <div className="absolute inset-0 bg-black/20 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-9 md:h-0 shrink-0 bg-[#f6f6f6] md:bg-transparent" />

        <div className="h-12 flex items-center px-2 md:px-3 gap-2 border-b border-black/5 shrink-0">
          <button
            className="md:hidden p-1.5 rounded-md hover:bg-black/5 text-gray-600"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={19} />
          </button>
          <div className="hidden md:flex items-center gap-1 text-gray-500">
            <button
              onClick={goBack}
              disabled={historyIndex === 0}
              className="p-1 rounded hover:bg-black/5 disabled:opacity-30"
              aria-label="Back"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goForward}
              disabled={historyIndex === history.length - 1}
              className="p-1 rounded hover:bg-black/5 disabled:opacity-30"
              aria-label="Forward"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <span className="font-bold text-[15px] text-gray-800 truncate ml-1">{current.name}</span>
          <div className="ml-auto hidden sm:block">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-2 text-gray-400" />
              <input
                placeholder="Search"
                className="w-36 focus:w-48 transition-all pl-8 pr-2 py-1.5 rounded-md bg-gray-100 text-[13px] outline-none focus:bg-white focus:ring-2 focus:ring-[#0a66ff]/20"
              />
            </div>
          </div>
        </div>

        {/* File grid */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4" onClick={() => setSelected(null)}>
          {(current.children?.length ?? 0) === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-3">
              <Folder size={56} strokeWidth={0.8} />
              <p className="text-[13px] text-gray-400 font-medium">Folder is empty</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1.5 md:gap-2.5">
              {current.children!.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(item.id);
                  }}
                  onDoubleClick={() => navigate(item.id, item.open)}
                  className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-colors ${
                    selected === item.id
                      ? "bg-[#e5efff] border-transparent"
                      : "border-transparent hover:bg-black/[0.03]"
                  }`}
                >
                  <span className="w-12 h-12 md:w-14 md:h-14">
                    {item.type === "folder" && <FolderIcon />}
                    {item.type === "file" && (item.name.endsWith(".pdf") ? <CVIcon /> : <FileText className="w-full h-full text-gray-400" strokeWidth={1} />)}
                    {item.type === "app" && (
                      <span className="block w-full h-full">
                        {item.name === "Terminal" ? <TerminalIcon /> : <ProjectsIcon />}
                      </span>
                    )}
                  </span>
                  <span
                    className={`text-[11px] md:text-[12px] text-center leading-tight line-clamp-2 px-1 rounded ${
                      selected === item.id ? "text-white bg-[#0a66ff]" : "text-gray-600"
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="h-7 border-t border-black/5 flex items-center justify-center text-[11px] text-gray-400 shrink-0">
          {current.children?.length ?? 0} items
        </div>
      </div>
    </div>
  );
};

export default FinderApp;
