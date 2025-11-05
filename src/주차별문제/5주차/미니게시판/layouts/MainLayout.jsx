import { Outlet, NavLink, useLocation } from "react-router";
import { useEffect, useRef } from "react";

export default function MainLayout() {
  const h1Ref = useRef(null);
  const location = useLocation();

  // 경로 변경 시 스크롤 상단 + 헤딩 포커스
  useEffect(() => {
    window.scrollTo(0, 0);
    h1Ref.current?.focus();
  }, [location.pathname]);

  const header = {
    padding: 12,
    borderBottom: "1px solid #e2e8f0",
    marginBottom: 12,
  };
  const navLink = (isActive) => ({
    padding: "8px 10px",
    borderRadius: 8,
    textDecoration: "none",
    color: isActive ? "#0f172a" : "#334155",
    background: isActive ? "#e2e8f0" : "transparent",
    fontWeight: 600,
    marginRight: 8,
  });
  const main = { maxWidth: 800, margin: "0 auto", padding: 12 };
  const footer = {
    textAlign: "center",
    padding: 12,
    color: "#666",
    borderTop: "1px solid #e2e8f0",
    marginTop: 24,
  };

  return (
    <>
      <header style={header}>
        <NavLink to="/" children={({ isActive }) => (
          <span style={navLink(isActive)}>Home</span>
        )} />
        <NavLink to="/posts" children={({ isActive }) => (
          <span style={navLink(isActive)}>Posts</span>
        )} />
        <NavLink to="/posts/new" children={({ isActive }) => (
          <span style={navLink(isActive)}>New</span>
        )} />
      </header>

      <main style={main}>
        {/* 접근성용 보이지 않는 페이지 헤딩 */}
        <h1
          tabIndex={-1}
          ref={h1Ref}
          style={{ position: "absolute", left: -9999 }}
        >
          Page Heading
        </h1>
        <Outlet />
      </main>

      <footer style={footer}>© 2025</footer>
    </>
  );
}
