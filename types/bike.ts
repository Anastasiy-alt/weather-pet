export interface  BikeAnalysis {
    weight: number
    values: BikeValue[]
}

export interface BikeValue {
    min?: number
    max?: number
    point: number
    state?: string
    description: string
}