import React from "react";

export default function SearchBox({ value, onChange }) {
  const row = { display: "flex", gap: 8, alignItems: "center" };
  const input = {
    flex: 1,
    padding: "10px 12px",
    border: "1px solid #CBD5E1",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
  };
  const clearBtn = {
    padding: "10px 12px",
    borderRadius: 8,
    background: "#F1F5F9",
    border: "1px solid #CBD5E1",
    cursor: "pointer",
    fontWeight: 600,
  };

  return (
    <div style={row}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="제목 검색"
        style={input}
      />
      {value ? (
        <button type="button" style={clearBtn} onClick={() => onChange("")}>
          지우기
        </button>
      ) : null}
    </div>
  );
}
