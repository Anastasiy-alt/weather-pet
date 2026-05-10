export interface CityResult {
    title: {
        text: string,
    },
    tags: string[],
    address: {
        formatted_address: string,
        component:
            {
                name: string,
                kind: string[]
            }[]
    }
}