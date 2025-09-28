export default function MyButton() {
    const handleClick = () =>  alert('Button clicked!');
    return (
        <button onClick={handleClick}>눌러보세요</button>);
}