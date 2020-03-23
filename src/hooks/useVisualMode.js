import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (!replace) setHistory(prev => [...prev, mode]);
    setMode(newMode);
  }
  function back() {
    if (mode !== initial) {
      const newHistory = history.slice(0, -1);
      setMode(history[history.length - 1]);
      setHistory(newHistory);
    }
  }

  return { mode, transition, back };
}
