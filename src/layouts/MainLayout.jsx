import { NavLink, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <nav style={{ padding: 12 }}>
        <NavLink to="/">Home</NavLink>{" | "}
        <NavLink to="/posts">Posts</NavLink>{" | "}
        <NavLink to="/weather">Weather</NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
