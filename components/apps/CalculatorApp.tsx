import React, { useState, useEffect, useRef, useCallback } from "react";

type Op = "+" | "-" | "×" | "÷";

const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Op | null>(null);
  const [waiting, setWaiting] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const compute = (a: number, b: number, op: Op): number => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b === 0 ? NaN : a / b;
    }
  };

  const fmt = (n: number): string => {
    if (!isFinite(n)) return "Error";
    // keep the display tidy like macOS Calculator
    const s = parseFloat(n.toPrecision(12)).toString();
    return s.length > 12 ? n.toExponential(6) : s;
  };

  const inputDigit = useCallback(
    (d: string) => {
      setDisplay((cur) => {
        if (waiting) {
          setWaiting(false);
          return d === "." ? "0." : d;
        }
        if (d === ".") return cur.includes(".") ? cur : cur + ".";
        if (cur === "0") return d;
        if (cur.replace("-", "").replace(".", "").length >= 10) return cur;
        return cur + d;
      });
    },
    [waiting]
  );

  const clear = useCallback(() => {
    if (display !== "0") {
      setDisplay("0");
      return;
    }
    setPrevValue(null);
    setOperator(null);
    setWaiting(false);
  }, [display]);

  const clearAll = useCallback(() => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setWaiting(false);
  }, []);

  const toggleSign = useCallback(() => {
    setDisplay((cur) => (cur === "0" ? cur : cur.startsWith("-") ? cur.slice(1) : "-" + cur));
  }, []);

  const percent = useCallback(() => {
    setDisplay((cur) => fmt(parseFloat(cur) / 100));
  }, []);

  const setOp = useCallback(
    (op: Op) => {
      const cur = parseFloat(display);
      if (prevValue !== null && operator && !waiting) {
        const result = compute(prevValue, cur, operator);
        setDisplay(fmt(result));
        setPrevValue(result);
      } else {
        setPrevValue(cur);
      }
      setOperator(op);
      setWaiting(true);
    },
    [display, prevValue, operator, waiting]
  );

  const equals = useCallback(() => {
    if (operator === null || prevValue === null) return;
    const cur = parseFloat(display);
    const result = compute(prevValue, cur, operator);
    setHistory((h) =>
      [...h, `${fmt(prevValue)} ${operator} ${fmt(cur)} = ${fmt(result)}`].slice(-5)
    );
    setDisplay(fmt(result));
    setPrevValue(null);
    setOperator(null);
    setWaiting(true);
  }, [display, operator, prevValue]);

  const backspace = useCallback(() => {
    setDisplay((cur) => {
      if (waiting) return cur;
      return cur.length <= 1 || (cur.length === 2 && cur.startsWith("-")) ? "0" : cur.slice(0, -1);
    });
  }, [waiting]);

  // Keyboard support: digits, operators, Enter, Backspace, Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (/^[0-9]$/.test(e.key)) inputDigit(e.key);
      else if (e.key === ".") inputDigit(".");
      else if (e.key === "+") setOp("+");
      else if (e.key === "-") setOp("-");
      else if (e.key === "*") setOp("×");
      else if (e.key === "/") {
        e.preventDefault();
        setOp("÷");
      } else if (e.key === "Enter" || e.key === "=") equals();
      else if (e.key === "Backspace") backspace();
      else if (e.key === "Escape") clearAll();
      else if (e.key === "%") percent();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inputDigit, setOp, equals, backspace, clearAll, percent]);

  const displayFont = (() => {
    const len = display.length;
    if (len <= 6) return "clamp(40px, 12vw, 64px)";
    if (len <= 9) return "clamp(30px, 9vw, 48px)";
    if (len <= 12) return "clamp(22px, 7vw, 36px)";
    return "clamp(16px, 5vw, 26px)";
  })();

  const Btn: React.FC<{
    label: string;
    onClick: () => void;
    variant?: "num" | "fn" | "op";
    active?: boolean;
    wide?: boolean;
  }> = ({ label, onClick, variant = "num", active, wide }) => {
    const colors =
      variant === "num"
        ? "bg-gradient-to-b from-[#3d3d41] to-[#2e2e31] active:from-[#4c4c51] active:to-[#3a3a3e] text-white"
        : variant === "fn"
        ? "bg-gradient-to-b from-[#b5b5ba] to-[#9c9ca1] active:from-[#c9c9ce] active:to-[#b0b0b5] text-black"
        : active
        ? "bg-[#ff9f0a] text-white ring-2 ring-inset ring-white shadow-none"
        : "bg-gradient-to-b from-[#ffb142] to-[#f39500] active:from-[#ffc266] active:to-[#ffa32b] text-white";
    return (
      <button
        onPointerDown={(e) => e.preventDefault()} // keep focus/keyboard behavior stable
        onClick={onClick}
        className={`${wide ? "col-span-2 !justify-start pl-6" : ""} ${colors} rounded-full flex items-center justify-center font-normal select-none transition-colors duration-75 w-full h-full max-h-[14vw] md:max-h-[13vw] min-h-[44px] text-[clamp(18px,4.5vw,24px)] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.12)]`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-black text-white p-3 md:p-4 pt-[44px] md:pt-12 select-none">
      {/* History ticker */}
      <div className="h-4 text-right text-[11px] text-white/40 font-mono truncate px-1">
        {history.length > 0 && history[history.length - 1]}
      </div>

      {/* Display */}
      <div className="flex items-end justify-end px-2 min-h-[72px] md:min-h-[84px] pb-2">
        <div
          className="font-light tracking-tight leading-none tabular-nums truncate max-w-full"
          style={{ fontSize: displayFont }}
        >
          {display}
        </div>
      </div>

      {/* Keypad */}
      <div className="flex-1 min-h-0 grid grid-cols-4 gap-2.5 md:gap-3">
        <Btn label={display === "0" ? "AC" : "C"} variant="fn" onClick={display === "0" ? clearAll : clear} />
        <Btn label="+/−" variant="fn" onClick={toggleSign} />
        <Btn label="%" variant="fn" onClick={percent} />
        <Btn label="÷" variant="op" active={operator === "÷" && waiting} onClick={() => setOp("÷")} />

        <Btn label="7" onClick={() => inputDigit("7")} />
        <Btn label="8" onClick={() => inputDigit("8")} />
        <Btn label="9" onClick={() => inputDigit("9")} />
        <Btn label="×" variant="op" active={operator === "×" && waiting} onClick={() => setOp("×")} />

        <Btn label="4" onClick={() => inputDigit("4")} />
        <Btn label="5" onClick={() => inputDigit("5")} />
        <Btn label="6" onClick={() => inputDigit("6")} />
        <Btn label="−" variant="op" active={operator === "-" && waiting} onClick={() => setOp("-")} />

        <Btn label="1" onClick={() => inputDigit("1")} />
        <Btn label="2" onClick={() => inputDigit("2")} />
        <Btn label="3" onClick={() => inputDigit("3")} />
        <Btn label="+" variant="op" active={operator === "+" && waiting} onClick={() => setOp("+")} />

        <Btn label="0" wide onClick={() => inputDigit("0")} />
        <Btn label="." onClick={() => inputDigit(".")} />
        <Btn label="=" variant="op" onClick={equals} />
      </div>
    </div>
  );
};

export default CalculatorApp;
