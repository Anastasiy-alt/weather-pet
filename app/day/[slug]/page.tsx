import OneDayWidget from "@/components/day/widget";

export default async function OneDayPage({
                                             params,
                                         }: {
    params: Promise<{ slug: string }>
}) {
    const {slug} = await params
    return <OneDayWidget slug={slug}/>
}