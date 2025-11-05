import { useState } from "react";

function EmailForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    if (!email) {
      alert("이메일을 입력해주세요!");
      return;
    }

    // 간단한 이메일 형식 검증 (정규식)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("유효한 이메일 주소를 입력해주세요!");
      return;
    }

    alert(`입력한 이메일: ${email}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        textAlign: "center",
        marginTop: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일을 입력하세요"
        style={{
          padding: "10px 14px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "260px",
          fontSize: "16px",
        }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#4dabf7",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        제출
      </button>
    </form>
  );
}

export default EmailForm;
