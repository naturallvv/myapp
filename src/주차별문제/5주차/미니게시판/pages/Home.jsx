export default function Home() {
  const styles = {
    box: {
      padding: 16,
      border: "1px solid #eee",
      borderRadius: 12,
      background: "#fff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    },
    h2: { margin: 0, marginBottom: 8, color: "#111827" },
    p: { margin: 0, color: "#374151" },
  };
  return (
    <section style={styles.box}>
      <h2 style={styles.h2}>미니 게시판 실습</h2>
      <p style={styles.p}>홈입니다. 상단의 <b>Posts</b>로 이동해보세요.</p>
    </section>
  );
}
