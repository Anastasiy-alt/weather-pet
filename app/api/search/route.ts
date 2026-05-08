import {NextRequest, NextResponse} from "next/server";
import {fetchRequest} from "@/lib/fetchRequest";

const host = process.env.API_GEO;
const key = process.env.SECRET_API_KEY_GEO;
const lang = process.env.LANG;

if (!host || !key || !lang) {
    throw new Error("Отсутствуют переменные окружения");
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get("q");
    if (!query) {
        return NextResponse.json({error: "Не переданы данные для поиска"}, {status: 400});
    }
    const res = await fetchRequest(`${host}/autocomplete?text=${query}&apiKey=${key}&type=city&limit=7&lang=${lang}&format=json`);

    if (!res.ok) {
        return NextResponse.json({error: "Ошибка запроса к API поиску"}, {status: res.status});
    }
    const data = await res.json();
    return NextResponse.json(data);
}