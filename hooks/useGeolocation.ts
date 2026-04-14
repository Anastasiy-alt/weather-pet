import { useState, useEffect } from "react";

const FALLBACK_CITIES = [
    { lat: 56.946, lon: 24.105, name: "Рига" },
    { lat: 55.7558, lon: 37.6173, name: "Москва" },
    { lat: 59.9343, lon: 30.3351, name: "Санкт-Петербург" },
    { lat: 48.8566, lon: 2.3522, name: "Париж" },
    { lat: 51.5074, lon: -0.1278, name: "Лондон" },
    { lat: 40.7128, lon: -74.0060, name: "Нью-Йорк" },
    { lat: 34.0522, lon: -118.2437, name: "Лос-Анджелес" },
    { lat: 35.6895, lon: 139.6917, name: "Токио" },
    { lat: 52.5200, lon: 13.4050, name: "Берлин" },
    { lat: 41.9028, lon: 12.4964, name: "Рим" },
    { lat: 55.9533, lon: -3.1883, name: "Эдинбург" },
    { lat: 37.7749, lon: -122.4194, name: "Сан-Франциско" },
    { lat: 45.4654, lon: 9.1859, name: "Милан" },
    { lat: 39.9042, lon: 116.4074, name: "Пекин" },
    { lat: 50.0755, lon: 14.4378, name: "Прага" },

];

type Coords = { lat: number; lon: number };

export function useGeolocation() {
    const [coords, setCoords] = useState<Coords | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]   = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            useFallback();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
                setLoading(false);
            },
            (_err) => {
                useFallback();
            }
        );
    }, []);

    function useFallback() {
        const city = FALLBACK_CITIES[Math.floor(Math.random() * FALLBACK_CITIES.length)];
        setCoords({ lat: city.lat, lon: city.lon });
        setLoading(false);
        setError("Геолокация недоступна, показываем случайный город");
    }

    return { coords, loading, error };
}