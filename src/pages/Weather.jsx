import { useState, useRef, useEffect } from "react";
import { getForecastByCity, getByCoords, getGeoCoords, getForecastByCoords } from "../services/weather";
import WeatherCard from "../components/WeatherCard";

export default function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [units, setUnits] = useState("metric");
  const lastRef = useRef(null);

const fetchByCity = async (name) => {
  if (!name) return;
  const trimmed = name.trim();
  if (!trimmed) return;

  try {
    setLoading(true);
    setErr(null);

    const { lat, lon } = await getGeoCoords(trimmed);
    const d = await getForecastByCity(`${lat},${lon}`, units);

    setData(d);
    lastRef.current = { type: "city", value: trimmed };
  } catch (e) {
    setErr(e);
  } finally {
    setLoading(false);
  }
};

const fetchByCoords = async (lat, lon) => {
  try {
    setLoading(true);
    setErr(null);

    const forecast = await getForecastByCoords(lat, lon, { units });

    setData(forecast);
    lastRef.current = { type: "coords", lat, lon };
  } catch (e) {
    setErr(e);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (!city) return;
    const timer = setTimeout(() => {
      fetchByCity(city);
    }, 300);
    return () => clearTimeout(timer);
  }, [city, units]);

  useEffect(() => {
    const src = lastRef.current;
    if (!src) return;
    if (src.type === "city") fetchByCity(src.value);
    else if (src.type === "coords") fetchByCoords(src.lat, src.lon);
  }, [units]);

  const onlyMyLocation = () => {
    if (!navigator.geolocation) {
      setErr(new Error("브라우저가 위치 정보를 지원하지 않습니다."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        fetchByCoords(
          pos.coords.latitude,
          pos.coords.longitude
        ),
      () => setErr(new Error("위치 권한을 허용해주세요.")),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetchByCity(city);
  };

  return (
    <div style={{ padding: 20 }}>
      <form onSubmit={onSubmit}>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="도시명을 입력하세요"
        />
        <button type="submit">검색</button>
        <button type="button" onClick={onlyMyLocation}>
          내 위치
        </button>
        <select
          value={units}
          onChange={(e) => setUnits(e.target.value)}
        >
          <option value="metric">°C</option>
          <option value="imperial">°F</option>
        </select>
      </form>

      {loading && <p aria-busy="true">불러오는 중...</p>}
      {err && (
        <p role="alert" style={{ color: "#d33" }}>
          오류: {err.message}
        </p>
      )}
      {!loading && !err && !data && (
        <p>도시를 검색하거나 내 위치를 눌러보세요.</p>
      )}
      {data && <WeatherCard data={data} />}
    </div>
  );
}
