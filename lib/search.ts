export async function searchCities(query: string) {
    const res = await fetch(`/api/search?q=${query}`);
    if (!res.ok) throw new Error(`Ошибка поиска: ${res.status}`);

    return await res.json();
}
