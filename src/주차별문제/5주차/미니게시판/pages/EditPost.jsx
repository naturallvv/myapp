import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { get, update } from "../data/postsStore";

export default function EditPost() {
  const { postId } = useParams();
  const nav = useNavigate();
  const found = get(postId);

  const [title, setTitle] = useState(found?.title || "");
  const [body, setBody] = useState(found?.body || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!found) nav("/posts"); // 없는 글이면 목록으로
  }, [found, nav]);

  const label = { fontWeight: 600, display: "inline-block", marginBottom: 6 };
  const input = {
    width: "100%",
    maxWidth: 640,
    padding: 10,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    outline: "none",
  };
  const error = { color: "#d33", margin: "6px 0 0 0" };
  const row = { marginTop: 12 };
  const btn = {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    background: "#f1f5f9",
    cursor: "pointer",
    marginRight: 8,
  };
  const linkBtn = { ...btn, textDecoration: "none", color: "inherit" };

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "제목은 필수입니다.";
    if (!body.trim()) e.body = "내용을 입력하세요.";
    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    update(postId, { title: title.trim(), body: body.trim() });
    nav(`/posts/${postId}`);
  };

  return (
    <>
      <h1 style={{ marginTop: 0 }}>✎ 글 수정</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label style={label}>제목</label><br />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={!!errors.title}
            style={input}
          />
          {errors.title && <p role="alert" style={error}>{errors.title}</p>}
        </div>

        <div style={row}>
          <label style={label}>내용</label><br />
          <textarea
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            aria-invalid={!!errors.body}
            style={input}
          />
          {errors.body && <p role="alert" style={error}>{errors.body}</p>}
        </div>

        <p style={{ marginTop: 12 }}>
          <button type="submit" style={btn}>저장</button>
          <Link to={`/posts/${postId}`} style={linkBtn}>취소</Link>
        </p>
      </form>
    </>
  );
}
