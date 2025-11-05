import { useState } from "react";

export default function ColorText() {
  // 기본 색상은 검정
  const [color, setColor] = useState("black");

  // 버튼 클릭 시 색상 토글
  const toggleColor = () => {
    setColor((prev) => (prev === "black" ? "blue" : "black"));
  };

  return (
    <div className="card" style={{ padding: "16px" }}>
      <p style={{ color: color }}>
        버튼을 누르면 이 문장의 색상이 바뀝니다!
      </p>
      <button onClick={toggleColor}>색상 변경</button>
    </div>
  );
}
