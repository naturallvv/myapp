import React, { useState } from "react";

export default function TextInput() {
  const [text, setText] = useState("");

  return (
    <div>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)}
      />
      <p>입력한 값: {text}</p> {/* 실시간 반영 */}
    </div>
  );
}

export function InputDemo() {
    const [text, setText] = useState("");
    const[ischecked, setIsChecked] = useState(false);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    return (
        <div>
            <input type="text" value={text} onChange={handleTextChange} />
            <div>
                <input type="checkbox" checked={ischecked} onChange={handleCheckboxChange} />
            </div>
            <p>입력된 텍스트: {text}</p>
            <p>체크박스 상태: {ischecked ? "체크됨" : "체크안됨"}</p>
        </div>
    );
}