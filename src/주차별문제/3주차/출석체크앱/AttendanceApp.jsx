import { useState } from "react";

export default function AttendanceApp() {
  const [students, setStudents] = useState([
    { id: 1, name: "김민준", present: false },
    { id: 2, name: "김서윤", present: false },
    { id: 3, name: "박지후", present: false },
    { id: 4, name: "최서현", present: false },
    { id: 5, name: "임지아", present: false },
  ]);

  // 출석 상태 토글 함수
  function toggleAttendance(id) {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, present: !s.present } : s
      )
    );
  }

  // 스타일 정의
  const styles = {
    container: {
      maxWidth: 400,
      margin: "30px auto",
      border: "1px solid #ddd",
      borderRadius: 12,
      padding: 20,
      backgroundColor: "#fafafa",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
    },
    list: { listStyle: "none", padding: 0, margin: 0 },
    item: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #eee",
      padding: "8px 0",
    },
    name: { fontWeight: "bold", flex: 1 },
    status: (present) => ({
      fontWeight: "bold",
      color: present ? "#28a745" : "#dc3545",
      marginRight: 10,
    }),
    button: {
      border: "1px solid #ccc",
      borderRadius: 6,
      padding: "6px 10px",
      cursor: "pointer",
      backgroundColor: "#007bff",
      color: "white",
    },
    warning: {
      color: "red",
      marginTop: 12,
      textAlign: "center",
    },
  };

  // 출석 학생 수 계산
  const presentCount = students.filter((s) => s.present).length;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>출석 현황</h3>

      <ul style={styles.list}>
        {students.map((s) => (
          <li key={s.id} style={styles.item}>
            <span style={styles.name}>{s.name}</span>
            <span style={styles.status(s.present)}>
              {s.present ? "출석" : "결석"}
            </span>
            <button
              style={styles.button}
              onClick={() => toggleAttendance(s.id)}
            >
              출석 토글
            </button>
          </li>
        ))}
      </ul>

      {/* 조건부 렌더링: 출석 학생이 없을 때 */}
      {presentCount === 0 && (
        <p style={styles.warning}>출석한 학생이 없습니다.</p>
      )}
    </div>
  );
}
