export function tempHue(t: number): string {
    if (t <= -10) return 'var(--dark-blue)'
    if (t <= 0) return 'var(--blue)'
    if (t <= 10) return 'var(--light-blue)'
    if (t <= 18) return 'var(--green)'
    if (t <= 25) return 'var(--yellow)'
    if (t <= 32) return 'var(--orange)'
    return 'var(--red)'
}

export const WIND_DIRS = ['С', 'ССВ', 'СВ', 'ВСВ', 'В', 'ВЮВ', 'ЮВ', 'ЮЮВ', 'Ю', 'ЮЮЗ', 'ЮЗ', 'ЗЮЗ', 'З', 'ЗСЗ', 'СЗ', 'ССЗ']

export function getWindDirection(deg: number): string {
    return WIND_DIRS[Math.round(deg / 22.5) % 16]
}

export function convertWindSpeed(speed: number): number {
    return Math.round(speed * (1000 / 3600))
}
