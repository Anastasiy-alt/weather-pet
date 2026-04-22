export interface Weather {
    address: string
    alerts: Alert[]
    currentConditions: Current
    days: Day[]
    description: string
    latitude: number
    longitude: number
    queryCost: number
    resolvedAddress: string
    timezone: string
}

export interface Alert {
    description: string
    ends: string
    onset: string
    event: string
    headline: string
    language: string
    id: string
}

export interface Current {
    datetime: string
    temp: number
    feelslike: number
    humidity: number
    dew: number
    precipprob: number
    snow: number
    snowdepth: number
    preciptype: string[]
    windgust: number
    windspeed: number
    winddir: number
    pressure: number
    visibility: number
    cloudcover: number
    solarradiation: number
    solarenergy: number
    uvindex: number
    conditions: string
    icon: string
    sunrise: string
    sunriseEpoch: number
    sunset: string
    sunsetEpoch: number
    moonphase: number
}

export interface Day {
    cloudcover: number
    conditions: string
    datetime:string
    description: string
    dew: number
    feelslike: number
    feelslikemax: number
    feelslikemin: number
    humidity: number
    icon: string
    moonphase: number
    precip: number
    precipcover: number
    precipprob: number
    preciptype: string[]
    pressure: number
    severerisk: number
    snow: number
    snowdepth: number
    solarenergy: number
    solarradiation: number
    sunrise: string
    sunset: string
    temp: number
    tempmax: number
    tempmin: number
    uvindex: number
    visibility: number
    winddir: number
    windgust: number
    windspeed: number
    hours: Hour[]
}

export interface Hour {
    cloudcover: number
    conditions: string
    datetime: string
    dew: number
    feelslike: number
    humidity: number
    icon: string
    precip: number
    precipprob: number
    preciptype: string[]
    pressure : number
    severerisk: number
    snow: number
    snowdepth: number
    solarenergy: number
    solarradiation: number
    temp: number
    uvindex: number
    visibility: number
    winddir: number
    windgust: number
    windspeed: number
}