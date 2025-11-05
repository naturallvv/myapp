// src/App.jsx
import { Routes, Route } from "react-router";
import { Suspense, lazy, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";
import NotFound from "./pages/NotFound";
import { loadFromLocal, saveToLocal, subscribe } from "./data/postsStore";

// 라우트 단위 지연 로딩(목록만 예시)
const PostsList = lazy(() => import("./pages/PostsList"));

export default function App() {
  // 앱 시작 시 로컬에서 복원
  useEffect(() => {
    loadFromLocal();
    // CRUD 변경 시 자동 저장(옵션)
    const unsub = subscribe(() => saveToLocal());
    return unsub;
  }, []);

  return (
    <Suspense fallback={<p>로딩중…</p>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="posts" element={<PostsList />} />
          <Route path="posts/:postId" element={<PostDetail />} />
          <Route path="posts/new" element={<NewPost />} />
          <Route path="posts/:postId/edit" element={<EditPost />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
