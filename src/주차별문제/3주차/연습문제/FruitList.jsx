export default function FruitList() {
  const fruits = ["사과", "바나나", "포도", "딸기"];

  const styles = {
    card: {
      border: "1px solid #ddd",
      borderRadius: 12,
      padding: 16,
      backgroundColor: "#fafafa",
      width: 200,
      margin: "20px auto",
      textAlign: "left",
    },
    title: {
      textAlign: "center",
      marginBottom: 12,
      fontWeight: "bold",
    },
    list: {
      listStyle: "disc",
      paddingLeft: 24,
      margin: 0,
    },
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>과일 리스트</h3>
      <ul style={styles.list}>
        {fruits.map((fruit, idx) => (
          <li key={idx}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}
