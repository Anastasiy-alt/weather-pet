

export async function searchCities(query: string) {
    // const res = await fetch(`/api/search?q=${query}`);
    const host = process.env.NEXT_PUBLIC_API_GEO;
    const key = process.env.NEXT_PUBLIC_API_KEY_MAPS;
    const res = await fetch(
        `https://suggest-maps.yandex.ru/v1/suggest?apikey=${key}&text=${query}&types=locality&print_address=1`
    );
    if (!res.ok) throw new Error(`Ошибка поиска: ${res.status}`);
    const data = await res.json();
    console.log(data.results);

    return data;
}
