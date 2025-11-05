// src/pages/NotFound.jsx
import { Link } from "react-router";

export default function NotFound() {
  const box = {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 24,
    maxWidth: 720,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  };
  const row = { display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" };
  const link = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    background: "#f1f5f9",
    color: "#0f172a",
    textDecoration: "none",
    fontWeight: 700,
  };

  return (
    <div style={box}>
      <h2 style={{ marginTop: 0 }}>페이지를 찾을 수 없습니다</h2>
      <p style={{ color: "#475569" }}>
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <div style={row}>
        <Link to="/" style={link}>홈으로</Link>
        <Link to="/posts" style={link}>글 목록</Link>
      </div>
    </div>
  );
}
