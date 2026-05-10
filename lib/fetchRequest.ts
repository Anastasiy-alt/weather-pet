export async function fetchRequest(url: string, opts?: RequestInit) {
    try {
        return await fetch(url, opts);
    } catch (err) {
        throw err;
    }
}
