export async function fetchRequest(url: string, opts?: RequestInit) {
    try {
        const res = await fetch(url, opts);
        console.log(res)
        return res;
    } catch (err) {
        throw err;
    }
}
