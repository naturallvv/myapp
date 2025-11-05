import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const styles = {
    card: {
      border: "1px solid #ddd",
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      textAlign: "center",
    },
    button: {
      margin: 4,
      padding: "8px 12px",
      borderRadius: 8,
      border: "1px solid #ccc",
      backgroundColor: "#007bff",
      color: "white",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.card}>
      <p>카운트: {count}</p>
      <button style={styles.button} onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
      <button style={styles.button} onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}
