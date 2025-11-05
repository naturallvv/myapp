import { Link } from "react-router";

export default function NotFound() {
  const box = {
    maxWidth: 720,
    margin: "40px auto",
    padding: 24,
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    background: "#fff",
  };
  const title = { margin: "0 0 8px 0" };
  const sub = { margin: "0 0 16px 0", color: "#475569" };
  const row = { display: "flex", gap: 8 };
  const btn = {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    background: "#f1f5f9",
    textDecoration: "none",
    color: "inherit",
    fontWeight: 600,
  };

  return (
    <div style={box}>
      <h1 style={title}>페이지를 찾을 수 없습니다</h1>
      <p style={sub}>요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <div style={row}>
        <Link to="/" style={btn}>홈으로</Link>
        <Link to="/posts" style={btn}>글 목록</Link>
      </div>
    </div>
  );
}
