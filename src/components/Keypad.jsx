import Button from "./Button";

export default function Keypad({ onKey }) {
  const buttons = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0","C","=","+",
    "%","AC"
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
      {buttons.map((b, idx) => (
        <Button key={idx} label={b} onClick={() => onKey(b)} />
      ))}
    </div>
  );
}
