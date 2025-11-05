// src/api/client.js
const API = process.env.REACT_APP_API_URL ?? "http://localhost:5174";

async function request(path, options = {}) {
  const ac = new AbortController();
  const tm = setTimeout(() => ac.abort(), 10000); // 10s timeout
  try {
    const res = await fetch(`${API}${path}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      signal: ac.signal,
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const ct = res.headers.get("content-type") || "";
    return ct.includes("application/json") ? res.json() : res.text();
  } finally {
    clearTimeout(tm);
  }
}

export const api = {
  list: (q = "") =>
    request(`/posts${q ? `?title_like=${encodeURIComponent(q)}` : ""}`),
  get: (id) => request(`/posts/${id}`),
  create: (data) => request(`/posts`, { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    request(`/posts/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  remove: (id) => request(`/posts/${id}`, { method: "DELETE" }),

  // 선택(확장): 좋아요 낙관적 업데이트용
  like: (id, likes) =>
    request(`/posts/${id}`, { method: "PATCH", body: JSON.stringify({ likes }) }),
};
