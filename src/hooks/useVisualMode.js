import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (!replace) history.push(newMode);
    setMode(newMode);
  }
  function back() {
    if (mode !== initial) {
      history.pop(history);
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}
