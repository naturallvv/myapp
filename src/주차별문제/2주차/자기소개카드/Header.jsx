export default function Header() {
  const styles = {
    header: {
      textAlign: "center",
      borderBottom: "1px solid #ddd",
      marginBottom: 24,
      paddingBottom: 8,
    },
    title: { margin: 0 },
    subtitle: { color: "#777", fontSize: 14 },
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>App Programming</h1>
      <p style={styles.subtitle}>React Practice – Week 2</p>
    </header>
  );
}
