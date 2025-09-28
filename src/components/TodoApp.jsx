import { useState, useEffect } from "react";

export default function TodoApp() {
  // 입력값과 할 일 목록 상태 관리
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // 필터 상태: all | active | done
  const [filter, setFilter] = useState("all");

  // localStorage 자동 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 할 일 추가 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now(), text: trimmed, done: false }]);
    setText("");
  };

  // 완료 상태 토글 함수
  const toggleDone = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  // 할 일 삭제 함수
  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // 필터링된 목록
  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true; // all
  });

  // 완료 항목 정렬: done = true 는 아래로
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a.done === b.done) return 0;
    return a.done ? 1 : -1;
  });

  // JSX 렌더링 부분
  return (
    <div className="card">
      <h2>{new Date().toLocaleDateString()} To-do List</h2>

      {/* 입력폼 */}
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button type="submit">추가</button>
      </form>

      {/* 필터 버튼 */}
      <div>
        <button onClick={() => setFilter("all")}>전체</button>
        <button onClick={() => setFilter("active")}>안함</button>
        <button onClick={() => setFilter("done")}>다함</button>
      </div>

      {/* 목록 출력 */}
      <ul>
        {sortedTodos.map((t) => (
          <li
            key={t.id}
            style={{ textDecoration: t.done ? "line-through" : "none" }}
          >
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleDone(t.id)}
            />
            {t.text}
            <button onClick={() => deleteTodo(t.id)}>삭제</button>
          </li>
        ))}
      </ul>

      {/* 남은 할 일 개수 */}
      <p>남은 할 일: {todos.filter((t) => !t.done).length}</p>
    </div>
  );
}
