// 목록/검색 페이지
import { Link, useSearchParams } from "react-router";
import { list } from "../data/postsStore";

export default function PostsList() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q") || "";
  const results = list(q);

  const input = {
    width: "100%",
    maxWidth: 640,
    padding: 10,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    outline: "none",
    marginBottom: 12,
  };
  const ul = { paddingLeft: 18, margin: "8px 0" };
  const small = { color: "#64748b", margin: "8px 0" };
  const newRow = { marginTop: 12 };

  return (
    <>
      <h1 style={{ marginTop: 0 }}>📄 게시글 목록</h1>

      <input
        value={q}
        placeholder="제목 검색"
        onChange={(e) => setSp({ q: e.target.value })}
        style={input}
      />

      <p style={small}>총 {results.length}건</p>
      <ul style={ul}>
        {results.map((p) => (
          <li key={p.id} style={{ marginBottom: 6 }}>
            <Link to={`/posts/${p.id}`} style={{ textDecoration: "none" }}>
              {p.title}
            </Link>
            <span style={{ color: "#777", marginLeft: 8 }}>
              {new Date(p.createdAt).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>

      <p style={newRow}>
        <Link to="/posts/new" style={{
          padding: "8px 10px",
          borderRadius: 8,
          border: "1px solid #cbd5e1",
          background: "#f1f5f9",
          textDecoration: "none",
          color: "inherit",
          fontWeight: 600
        }}>
          ＋ 새 글 쓰기
        </Link>
      </p>
    </>
  );
}
