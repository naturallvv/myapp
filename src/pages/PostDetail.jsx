// src/pages/PostDetail.jsx
import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function PostDetail() {
  const { postId } = useParams();
  const nav = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    api
      .get(postId)
      .then((row) => alive && (setPost(row), setErr(null)))
      .catch((e) => alive && setErr(e))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [postId]);

  const onDelete = async () => {
    if (!window.confirm("정말 삭제할까요?")) return;
    try {
      await api.remove(postId);
      nav("/posts");
    } catch (e) {
      alert("삭제 실패: " + e.message);
    }
  };

  const onLike = async () => {
    if (!post) return;
    const prev = post.likes || 0;
    setPost({ ...post, likes: prev + 1 }); // 낙관적
    try {
      await api.like(postId, prev + 1);
    } catch (e) {
      setPost({ ...post, likes: prev });
      alert("좋아요 실패");
    }
  };

  const card = {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 22,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  };
  const meta = { color: "#64748b", marginTop: 2, marginBottom: 18 };
  const btn = {
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    cursor: "pointer",
    fontWeight: 600,
  };
  const link = { color: "#0ea5e9", textDecoration: "none", fontWeight: 700 };
  const btnLink = {
  ...btn,
  display: "inline-block",
  textDecoration: "none",
  color: "#0f172a",
  };

  if (loading) return <p aria-busy="true">불러오는 중…</p>;
  if (err) return <p role="alert" style={{ color: "#d33" }}>오류: {err.message}</p>;
  if (!post) return <p>글이 없습니다. <Link to="/posts" style={link}>목록</Link></p>;

  return (
    <div style={card}>
      <h2 style={{ marginTop: 0 }}>{post.title}</h2>
      <p style={{ whiteSpace: "pre-line" }}>{post.body}</p>
      <p style={meta}>
        {new Date(post.createdAt).toLocaleString()}
      </p>

      <p style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 10 }}>
        <span>❤️ {post.likes ?? 0}</span>
        <button style={btn} onClick={onLike}>❤️ 좋아요</button>
        <button style={btn} onClick={onDelete}>🗑 삭제</button>
        <Link to={`/posts/${post.id}/edit`} style={btnLink}>✏ 수정</Link>
        <Link to="/posts" style={btnLink}>목록</Link>
      </p>

    </div>
  );
}
