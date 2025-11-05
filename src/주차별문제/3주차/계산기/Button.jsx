export default function Button({ label, onClick }) {
  const style = {
    width: 60,
    height: 60,
    border: "none",
    borderRadius: 10,
    backgroundColor:
      label === "C"
        ? "#ff6b6b"
        : label === "="
        ? "#4dabf7"
        : label === "%"
        ? "#63e6be"
        : "#e9ecef",
    color:
      label === "C" || label === "=" ? "white" : "black",
    fontSize: 20,
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.1s ease-in-out",
  };

  const handleMouseDown = (e) => (e.target.style.transform = "scale(0.9)");
  const handleMouseUp = (e) => (e.target.style.transform = "scale(1)");

  return (
    <button
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
}
