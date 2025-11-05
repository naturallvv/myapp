import { useState } from "react";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 이름 유효성 검사
    if (name.trim() === "") {
      alert("이름을 입력하세요");
      return;
    }

    // 이메일 유효성 검사
    if (email.trim() === "") {
      alert("이메일을 입력하세요");
      return;
    } else if (!email.includes("@")) {
      alert("올바른 이메일 주소를 입력하세요");
      return;
    }

    if (password.length < 6) {
      alert("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    alert(`회원가입 완료!\n이름: ${name}\n이메일: ${email}`);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f9fb",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          width: "300px",
        }}
      >
        <h3 style={{ margin: 0, textAlign: "center" }}>회원가입 폼</h3>

        {/* 이름 입력 */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {/* 이메일 입력 */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {/* 비밀번호 입력 */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {/* 조건부 렌더링 - 비밀번호 유효성 */}
        {password.length > 0 && password.length < 6 && (
          <p style={{ color: "red", fontSize: "13px", margin: 0 }}>
            비밀번호는 6자 이상 입력해주세요.
          </p>
        )}

        <button
          type="submit"
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
