const BASE = process.env.REACT_APP_OW_BASE || "https://api.openweathermap.org"
const KEY = process.env.REACT_APP_OW_KEY;

async function ow(path, params = {}, { signal } = {}){
    if (!KEY) throw new Error("환경변수 REACT_APP_OW_KEY가 없습니다.");
    const q = new URLSearchParams({...params, appid: KEY }).toString();
    const url = `${BASE}${path}?${q}`;
    const ac= new AbortController();
    const timeout = setTimeout(() => ac.abort(), 8000); // 8초 타임아웃
    
    try {
        const res = await fetch(url, { signal: signal ?? ac.signal });
        if (!res.ok) {
            let msg= `HTTP ${res.status}`;
            try {
                const j = await res.json();
                if (j?.message) msg += `: ${j.message}`;
            } catch {}
            throw new Error(msg);
        }
        return await res.json();
    } catch (e) {
        if (e.name === "Aborterror") throw new Error("요청이 시간 초과되었습니다.");
        throw e;
    } finally {
        clearTimeout(timeout);
    }
}

export function getByCity(city, {units = "metric", lang = "kr"} = {}, opts = {}) {
  return ow("/data/2.5/weather", { q: city, units, lang}, opts);
}

export function getByCoords(lat, lon, {units ="metric", lang ="KR"} = {}, opts = {}) {
  return ow("/data/2.5/weather", { lat, lon, units, lang}, opts);
}

export function iconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export function getForecastByCity(coords, units = "metric", lang = "kr") {
  const [lat, lon] = coords.split(",");
  return ow("/data/2.5/forecast", { lat, lon, units, lang });
}

export async function getGeoCoords(city) {
  const res = await ow("/geo/1.0/direct", { q: city, limit: 1 });
  if (Array.isArray(res) && res.length > 0) {
    return { lat: res[0].lat, lon: res[0].lon };
  }
  throw new Error("도시의 위경도를 찾을 수 없습니다.");
}

export function getForecastByCoords(lat, lon, { units = "metric", lang = "kr" } = {}, opts = {}) {
  return ow("/data/2.5/forecast", { lat, lon, units, lang }, opts);
}
