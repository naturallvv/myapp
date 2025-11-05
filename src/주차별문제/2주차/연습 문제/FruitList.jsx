export default function FruitList({ fruits = [] }) {
  return (
    <div className="card" style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
      <h3>과일 리스트</h3>
      <ul>
        {fruits.map((fruit, idx) => (
          <li key={idx}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}
