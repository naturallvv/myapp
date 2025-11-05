import { useState } from "react";

export default function Greeter() {
  const [name, setName] = useState("");

  const styles = {
    card: {
      border: "1px solid #ddd",
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    input: {
      padding: 8,
      borderRadius: 6,
      border: "1px solid #ccc",
      marginRight: 8,
    },
  };

  return (
    <div style={styles.card}>
      <input
        placeholder="이름 입력"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <p>안녕하세요, {name || "익명"}님!</p>
    </div>
  );
}
