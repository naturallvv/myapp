import React from "react";
import TodoApp from "./components/TodoApp";

export default function App() {
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      padding: 24,
      boxSizing: "border-box",
      fontFamily:
        "'Inter','Apple SD Gothic Neo',system-ui,-apple-system,Segoe UI,Roboto,Arial,'Noto Sans KR',sans-serif",
    },
    header: {
      textAlign: "center",
      color: "#0f172a",
      marginBottom: 16,
    },
    sub: {
      textAlign: "center",
      color: "#475569",
      fontSize: 14,
      marginTop: 4,
    },
    main: {
      maxWidth: 960,
      margin: "0 auto",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ margin: 0 }}>나의 할 일 관리 앱</h1>
        <p style={styles.sub}>필터링, 정렬, 공유 기능 포함</p>
      </header>
      <main style={styles.main}>
        <TodoApp />
      </main>
    </div>
  );
}
