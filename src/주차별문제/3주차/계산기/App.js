import { useState } from "react";
import Display from "./components/Display";
import Button from "./components/Button";
import History from "./components/History";

export default function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    // C 버튼 처리 (초기화)
    if (value === "C") {
      setInput("");
      return;
    }

    // = 버튼 처리 (계산 실행)
    if (value === "=") {
      try {
        const result = eval(input).toString(); // ⚠ 학습용으로만 사용
        setInput(result);

        const newRecord = `${input} = ${result}`;
        setHistory((prev) => [newRecord, ...prev].slice(0, 5)); // 최근 5개만 유지
      } catch {
        setInput("Error");
      }
      return;
    }

    // 일반 입력 처리
    setInput((prev) => prev + value);
  };

  const styles = {
    container: {
      maxWidth: 300,
      margin: "40px auto",
      textAlign: "center",
      backgroundColor: "#f9f9f9",
      padding: 20,
      borderRadius: 12,
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    keypad: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 10,
      justifyItems: "center",
    },
    errorText: {
      color: "red",
      fontWeight: "bold",
      marginTop: 8,
    },
    sectionTitle: {
      marginTop: 20,
      fontWeight: "bold",
      textAlign: "left",
    },
  };

  const buttons = [
    "7", "8", "9", "+",
    "4", "5", "6", "-",
    "1", "2", "3", "*",
    "0", "C", "=", "/"
  ];

  return (
    <div style={styles.container}>
      <Display value={input} />

      {/* 조건부 렌더링 - 오류 메시지 */}
      {input === "Error" && (
        <p style={styles.errorText}>잘못된 수식입니다!</p>
      )}

      <div style={styles.keypad}>
        {buttons.map((b, idx) => (
          <Button key={idx} label={b} onClick={handleClick} />
        ))}
      </div>

      <h4 style={styles.sectionTitle}>계산 기록</h4>
      <History records={history} />
    </div>
  );
}
