export default function History({ records }) {
  const styles = {
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      textAlign: "left",
    },
    item: {
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: 8,
      padding: "6px 10px",
      marginBottom: 6,
      fontSize: 16,
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    },
  };

  return (
    <ul style={styles.list}>
      {records.map((r, idx) => (
        <li key={idx} style={styles.item}>
          {r}
        </li>
      ))}
    </ul>
  );
}
