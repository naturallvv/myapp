import { useState } from "react";

export default function LikeToggle() {
  const [liked, setLiked] = useState(false);

  const styles = {
    button: {
      padding: "8px 12px",
      borderRadius: 8,
      border: "1px solid #ccc",
      cursor: "pointer",
      backgroundColor: liked ? "#ffe066" : "#f8f9fa",
      fontSize: 16,
      marginBottom: 16,
    },
  };

  return (
    <button style={styles.button} onClick={() => setLiked((v) => !v)}>
      {liked ? "★ Liked" : "☆ Like"}
    </button>
  );
}
