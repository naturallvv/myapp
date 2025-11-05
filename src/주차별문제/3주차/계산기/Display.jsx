export default function Display({ value }) {
  const style = {
    height: 50,
    border: "1px solid #ccc",
    marginBottom: 12,
    fontSize: 24,
    padding: "10px",
    borderRadius: 8,
    backgroundColor: "#fff",
    textAlign: "right",
    lineHeight: "30px",
  };

  return <div style={style}>{value || 0}</div>;
}
