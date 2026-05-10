type AddressComponent = {
    kind: string;
    name: string;
};
const host = process.env.API_GEO;
const key = process.env.SECRET_API_KEY_MAPS;

export async function fetchLocation(lat: number, lon: number) {

    const response = await fetch(
        `${host}/?apikey=${key}&geocode=${lon},${lat}&format=json`
    );

    const data = await response.json();

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


    if (!response.ok) throw new Error(`Ошибка локации: ${response.status}`);
    return {
        city: cityComponent?.name || '',
        lon: Number(point[0]),
        lat: Number(point[1]),
    };
}
