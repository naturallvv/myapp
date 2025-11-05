// src/pages/PostsList.jsx
import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router";
import { api } from "../api/client";


export default function PostsList() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q") || "";

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [post, setPost] = useState(1);
  const { postId } = useParams();

  const btn = {
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    cursor: "pointer",
    fontWeight: 600,
  };

  const onLike = async () => {
    if (!post) return;
    const prev = post.likes || 0;
    setPost({ ...post, likes: prev + 1 }); // 낙관적
    try {
      await api.like(postId, prev + 1);
    } catch (e) {
      setPost({ ...post, likes: prev + 1 });
      alert("좋아요 실패");
    }
  };

  useEffect(() => {
    let alive = true;
    setLoading(true);
    api
      .list(q)
      .then((data) => {
        if (alive) {
          setRows(data);
          setErr(null);
        }
      })
      .catch((e) => alive && setErr(e))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [q]);  

  const card = {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 20,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  };
  const row = { display: "flex", gap: 8, marginBottom: 14 };
  const input = {
    flex: 1,
    padding: "10px 12px",
    border: "1px solid #CBD5E1",
    borderRadius: 10,
    outline: "none",
    fontSize: 14,
    background: "#fff",
  };
  const ul = { margin: 0, paddingLeft: 18 };
  const li = {
    padding: "8px 0",
    borderBottom: "1px dashed #e2e8f0",
    listStyle: "disc",
  };
  const link = { color: "#0ea5e9", textDecoration: "none", fontWeight: 700 };
  const ghost = { color: "#64748b", marginTop: 6 };

  const clearBtn = {
    padding: "10px 12px",
    borderRadius: 10,
    background: "#F1F5F9",
    border: "1px solid #CBD5E1",
    cursor: "pointer",
    fontWeight: 600,
  };

  return (
    <div style={card}>
      <h2 style={{ marginTop: 0 }}>게시글 목록</h2>

      <div style={row}>
        <input
          value={q}
          placeholder="제목 검색"
          onChange={(e) => setSp({ q: e.target.value })}
          style={input}
        />
        {q ? (
          <button type="button" style={clearBtn} onClick={() => setSp({ q: "" })}>
            지우기
          </button>
        ) : null}
      </div>

      {loading && <p aria-busy="true" style={ghost}>불러오는 중…</p>}
      {err && (
        <p role="alert" style={{ color: "#d33", fontWeight: 600 }}>
          오류: {err.message}
        </p>
      )}
      {!loading && !err && rows.length === 0 && (
        <p style={ghost}>게시글이 없습니다.</p>
      )}

      <ul style={ul}>
        {rows.map((p) => (
          <li key={p.id} style={li}>
            <Link to={`/posts/${p.id}`} style={link}>
              {p.title}
            </Link>            
            <span>❤️ {post.likes ?? 0}</span>
            <button style={btn} onClick={onLike}>❤️ 좋아요</button>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: 14 }}>
        <Link to="/posts/new" style={{ ...link, fontSize: 14 }}>➕ 새 글 작성</Link>
      </p>
    </div>
  );
}
