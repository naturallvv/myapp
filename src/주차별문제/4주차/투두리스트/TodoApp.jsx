import { useEffect, useMemo, useState } from "react";

export default function TodoApp() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // 추가: 필터 상태 (all | active | completed)
  const [filter, setFilter] = useState("all");

  // 추가: 모바일 레이아웃 판단 (인라인만 쓰므로 JS로 분기)
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 640 : true
  );
  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 640);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 공통: 완료 항목 하단 정렬 유지 유틸
  const sortByDone = (list) => {
    return [...list].sort((a, b) => Number(a.done) - Number(b.done));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const next = [
      ...todos,
      { id: Date.now(), text: trimmed, done: false },
    ];
    setTodos(sortByDone(next));
    setText("");
  };

  const toggleDone = (id) => {
    const next = todos.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTodos(sortByDone(next));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.done));
  };

  // 필터링된 목록
  const filteredTodos = useMemo(() => {
    if (filter === "all") return todos;
    if (filter === "active") return todos.filter((t) => !t.done);
    return todos.filter((t) => t.done); // completed
  }, [todos, filter]);

  const activeCount = useMemo(
    () => todos.filter((t) => !t.done).length,
    [todos]
  );
  const completedCount = useMemo(
    () => todos.filter((t) => t.done).length,
    [todos]
  );

  // 공유 기능: Web Share API → 클립보드 대체
  const handleShare = async () => {
    const title = `${new Date().toLocaleDateString()} To-do List`;
    const lines = todos.map(
      (t, i) => `${i + 1}. ${t.done ? "✅" : "⬜️"} ${t.text}`
    );
    const textBlob = [title, "", ...lines].join("\n");

    if (navigator.share) {
      try {
        await navigator.share({ title, text: textBlob });
        return;
      } catch (err) {
        // 사용자가 취소할 수 있으므로 무시
      }
    }

    try {
      await navigator.clipboard.writeText(textBlob);
      alert("목록을 클립보드에 복사했습니다.");
    } catch {
      alert("공유/복사에 실패했습니다. 브라우저 권한을 확인하세요.");
    }
  };

  // 인라인 스타일
  const styles = {
    card: {
      width: "100%",
      maxWidth: 960,
      margin: "0 auto",
      padding: 16,
      border: "1px solid #e2e8f0",
      borderRadius: 12,
      boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
      backgroundColor: "#ffffff",
      boxSizing: "border-box",
    },
    titleBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
      gap: 12,
    },
    title: { color: "#0f172a", fontSize: 18, fontWeight: 700, margin: 0 },
    actionsRow: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    pill: (active) => ({
      padding: "8px 12px",
      borderRadius: 999,
      border: active ? "1px solid #0ea5e9" : "1px solid #cbd5e1",
      background: active ? "#e0f2fe" : "#ffffff",
      color: active ? "#075985" : "#0f172a",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 600,
    }),
    shareBtn: {
      padding: "8px 12px",
      borderRadius: 8,
      background: "#0ea5e9",
      color: "#ffffff",
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 13,
    },
    clearBtn: {
      padding: "8px 10px",
      borderRadius: 8,
      background: "#f1f5f9",
      color: "#0f172a",
      border: "1px solid #cbd5e1",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 12,
    },
    form: {
      display: "flex",
      justifyContent: "space-between",
      gap: 8,
      marginBottom: 12,
    },
    input: {
      flex: 1,
      padding: 10,
      borderRadius: 8,
      border: "1px solid #cbd5e1",
      fontSize: 15,
      outline: "none",
    },
    addButton: {
      padding: "10px 14px",
      borderRadius: 8,
      background: "#22c55e",
      color: "white",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
    },
    layout: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: 16,
      alignItems: "start",
    },
    column: {
      border: "1px solid #e2e8f0",
      borderRadius: 12,
      padding: 12,
      background: "#f8fafc",
    },
    columnTitle: {
      fontSize: 14,
      fontWeight: 700,
      color: "#1e293b",
      margin: "0 0 10px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    list: { listStyle: "none", padding: 0, margin: 0 },
    item: (done) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      marginBottom: 8,
      padding: "10px 8px",
      borderRadius: 8,
      border: "1px solid #e2e8f0",
      background: "#ffffff",
      textDecoration: done ? "line-through" : "none",
      color: done ? "#94a3b8" : "#0f172a",
      // 모바일 터치 타겟 확대
      minHeight: 44,
    }),
    left: { display: "flex", alignItems: "center", gap: 10, flex: 1 },
    checkbox: {
      width: 18,
      height: 18,
      cursor: "pointer",
      accentColor: "#0ea5e9",
    },
    delBtn: {
      padding: "6px 10px",
      borderRadius: 6,
      background: "#ef4444",
      color: "white",
      border: "none",
      cursor: "pointer",
      fontSize: 12,
    },
    footer: {
      marginTop: 12,
      textAlign: "right",
      color: "#475569",
      fontSize: 14,
    },
    countBadge: {
      marginLeft: 8,
      padding: "2px 8px",
      borderRadius: 999,
      background: "#e2e8f0",
      color: "#0f172a",
      fontSize: 12,
      fontWeight: 700,
    },
  };

  // 렌더
  return (
    <div style={styles.card}>
      <div style={styles.titleBar}>
        <h2 style={styles.title}>
          {new Date().toLocaleDateString()} To-do List
        </h2>
        <div style={styles.actionsRow}>
          <button
            type="button"
            onClick={() => setFilter("all")}
            style={styles.pill(filter === "all")}
            aria-pressed={filter === "all"}
          >
            모두 보기
            <span style={styles.countBadge}>{todos.length}</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter("active")}
            style={styles.pill(filter === "active")}
            aria-pressed={filter === "active"}
          >
            활성 항목
            <span style={styles.countBadge}>{activeCount}</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter("completed")}
            style={styles.pill(filter === "completed")}
            aria-pressed={filter === "completed"}
          >
            완료 항목
            <span style={styles.countBadge}>{completedCount}</span>
          </button>

          <button type="button" onClick={handleShare} style={styles.shareBtn}>
            목록 공유
          </button>
          {completedCount > 0 && (
            <button type="button" onClick={clearCompleted} style={styles.clearBtn}>
              완료 항목 삭제
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          추가
        </button>
      </form>

      {/* 레이아웃: 필터 '전체'일 때 좌: 오늘의 할 일(미완료), 우: 완료된 할 일 */}
      {filter === "all" ? (
        <div style={styles.layout}>
          <section style={styles.column} aria-label="오늘의 할 일">
            <h3 style={styles.columnTitle}>
              오늘의 할 일 <span style={styles.countBadge}>{activeCount}</span>
            </h3>
            <ul style={styles.list}>
              {todos
                .filter((t) => !t.done)
                .map((t) => (
                  <li key={t.id} style={styles.item(t.done)}>
                    <div style={styles.left}>
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => toggleDone(t.id)}
                        style={styles.checkbox}
                        aria-label="완료 표시"
                      />
                      <span>{t.text}</span>
                    </div>
                    <button
                      onClick={() => deleteTodo(t.id)}
                      style={styles.delBtn}
                    >
                      삭제
                    </button>
                  </li>
                ))}
            </ul>
          </section>

          <section style={styles.column} aria-label="완료된 할 일">
            <h3 style={styles.columnTitle}>
              완료된 할 일{" "}
              <span style={styles.countBadge}>{completedCount}</span>
            </h3>
            <ul style={styles.list}>
              {todos
                .filter((t) => t.done)
                .map((t) => (
                  <li key={t.id} style={styles.item(t.done)}>
                    <div style={styles.left}>
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => toggleDone(t.id)}
                        style={styles.checkbox}
                        aria-label="완료 해제"
                      />
                      <span>{t.text}</span>
                    </div>
                    <button
                      onClick={() => deleteTodo(t.id)}
                      style={styles.delBtn}
                    >
                      삭제
                    </button>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      ) : (
        // 필터링 보기는 단일 리스트
        <ul style={styles.list}>
          {filteredTodos.map((t) => (
            <li key={t.id} style={styles.item(t.done)}>
              <div style={styles.left}>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleDone(t.id)}
                  style={styles.checkbox}
                />
                <span>{t.text}</span>
              </div>
              <button onClick={() => deleteTodo(t.id)} style={styles.delBtn}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}

      <p style={styles.footer}>
        남은 할 일: {activeCount} / 전체: {todos.length}
      </p>
    </div>
  );
}
