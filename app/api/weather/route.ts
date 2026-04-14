import {NextRequest, NextResponse} from "next/server";
import {fetchRequest} from "@/lib/fetchRequest";

const host = process.env.API_WEATHER;
const key = process.env.SECRET_API_KEY;
const metric = process.env.METRIC;
const lang = process.env.LANG;

if (!host || !key || !metric || !lang) {
    throw new Error("Отсутствуют переменные окружения");
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
        return NextResponse.json({error: "Не переданы координаты"}, {status: 400});
    }

    const res = await fetchRequest(`${host}${lat},${lon}${key}&${metric}&${lang}`);

    if (!res.ok) {
        return NextResponse.json({ error: "Ошибка запроса к API погоды" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
}