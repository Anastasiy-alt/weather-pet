export async function fetchWeather(lat: number, lon: number) {
    const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
    if (!res.ok) throw new Error(`Ошибка погоды: ${res.status}`);

    return await res.json();
}