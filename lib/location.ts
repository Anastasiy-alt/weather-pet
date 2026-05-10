type AddressComponent = {
    kind: string;
    name: string;
};


export async function fetchLocation(lat?: number, lon?: number, address?: string) {
    const host = process.env.NEXT_PUBLIC_API_GEO;
    const key = process.env.NEXT_PUBLIC_API_KEY_MAPS;

    const response = await fetch(
        `${host}/?apikey=${key}&geocode=${(lat && lon) ? (lon + ',' + lat) : address}&format=json`
    );

    const data = await response.json();
console.log(data, lat, lon, address);
    const geoObject =
        data.response.GeoObjectCollection.featureMember[0]
            ?.GeoObject;

    if (!geoObject) {
        return null;
    }

    const components: AddressComponent[] =
        geoObject.metaDataProperty
            .GeocoderMetaData
            .Address
            .Components;

    const cityComponent = components.find(
        (component) => component.kind === 'locality'
    );
    const point = geoObject.Point.pos.split(' ');

console.log(point)
    if (!response.ok) throw new Error(`Ошибка локации: ${response.status}`);
    return {
        city: cityComponent?.name || '',
        lon: Number(point[0]),
        lat: Number(point[1]),
    };
}
