import { useParams, Link, useNavigate } from "react-router";
import { get, remove } from "../data/postsStore";

export default function PostDetail() {
  const { postId } = useParams();
  const nav = useNavigate();
  const post = get(postId);

  const muted = { color: "#666" };
  const btn = {
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    background: "#f1f5f9",
    cursor: "pointer",
    marginRight: 8,
  };
  const linkBtn = { ...btn, textDecoration: "none", color: "inherit" };

  if (!post)
    return (
      <p>
        글을 찾을 수 없습니다.{" "}
        <Link to="/posts" style={{ textDecoration: "underline" }}>
          목록
        </Link>
      </p>
    );

  const onDelete = () => {
    if (window.confirm("정말 삭제할까요?")) {
      remove(postId);
      nav("/posts");
    }
  };

  return (
    <>
      <h1 style={{ marginTop: 0 }}>{post.title}</h1>
      <p style={{ whiteSpace: "pre-line" }}>{post.body}</p>
      <p style={muted}>{new Date(post.createdAt).toLocaleString()}</p>

      <p>
        <Link to={`/posts/${post.id}/edit`} style={linkBtn}>✎ 수정</Link>
        <button style={btn} onClick={onDelete}>🗑 삭제</button>
        <Link to="/posts" style={linkBtn}>목록</Link>
      </p>
    </>
  );
}
