export default function WeatherCard({ data }) {
  if (!data) return null;

const current = data.list?.[0];
const w = current?.weather?.[0] || data.weather?.[0];
const main = current?.main || data.main || {};
const wind = current?.wind || data.wind || {};
const tz = data.city?.timezone || data.timezone || 0;
  const icon = w?.icon
    ? `https://openweathermap.org/img/wn/${w.icon}@2x.png`
    : "";

  const fmt = (sec) =>
    new Date(sec * 1000 + tz).toLocaleTimeString();

  return (
    <>
      {/* 현재 날씨 카드 */}
      <section
        className="card"
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 16,
          marginTop: 16,
        }}
      >
        <h2>
          {data.city?.name || data.name} ({data.city?.country || data.sys?.country})
        </h2>
        <p>{w?.description}</p>
        {icon && <img src={icon} alt="weather icon" />}
        <p>온도: {Math.round(main.temp)}°C</p>
        <p>체감: {Math.round(main.feels_like)}°C</p>
        <p>습도: {main.humidity}%</p>
        <p>풍속: {wind.speed}m/s</p>
        {data.sys?.sunrise && (
          <p>
            일출: {fmt(data.sys.sunrise)} / 일몰: {fmt(data.sys.sunset)}
          </p>
        )}
      </section>

      {/* 3시간 간격 예보 */}
      {data.list && (
        <section style={{ marginTop: 20 }}>
          <h3>3시간 간격 예보</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {data.list.slice(0, 40).map((f, i) => (
              <li key={i} style={{ marginBottom: 8 }}>
                <strong>
                  {new Date(f.dt * 1000).toLocaleString()}
                </strong>{" "}
                : {Math.round(f.main.temp)}°C, {f.weather[0].description}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
