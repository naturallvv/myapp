// src/App.jsx
import "./App.css";
import { useState } from "react";
import Display from "./components/Display";
import Keypad from "./components/Keypad";
import History from "./components/History";

export default function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
      return;
    }
    if (value === "AC") {
      setInput("");
      setHistory([]);
      return;
    }
    if (value === "=") {
      try {
        const result = Function(`"use strict"; return (${input})`)();
        setInput(String(result));
        setHistory((prev) => [`${input} = ${result}`, ...prev]);
      } catch {
        setInput("Error");
      }
      return;
    }
    setInput((prev) => prev + value);
  };

  return (
    <div className="container">
      <h1>React 계산기</h1>
      <Display value={input} />
      <Keypad onKey={handleClick} />
      <History records={history} />
    </div>
  );
}