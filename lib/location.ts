export async function fetchLocation(lat: number, lon: number) {
    const res = await fetch(`/api/location?lat=${lat}&lon=${lon}`);
    if (!res.ok) throw new Error(`Ошибка локации: ${res.status}`);

    return await res.json();
}