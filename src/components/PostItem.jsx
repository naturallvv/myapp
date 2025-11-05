import React from "react";

export default function PostItem({ title, body }) {
  const item = {
    padding: 14,
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    borderRadius: 10,
    boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
  };
  const t = { margin: "0 0 6px 0", fontSize: 16, fontWeight: 700, color: "#0f172a" };
  const b = { margin: 0, fontSize: 14, color: "#334155" };

  return (
    <div style={item}>
      <h3 style={t}>{title}</h3>
      <p style={b}>{body}</p>
    </div>
  );
}
