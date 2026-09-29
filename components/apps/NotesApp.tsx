import React, { useState } from "react";
import { SquarePen, Trash2, Search, Pencil } from "lucide-react";
import { NOTES } from "../../constants";

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
}

const seedNotes: Note[] = NOTES.map((n) => ({
  id: n.id,
  title: n.title,
  content: n.content,
  date: n.date,
}));

/** Rendered view of a note: bold first line, divider rules, bullets. */
const FormattedNote: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split("\n");
  return (
    <div className="px-5 md:px-10 py-5 md:py-7 max-w-3xl">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (trimmed === "") return <div key={i} className="h-3.5" />;
        // Rule lines (───) become soft dividers
        if (/^─+$/.test(trimmed)) {
          return <div key={i} className="my-3 h-px bg-gray-200" />;
        }
        const isTitle = i === 0;
        // Bullets: lines starting with "—" or "•"
        if (/^[—•]\s?/.test(trimmed)) {
          return (
            <div key={i} className="flex items-start gap-2.5 mb-1.5">
              <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-[#e6b800] shrink-0" />
              <p className="text-[14.5px] leading-relaxed text-gray-700">{trimmed.replace(/^[—•]\s?/, "")}</p>
            </div>
          );
        }
        return (
          <p
            key={i}
            className={
              isTitle
                ? "text-[19px] md:text-[21px] font-bold text-gray-900 leading-snug mb-1"
                : "text-[14.5px] leading-relaxed text-gray-700 mb-1.5"
            }
          >
            {line}
          </p>
        );
      })}
    </div>
  );
};

const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(seedNotes);
  const [selectedId, setSelectedId] = useState<number>(seedNotes[0]?.id ?? 1);
  const [search, setSearch] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const activeNote = notes.find((n) => n.id === selectedId);

  const createNote = () => {
    const n: Note = { id: Date.now(), title: "New Note", content: "", date: "Just now" };
    setNotes((prev) => [n, ...prev]);
    setSelectedId(n.id);
    setIsComposing(true);
  };

  const updateNote = (content: string) => {
    const title = content.split("\n")[0]?.trim() || "New Note";
    setNotes((prev) => prev.map((n) => (n.id === selectedId ? { ...n, content, title } : n)));
  };

  const deleteNote = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes((prev) => {
      const rest = prev.filter((n) => n.id !== id);
      if (selectedId === id && rest.length > 0) setSelectedId(rest[0].id);
      return rest;
    });
  };

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex bg-white text-gray-800">
      {/* Sidebar */}
      <aside className="w-[46%] sm:w-60 md:w-64 shrink-0 bg-[#f6f6f4] border-r border-black/5 flex flex-col pt-10 min-w-0">
        <div className="px-2.5 pb-2.5 flex items-center gap-2">
          <div className="relative flex-1 min-w-0">
            <Search size={13} className="absolute left-2.5 top-2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full pl-8 pr-2 py-1.5 rounded-md bg-white border border-black/10 text-[13px] outline-none focus:ring-2 focus:ring-[#e6b800]/30"
            />
          </div>
          <button
            onClick={createNote}
            className="p-1.5 rounded-md text-gray-500 hover:bg-black/5 shrink-0"
            title="New note"
            aria-label="New note"
          >
            <SquarePen size={17} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-1.5 pb-2 space-y-0.5">
          {filtered.map((note) => (
            <button
              key={note.id}
              onClick={() => {
                setSelectedId(note.id);
                setIsComposing(false);
              }}
              className={`w-full text-left p-2.5 rounded-lg group transition-colors ${
                selectedId === note.id ? "bg-[#f7e36b] shadow-sm" : "hover:bg-black/5"
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <span className="font-bold text-[13px] truncate flex-1">{note.title || "New Note"}</span>
                <span
                  onClick={(e) => deleteNote(note.id, e)}
                  role="button"
                  aria-label="Delete note"
                  title="Delete note"
                  className={`shrink-0 transition-all ${
                    // Always visible on touch devices; hover-reveal on desktop.
                    selectedId === note.id
                      ? "opacity-100 text-gray-500 hover:text-red-500"
                      : "opacity-60 md:opacity-0 md:group-hover:opacity-100 text-gray-400 hover:text-red-500"
                  }`}
                >
                  <Trash2 size={13} />
                </span>
              </div>
              <div className="flex gap-2 text-[11.5px] text-gray-500 mt-0.5">
                <span className="shrink-0 font-medium hidden lg:inline">{note.date}</span>
                <span className="truncate opacity-70">
                  {note.content.split("\n").slice(1).join(" ").trim() || "No additional text"}
                </span>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-[12.5px] text-gray-400 px-3 py-4">No notes found</p>
          )}
        </div>
      </aside>

      {/* Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-10 shrink-0 flex items-center justify-end px-4">
          {!isComposing && activeNote && (
            <button
              onClick={() => setIsComposing(true)}
              className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-black/5"
              title="Edit note"
              aria-label="Edit note"
            >
              <Pencil size={15} />
            </button>
          )}
        </div>
        {activeNote ? isComposing ? (
          <textarea
            className="flex-1 w-full resize-none outline-none px-5 md:px-10 pb-6 text-[14.5px] leading-relaxed text-gray-800 placeholder-gray-300 bg-white"
            value={activeNote.content}
            onChange={(e) => updateNote(e.target.value)}
            placeholder="Start writing…"
            autoFocus
            spellCheck={false}
          />
        ) : (
          <div className="flex-1 overflow-y-auto">
            <FormattedNote content={activeNote.content} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-3">
            <SquarePen size={44} strokeWidth={1} />
            <p className="text-[13px]">No note selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesApp;
