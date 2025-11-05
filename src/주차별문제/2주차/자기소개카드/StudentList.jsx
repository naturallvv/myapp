import { useState } from "react";

export default function StudentList() {
  const [students, setStudents] = useState([
    { id: 1, name: "김민수", major: "AI" },
    { id: 2, name: "이영희", major: "AI" },
  ]);
  const [name, setName] = useState("");
  const [major, setMajor] = useState("AI");
  const [query, setQuery] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const styles = {
    card: {
      border: "1px solid #ddd",
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    input: {
      padding: 8,
      marginRight: 8,
      border: "1px solid #ccc",
      borderRadius: 6,
    },
    button: {
      padding: "6px 10px",
      borderRadius: 6,
      border: "1px solid #ccc",
      cursor: "pointer",
      marginLeft: 4,
    },
  };

  const handleDelete = (id) =>
    setStudents((prev) => prev.filter((s) => s.id !== id));

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    if (students.some((s) => s.name === trimmed)) {
      alert("중복 이름입니다");
      return;
    }
    const newItem = { id: Date.now(), name: trimmed, major };
    setStudents((prev) => [newItem, ...prev]);
    setName("");
  };

  // 정렬
  const sorted = students
    .slice()
    .sort((a, b) =>
      sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  // 검색
  const filtered = sorted.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section style={styles.card}>
      <h3>학생 명단</h3>

      {/* 검색 인풋 */}
      <input
        style={styles.input}
        placeholder="이름 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* 정렬 버튼 */}
      <button
        style={styles.button}
        onClick={() =>
          setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
        }
      >
        정렬: {sortDirection === "asc" ? "오름차순" : "내림차순"}
      </button>

      <ul>
        {filtered.map((s) => (
          <li key={s.id}>
            {s.name} ({s.major})
            <button style={styles.button} onClick={() => handleDelete(s.id)}>
              삭제
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          style={styles.input}
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        >
          <option value="AI">AI</option>
          <option value="DS">DS</option>
          <option value="SW">SW</option>
        </select>
        <button style={styles.button} type="submit">
          추가
        </button>
      </form>
    </section>
  );
}
