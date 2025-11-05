export default function ProfileCard({
  name,
  major,
  interests = [],
  avatarUrl,
}) {
  const styles = {
    card: {
      border: "1px solid #ddd",
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      backgroundColor: "#fafafa",
      textAlign: "center",
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: 12,
    },
    list: { listStyle: "none", padding: 0 },
  };

  return (
    <section style={styles.card}>
      <img
        src={avatarUrl || "/default-avatar.png"}
        alt={`${name} 아바타`}
        style={styles.avatar}
      />
      <h2>{name}</h2>
      <p>전공: {major}</p>
      <ul style={styles.list}>
        {interests.map((it, idx) => (
          <li key={idx}>{it}</li>
        ))}
      </ul>
    </section>
  );
}
