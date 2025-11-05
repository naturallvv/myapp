import { useState } from "react";

function GreetingInput() {
  const [name, setName] = useState("");

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
        style={{
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          marginRight: "10px",
        }}
      />
      <p style={{ display: "inline", fontSize: "18px" }}>
        안녕하세요, {name ? name : "정내혁"}님!
      </p>
    </div>
  );
}

export default GreetingInput;
