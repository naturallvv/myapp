// src/pages/Home.jsx
export default function Home() {
  const box = {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 20,
    maxWidth: 720,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  };
  const p = { margin: 0, color: "#334155" };
  const a = { color: "#0284c7", fontWeight: 700, textDecoration: "none" };

  return (
    <div style={box}>
      <h2 style={{ marginTop: 0, marginBottom: 8 }}>홈</h2>
      <p style={p}>
        상단의 <a style={a} href="/posts">Posts</a>로 이동해보세요.
      </p>
    </div>
  );
}
