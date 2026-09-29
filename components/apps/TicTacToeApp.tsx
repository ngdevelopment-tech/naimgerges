import React, { useState, useEffect, useCallback } from "react";
import { RotateCcw } from "lucide-react";

type Player = "X" | "O" | null;

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = (s: Player[]) => {
  for (const [a, b, c] of LINES) {
    if (s[a] && s[a] === s[b] && s[a] === s[c]) {
      return { winner: s[a], line: [a, b, c] as number[] };
    }
  }
  return null;
};

const TicTacToeApp: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(true);
  const [status, setStatus] = useState<"playing" | "won" | "draw">("playing");
  const [winner, setWinner] = useState<Player>(null);
  const [winLine, setWinLine] = useState<number[] | null>(null);
  const [score, setScore] = useState({ you: 0, cpu: 0 });

  const finish = (b: Player[]) => {
    const result = checkWinner(b);
    if (result) {
      setStatus("won");
      setWinner(result.winner);
      setWinLine(result.line);
      setScore((s) =>
        result.winner === "X" ? { ...s, you: s.you + 1 } : { ...s, cpu: s.cpu + 1 }
      );
      return true;
    }
    if (!b.includes(null)) {
      setStatus("draw");
      return true;
    }
    return false;
  };

  const play = (i: number) => {
    if (board[i] || status !== "playing" || !playerTurn) return;
    const b = [...board];
    b[i] = "X";
    setBoard(b);
    if (!finish(b)) setPlayerTurn(false);
  };

  const cpuMove = useCallback(() => {
    if (status !== "playing") return;
    const empty = board.map((v, i) => (v === null ? i : -1)).filter((i) => i >= 0);
    if (empty.length === 0) return;

    const tryLine = (p: Player) => {
      for (const i of empty) {
        const t = [...board];
        t[i] = p;
        if (checkWinner(t)) return i;
      }
      return -1;
    };

    let move = tryLine("O"); // win
    if (move === -1) move = tryLine("X"); // block
    if (move === -1 && board[4] === null) move = 4; // center
    if (move === -1) {
      const corners = [0, 2, 6, 8].filter((c) => board[c] === null);
      move =
        corners.length > 0 && Math.random() > 0.4
          ? corners[Math.floor(Math.random() * corners.length)]
          : empty[Math.floor(Math.random() * empty.length)];
    }

    const b = [...board];
    b[move] = "O";
    setBoard(b);
    if (!finish(b)) setPlayerTurn(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, status]);

  useEffect(() => {
    if (!playerTurn && status === "playing") {
      const t = setTimeout(cpuMove, 550);
      return () => clearTimeout(t);
    }
  }, [playerTurn, status, cpuMove]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setPlayerTurn(true);
    setStatus("playing");
    setWinner(null);
    setWinLine(null);
  };

  const lineStyle = (): React.CSSProperties | null => {
    if (!winLine) return null;
    const [a, , c] = winLine;
    const s: React.CSSProperties = { position: "absolute", transition: "all .3s ease" };
    const map: Record<string, React.CSSProperties> = {
      "0-2": { top: "16.6%", left: "3%", right: "3%", height: 4 },
      "3-5": { top: "50%", marginTop: -2, left: "3%", right: "3%", height: 4 },
      "6-8": { bottom: "16.6%", left: "3%", right: "3%", height: 4 },
      "0-6": { left: "16.6%", top: "3%", bottom: "3%", width: 4 },
      "1-7": { left: "50%", marginLeft: -2, top: "3%", bottom: "3%", width: 4 },
      "2-8": { right: "16.6%", top: "3%", bottom: "3%", width: 4 },
      "0-8": {
        top: "50%",
        left: "50%",
        width: "130%",
        height: 4,
        transform: "translate(-50%,-50%) rotate(45deg)",
      },
      "2-6": {
        top: "50%",
        left: "50%",
        width: "130%",
        height: 4,
        transform: "translate(-50%,-50%) rotate(-45deg)",
      },
    };
    return { ...s, ...map[`${a}-${c}`] };
  };

  return (
    <div className="h-full flex flex-col select-none items-center bg-gradient-to-b from-[#1c1c22] to-[#101014] text-white">
      <div className="h-12 shrink-0" />

      {/* Scoreboard */}
      <div className="w-full px-5 pb-3 flex justify-between items-center shrink-0 max-w-sm">
        <div className={`flex flex-col items-center transition-opacity ${playerTurn && status === "playing" ? "opacity-100" : "opacity-40"}`}>
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">You</span>
          <span className="text-[26px] font-bold bg-gradient-to-b from-[#7de2ff] to-[#0a84ff] bg-clip-text text-transparent leading-none">X</span>
          <span className="text-[11px] text-white/40 mt-0.5 tabular-nums">{score.you}</span>
        </div>
        <span className="text-[11px] font-semibold text-white/50 bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
          {status === "playing" ? "vs" : status === "draw" ? "draw" : "wins"}
        </span>
        <div className={`flex flex-col items-center transition-opacity ${!playerTurn && status === "playing" ? "opacity-100" : "opacity-40"}`}>
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">CPU</span>
          <span className="text-[26px] font-bold bg-gradient-to-b from-[#ff8f7d] to-[#ff453a] bg-clip-text text-transparent leading-none">O</span>
          <span className="text-[11px] text-white/40 mt-0.5 tabular-nums">{score.cpu}</span>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 flex items-center justify-center w-full p-4 min-h-0">
        <div className="relative w-full max-w-[300px] aspect-square grid grid-cols-3 gap-2">
          {winLine && (
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="bg-white/80 rounded-full shadow-[0_0_16px_rgba(255,255,255,0.45)]" style={lineStyle() ?? {}} />
            </div>
          )}
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => play(i)}
              disabled={!!cell || status !== "playing" || !playerTurn}
              className={`rounded-2xl text-[42px] font-bold flex items-center justify-center transition-all duration-150 ${
                cell
                  ? "bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  : "bg-white/[0.04] hover:bg-white/[0.09] active:scale-95 border border-white/5"
              } ${
                cell === "X"
                  ? "bg-gradient-to-b from-[#7de2ff] to-[#0a84ff] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(10,132,255,0.35)]"
                  : "bg-gradient-to-b from-[#ff8f7d] to-[#ff453a] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(255,69,58,0.35)]"
              }`}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>

      <div className="h-20 flex items-center justify-center shrink-0 pb-5">
        {status !== "playing" && (
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-2 bg-white text-gray-900 rounded-full text-[13px] font-semibold shadow-lg hover:bg-white/90 active:scale-95 transition-all"
          >
            <RotateCcw size={13} /> {status === "draw" ? "Draw — play again" : "Play again"}
          </button>
        )}
      </div>
    </div>
  );
};

export default TicTacToeApp;
