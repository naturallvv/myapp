// src/pages/EditPost.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { api } from "../api/client";

export default function EditPost() {
  const { postId } = useParams();
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let alive = true;
    api
      .get(postId)
      .then((p) => {
        if (!alive) return;
        setTitle(p.title || "");
        setBody(p.body || "");
        setErr(null);
      })
      .catch((e) => alive && setErr(e))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [postId]);

  const box = {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 20,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  };
  const field = { marginTop: 12 };
  const label = { display: "block", fontWeight: 700, marginBottom: 6 };
  const input = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #CBD5E1",
    borderRadius: 10,
    outline: "none",
    fontSize: 14,
  };
  const error = { color: "#d33", marginTop: 6, fontWeight: 600 };
  const row = { display: "flex", gap: 8, marginTop: 14 };
  const btn = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    background: "#0ea5e9",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  };
  const ghost = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    background: "#f1f5f9",
    color: "#0f172a",
    textDecoration: "none",
    fontWeight: 700,
  };

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "제목은 필수입니다.";
    if (!body.trim()) e.body = "내용을 입력하세요.";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const eMap = validate();
    setErrors(eMap);
    if (Object.keys(eMap).length) return;
    await api.update(postId, { title: title.trim(), body: body.trim() });
    nav(`/posts/${postId}`);
  };

  if (loading) return <p aria-busy="true">불러오는 중…</p>;
  if (err) return <p role="alert" style={{ color: "#d33" }}>오류: {err.message}</p>;

  return (
    <div style={box}>
      <h2 style={{ marginTop: 0 }}>글 수정</h2>
      <form onSubmit={onSubmit}>
        <div style={field}>
          <label style={label}>제목</label>
          <input
            style={input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={!!errors.title}
          />
          {errors.title && <p role="alert" style={error}>{errors.title}</p>}
        </div>

        <div style={field}>
          <label style={label}>내용</label>
          <textarea
            rows={8}
            style={{ ...input, resize: "vertical" }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            aria-invalid={!!errors.body}
          />
          {errors.body && <p role="alert" style={error}>{errors.body}</p>}
        </div>

        <div style={row}>
          <button type="submit" style={btn}>저장</button>
          <Link to={`/posts/${postId}`} style={ghost}>취소</Link>
        </div>
      </form>
    </div>
  );
}
