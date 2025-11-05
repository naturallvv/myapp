// src/data/postsStore.js
let seq = 3;
let posts = [
  { id: 1, title: "첫 글", body: "안녕하세요!", createdAt: Date.now() - 86400000 },
  { id: 2, title: "React Router v7", body: "v7 스타일로 실습", createdAt: Date.now() },
];

let listeners = new Set();
const notify = () => listeners.forEach((fn) => fn());
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

export function list(q = "") {
  const query = q.toLowerCase();
  return posts
    .filter((p) => p.title.toLowerCase().includes(query))
    .sort((a, b) => b.createdAt - a.createdAt);
}
export function get(id) { return posts.find((p) => p.id === Number(id)); }
export function create({ title, body }) {
  const item = { id: seq++, title, body, createdAt: Date.now() };
  posts = [item, ...posts]; notify(); return item;
}
export function update(id, data) {
  posts = posts.map((p) => (p.id === Number(id) ? { ...p, ...data } : p));
  notify(); return get(id);
}
export function remove(id) {
  posts = posts.filter((p) => p.id !== Number(id));
  notify();
}

// localStorage 연동(선택)
const KEY = "posts";
export function saveToLocal() { localStorage.setItem(KEY, JSON.stringify(posts)); }
export function loadFromLocal() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return;
  posts = JSON.parse(raw);
  seq = (posts[0]?.id || 0) + 1; // 단순 증가 규칙
}
