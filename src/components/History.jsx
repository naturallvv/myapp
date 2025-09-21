export default function History({records}) {
    return (
        <ul>
            {records.map((r,idx) => (
                <li key={idx}>{r}</li>
            ))}
        </ul>
    );
}