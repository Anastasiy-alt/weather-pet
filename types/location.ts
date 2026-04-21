export interface Location {
    city: string
    continent: string
    continentCode: string
    countryCode: string
    countryName: string
    latitude: number
    locality: string
    localityLanguageRequested: string
    longitude: number
    plusCode: string
    principalSubdivision: string
    principalSubdivisionCode: string
    localityInfo: {
        administrative: Administrative[]
        informative: Informative[]
    }
}

export interface Administrative {
    adminLevel: number
    description: string
    geonameId?: number
    isoCode?: string
    isoName?: string
    name: string
    order: number
    wikidataId: string
}

export interface Informative {
    description?: string
    geonameId?: number
    isoCode?: string
    isoName?: string
    name: string
    order: number
    wikidataId?: string
}