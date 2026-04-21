import {NextRequest, NextResponse} from "next/server";
import {fetchRequest} from "@/lib/fetchRequest";

const host = process.env.API_LOCATION;
const key = process.env.SECRET_API_KEY_LOCATION;
const lang = process.env.LANG_LOCATION;

if (!host || !key || !lang) {
    throw new Error("Отсутствуют переменные окружения");
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
        return NextResponse.json({error: "Не переданы координаты"}, {status: 400});
    }
console.log(`${host}?latitude=${lat}&longitude=${lon}&key=${key}&localityLanguage=${lang}`)
    const res = await fetchRequest(`${host}?latitude=${lat}&longitude=${lon}&key=${key}&localityLanguage=${lang}`);

    if (!res.ok) {
        return NextResponse.json({ error: "Ошибка запроса к API локации" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
}