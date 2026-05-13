import {BikeAnalysis, BikeValue, Hour} from "@/types";

interface Bike {
    temperature: BikeAnalysis
    feelsLike: BikeAnalysis
    windSpeed: BikeAnalysis
    windGust: BikeAnalysis
    precipProb: BikeAnalysis
    visibility: BikeAnalysis
    humidity: BikeAnalysis
    uvIndex: BikeAnalysis
    cloudy: BikeAnalysis
    daylight: BikeAnalysis
}

type DaylightState =
    'night-before' | 'pre-dawn' | 'sunrise' | 'morning' |
    'midday' | 'afternoon' | 'sunset' | 'dusk' | 'night'

export type BikeAnalyzeResult = ReturnType<BikeAnalyze['init']>;

export interface Result {
    title: string
    id: string
    description: string
    key: number | string
    weight: number
    point: number
    keyProp: string
}

export const CLOTHING_ADVICE: { max: number, advice: string }[] = [
    {
        max: -10,
        advice: 'Доставай всё тёплое что есть — термобельё, флис, утеплённая куртка, балаклава, зимние перчатки. Это не велопрогулка, это экспедиция'
    },
    {
        max: -5,
        advice: 'Термобельё, утеплённая куртка, зимние перчатки и шапка под шлем — уши потом скажут спасибо, поверь'
    },
    {
        max: 0,
        advice: 'Термобельё, флисовая кофта, ветровка сверху и перчатки — без перчаток руки сдадутся раньше тебя'
    },
    {
        max: 5,
        advice: 'Термобельё, тёплая кофта и ветровка — выглядишь как капуста, но зато едешь, а не страдаешь'
    },
    {
        max: 10,
        advice: 'Лонгслив, джерси с флисом и лёгкие перчатки — руки мёрзнут первыми, не давай им повода. Утеплить уши тоже не помешает'
    },
    {
        max: 15,
        advice: 'Лонгслив и тонкая кофта, снизу — лёгкие штаны. Не геройствуй с шортами, ещё не время'
    },
    {
        max: 20,
        advice: 'Лёгкий джерси и шорты, ветровка на старте — через пару километров снимешь и не вспомнишь'
    },
    {
        max: 25,
        advice: 'Футболка или лёгкий джерси, больше ничего — любые лишние слои будешь проклинать уже на первом подъёме'
    },
    {
        max: 100,
        advice: 'Чем меньше, тем лучше — максимально лёгкое и светлое. В тёмном сваришься быстрее чем доедешь'
    },
] as const

export const BIKE_CONDITIONS: Bike = {
    temperature: {
        weight: 3,
        values: [
            {
                min: 18, max: 22, point: 5,
                description: 'Идеальная температура для езды — не жарко, не холодно. Грех не выкатиться'
            },
            {
                min: 15, max: 25, point: 4,
                description: 'Хорошая погода для поездки — тело не жалуется, голова не перегревается'
            },
            {
                min: 7, max: 30, point: 3,
                description: 'Температура не идеальная, но вполне рабочая — оденься по погоде и всё будет нормально'
            },
            {
                min: -5, max: 40, point: 2,
                description: 'Условия непростые, но велосипедисты и в таком ездят — просто подготовься как следует'
            },
            {
                min: -100, max: 100, point: 1,
                description: 'Температура за пределами комфортного диапазона — поездка потребует серьёзной подготовки'
            }
        ],
    },

    feelsLike: {
        weight: 4,
        values: [
            {
                min: 15, max: 23, point: 5,
                description: 'Погода говорит «поехали» — и в кои-то веки она права. Слушай погоду'
            },
            {
                min: 10, max: 26, point: 4,
                description: 'Ощущается чуть прохладнее или теплее чем хотелось бы, но совсем немного — организм адаптируется быстро'
            },
            {
                min: 3, max: 33, point: 3,
                description: 'Не самые приятные ощущения, но и не катастрофа — просто оденься правильно'
            },
            {
                min: -3, max: 38, point: 2,
                description: 'Тело уже серьёзно сомневается, но голова у тебя своя — она и решает'
            },
            {
                min: -100, max: 100, point: 1,
                description: 'Ощущается как откровенно плохая идея. Не потому что мы так говорим, а потому что это правда'
            },
        ]
    },

    windSpeed: {
        weight: 4,
        values: [
            {
                max: 3, point: 5,
                description: 'Полный штиль — флаги висят неподвижно, ты летишь вперёд и ничто тебе не мешает'
            },
            {
                max: 5, point: 4,
                description: 'Лёгкий приятный бриз, который освежает в подъём и не мешает на прямой'
            },
            {
                max: 8, point: 3,
                description: 'Ветер уже заметный — в одну сторону чувствуешь себя героем, в другую молча страдаешь'
            },
            {
                max: 15, point: 2,
                description: 'Ветер явно против тебя хотя бы на половине маршрута — закладывай время с запасом'
            },
            {
                max: 1000, point: 1,
                description: 'Велосипед — это ты, ты — это парус, маршрут определяет ветер. Удачи, смелый человек'
            },
        ]
    },

    windGust: {
        weight: 2,
        values: [
            {
                max: 5, point: 5,
                description: 'Порывов почти нет — едешь ровно, руль слушается, жизнь прекрасна'
            },
            {
                max: 7, point: 4,
                description: 'Редкие лёгкие порывы — скорее приятное разнообразие, чем реальная помеха'
            },
            {
                max: 15, point: 3,
                description: 'Порывы заметные и неожиданные — держи руль покрепче, особенно на мостах и открытых участках'
            },
            {
                max: 20, point: 2,
                description: 'Тебя будет периодически сносить в сторону, и это не метафора — буквально сносить'
            },
            {
                max: 1000, point: 1,
                description: 'При таких порывах даже стоять сложно, не то что ехать. Велосипед оценит выходной'
            },
        ]
    },

    precipProb: {
        weight: 4,
        values: [
            {
                max: 10, point: 5,
                description: 'Дождя не будет — это почти клятва, можно смело оставлять дождевик дома'
            },
            {
                max: 20, point: 4,
                description: 'Вероятность намокнуть низкая, но ненулевая — решай сам, насколько ты азартный человек'
            },
            {
                max: 30, point: 3,
                description: 'Может капнуть, а может и нет — классическая погодная лотерея, бери дождевик на всякий'
            },
            {
                max: 60, point: 2,
                description: 'Скорее всего промокнешь, вопрос только насколько сильно и как далеко ты к тому моменту заедешь'
            },
            {
                max: 100, point: 1,
                description: 'Вопрос не будет ли дождь, а когда именно и насколько сильный. Ответ: скоро и очень'
            },
        ]
    },

    humidity: {
        weight: 1,
        values: [
            {
                max: 60, point: 5,
                description: 'Воздух такой, каким и должен быть — незаметный, лёгкий и совершенно не мешающий ехать'
            },
            {
                max: 70, point: 4,
                description: 'Немного влажновато, но вполне терпимо — почти не заметишь, если не знать'
            },
            {
                max: 80, point: 3,
                description: 'Липковато и душновато — пот никуда не испаряется, просто остаётся на тебе'
            },
            {
                max: 90, point: 2,
                description: 'Воздух как мокрое полотенце — дышать технически можно, но приятного мало'
            },
            {
                max: 100, point: 1,
                description: 'Ты едешь сквозь облако изнутри. Влажность такая, что непонятно где заканчиваешься ты и начинается воздух'
            },
        ]
    },

    uvIndex: {
        weight: 0,
        values: [
            {
                max: 2, point: 5,
                description: 'УФ минимальный — можно вообще не думать о солнцезащите и просто наслаждаться поездкой'
            },
            {
                max: 5, point: 4,
                description: 'Умеренное солнце, крем не обязателен, но на длинной поездке лишним точно не будет'
            },
            {
                max: 7, point: 3,
                description: 'Солнце активное — если едешь больше часа, крем реально нужен, иначе вернёшься розовым'
            },
            {
                max: 9, point: 2,
                description: 'Сгоришь быстрее, чем доедешь до цели — крем, кепка, тень на остановках, это не шутка'
            },
            {
                max: 11, point: 1,
                description: 'Солнце сегодня агрессивно и совершенно не стесняется. Лучше выезжай рано утром или жди вечера'
            },
        ]
    },
    visibility: {
        weight: 0,
        values: [
            {
                max: 100, point: 5,
                description: 'Видимость отличная — горизонт далеко, дорога читается, всё под контролем'
            },
            {
                max: 10, point: 4,
                description: 'Видимость хорошая, едешь спокойно и всё успеваешь заметить вовремя'
            },
            {
                max: 5, point: 3,
                description: 'Немного мутновато — туман или дымка, но ямы и машины разглядеть ещё успеваешь'
            },
            {
                max: 2, point: 2,
                description: 'Видимость плохая, фонарь и мигалка обязательны — ты должен видеть и тебя должны видеть'
            },
            {
                max: 1, point: 1,
                description: 'Ты невидим, все вокруг невидимы, мир исчез в тумане. Это уже не прогулка, это приключение со знаком минус'
            },
        ]
    },
    cloudy: {
        weight: 0,
        values: [
            {
                max: 10, point: 5,
                description: 'Ни облачка — небо чистое, солнце полностью твоё, со всеми вытекающими'
            },
            {
                max: 30, point: 4,
                description: 'Облачка есть, но они скорее декоративные — светло, комфортно, в меру'
            },
            {
                max: 60, point: 3,
                description: 'Переменная облачность: иногда припекает, иногда отпускает'
            },
            {
                max: 85, point: 2,
                description: 'Облаков много, настроение среднее — но ехать вполне можно'
            },
            {
                max: 100, point: 1,
                description: 'Сплошная облачность, солнце официально выходной взяло — едешь в серых тонах'
            },
        ]
    },
    daylight: {
        weight: 0,
        values: [
            {
                state: 'night-before',
                point: 2,
                // больше 60 минут до восхода
                description: 'Темно и до рассвета ещё далеко — фонарь обязателен, это не обсуждается'
            },
            {
                state: 'pre-dawn',
                point: 3,
                // 0–60 минут до восхода
                description: 'Скоро рассветёт, но пока темно — фонарь с собой, не надейся на удачу'
            },
            {
                state: 'sunrise',
                point: 4,
                // ±60 минут от восхода
                description: 'Рассвет красивый, но низкое солнце слепит конкретно — особенно если едешь на восток'
            },
            {
                state: 'morning',
                point: 5,
                // 1–3 часа после восхода
                description: 'Утро, солнце ещё не разошлось — отличное время выехать пока прохладно и свежо'
            },
            {
                state: 'midday',
                point: 3,
                // середина светового дня
                description: 'Полдень: солнце в зените, тени минимум, перегрев реален — будь аккуратнее'
            },
            {
                state: 'afternoon',
                point: 4,
                // за 2–3 часа до заката
                description: 'День клонится к вечеру — жара спадает, самое приятное время для поездки'
            },
            {
                state: 'sunset',
                point: 3,
                // ±60 минут от заката
                description: 'Закат на велосипеде — это уже не просто поездка, это почти поэзия'
            },
            {
                state: 'dusk',
                point: 2,
                // 0–60 минут после заката
                description: 'Быстро темнеет — фонарь лучше включить уже сейчас, не после'
            },
            {
                state: 'night',
                point: 1,
                // больше 60 минут после заката
                description: 'Тёмное время суток, без фонаря выезжать не стоит — ты просто невидимка на колёсах'
            },
        ]
    },
} as const

export const RESULT_CONDITIONS = [
    {
        max: 9,
        title: 'Сиди дома',
        description: 'Велосипед смотрит на тебя из угла и молча просит не надо'
    },
    {
        max: 19,
        title: 'Плохо',
        description: 'Технически выехать можно, но ты же потом сам себя осудишь'
    },
    {
        max: 29,
        title: 'Не очень',
        description: 'Поездка состоится, просто хорошей её назовёт только очень оптимистичный человек'
    },
    {
        max: 39,
        title: 'Так себе',
        description: 'Погода не запрещает, но и особо не приглашает — решай на свой страх и риск'
    },
    {
        max: 49,
        title: 'Сойдёт',
        description: 'Условия так себе, зато будет повод почувствовать себя настоящим героем'
    },
    {
        max: 59,
        title: 'Нормально',
        description: 'Ничего выдающегося, но и жаловаться особо не на что — просто поедешь и приедешь'
    },
    {
        max: 69,
        title: 'Неплохо',
        description: 'Не самый блестящий день, но велосипедисты и не в такие ездили'
    },
    {
        max: 79,
        title: 'Хорошо',
        description: 'Приятная поездка почти гарантирована — почти, потому что это всё-таки погода'
    },
    {
        max: 89,
        title: 'Отлично',
        description: 'Почти идеально, и этого более чем достаточно чтобы получить удовольствие'
    },
    {
        max: 100,
        title: 'Идеально',
        description: 'Бросай всё, седлай велосипед — такие дни случаются реже чем хочется'
    },
]

export class BikeAnalyze {
    weather: Hour | null;
    resultPercent: number;
    windSpeed: number;
    winGust: number;
    resultArray: Result[];
    sunset: number;
    sunrise: number;
    timeZone: string;
    resultConditions: {
        title: string;
        description: string;
    }

    constructor() {
        this.weather = null
        this.resultPercent = 0
        this.resultArray = []
        this.resultConditions = {
            title: '',
            description: '',
        }
        this.windSpeed = 0
        this.winGust = 0
        this.sunrise = 0
        this.sunset = 0
        this.timeZone = ''
    }

    _getDaylightState(currentTime: Date, sunrise: Date, sunset: Date): DaylightState {
        const now = currentTime.getTime()
        const sunriseMs = sunrise.getTime()
        const sunsetMs = sunset.getTime()
        const dayLength = sunsetMs - sunriseMs

        const minutesFromSunrise = (now - sunriseMs) / 60000
        const minutesFromSunset = (now - sunsetMs) / 60000

        if (minutesFromSunrise < -60) return 'night-before'
        if (minutesFromSunrise < 0) return 'pre-dawn'
        if (minutesFromSunrise < 60) return 'sunrise'
        if (minutesFromSunset > 60) return 'night'
        if (minutesFromSunset > 0) return 'dusk'
        if (minutesFromSunset > -60) return 'sunset'

        const midpoint = sunriseMs + dayLength / 2
        const thirdOfDay = dayLength / 3

        if (now < midpoint - thirdOfDay / 2) return 'morning'
        if (now < midpoint + thirdOfDay / 2) return 'midday'
        return 'afternoon'
    }

    _handleAnalise(data: BikeAnalysis, key?: number): {
        point: number,
        description: string,
        key: number,
        weight: number
    } {
        let res: { point: number, description: string, key: number, weight: number } = {
            point: 0,
            description: '',
            key: 0,
            weight: 0
        }
        if (!key) key = 0
        data.values.sort((a, b) => a.point - b.point).forEach((i: BikeValue) => {
            if (i.min && i.max) {
                if (i.min <= key && i.max >= key) {
                    res = {
                        point: i.point,
                        description: i.description,
                        key: key,
                        weight: data.weight
                    }
                }
            } else if (i.max) {
                if (i.max >= key) {
                    res = {
                        point: i.point,
                        description: i.description,
                        key: key,
                        weight: data.weight
                    }
                }
            } else if (i.state) {
                res = {
                    point: i.point,
                    description: i.description,
                    key: key,
                    weight: data.weight
                }
            }
        })
        return res
    }

    _setWindParams() {
        if (typeof this.weather?.windspeed === 'number') {
            this.windSpeed = Math.round(this.weather?.windspeed * (1000 / 3600))
            if (typeof this.weather?.windgust === 'number') {
                this.winGust = Math.round(this.weather?.windgust * (1000 / 3600))
            } else {
                this.winGust = this.windSpeed
            }
        }
    }

    _setSunDay(): Result {
        const now = new Date()
        const nowTime = new Date(now.toLocaleString('en-US', {timeZone: this.timeZone}))
        const state = this._getDaylightState(
            nowTime,
            new Date(this.sunrise * 1000),
            new Date(this.sunset * 1000)
        )
        const daylightInfo: {
            state?: string,
            point: number,
            description: string,
        } = BIKE_CONDITIONS.daylight.values.find(v => v.state === state) ?? BIKE_CONDITIONS.daylight.values[0]
        return {
            id: 'daylight',
            title: 'время',
            keyProp: '',
            key: new Intl.DateTimeFormat('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
            }).format(nowTime),
            weight: BIKE_CONDITIONS.daylight.weight,
            ...daylightInfo,
        }
    }

    _setFeelsAdvice(): Result {
        const res = {
            id: 'feelsLike',
            title: 'ощущается',
            keyProp: '°',
            ...this._handleAnalise(BIKE_CONDITIONS.feelsLike, this.weather?.feelslike),
        }
        CLOTHING_ADVICE.sort((a: {
            max: number
            advice: string
        }, b: {
            max: number
            advice: string
        }): number => b.max - a.max).forEach((adv: {
            max: number
            advice: string
        }) => {
            if (adv.max >= res.key) {
                res.description = adv.advice
            }
        });

        return res
    }

    _resultCounter() {
        let sum = 0
        let sumWeight = 0
        this.resultArray.forEach((i) => {
            if (i.weight) {
                if (i.point) sum = sum + (i.point * i.weight)
                sumWeight = sumWeight + i.weight
            }
        })
        this.resultPercent = Math.round((((sum / sumWeight) - 1) / 4) * 100)
        this.resultConditions = RESULT_CONDITIONS.find(i => this.resultPercent <= i.max) ?? RESULT_CONDITIONS[RESULT_CONDITIONS.length - 1]
    }

    _dayAnalise() {
        this._setWindParams();
        this.resultArray.push({
            id: 'temperature',
            title: 'температура',
            keyProp: '°',
            ...this._handleAnalise(BIKE_CONDITIONS.temperature, this.weather?.temp),
        })
        this.resultArray.push(this._setFeelsAdvice())
        this.resultArray.push({
            id: 'windSpeed',
            title: 'ветер',
            keyProp: ' м/с',
            ...this._handleAnalise(BIKE_CONDITIONS.windSpeed, this.windSpeed),
        })
        this.resultArray.push({
            id: 'windGust',
            title: 'порывы',
            keyProp: ' м/с',
            ...this._handleAnalise(BIKE_CONDITIONS.windGust, this.winGust),
        })
        this.resultArray.push({
            id: 'precipProb',
            title: 'осадки',
            keyProp: '%',
            ...this._handleAnalise(BIKE_CONDITIONS.precipProb, this.weather?.precipprob),
        })

        this.resultArray.push({
            id: 'humidity',
            title: 'влажность',
            keyProp: '%',
            ...this._handleAnalise(BIKE_CONDITIONS.humidity, this.weather?.humidity),
        })
        this.resultArray.push({
            id: 'visibility',
            title: 'видимость',
            keyProp: ' км',
            ...this._handleAnalise(BIKE_CONDITIONS.visibility, this.weather?.visibility),
        })
        this.resultArray.push({
            id: 'uvIndex',
            title: 'УФ-индекс',
            keyProp: '',
            ...this._handleAnalise(BIKE_CONDITIONS.uvIndex, this.weather?.uvindex),
        })
        this.resultArray.push({
            id: 'cloudy',
            title: 'облачность',
            keyProp: '%',
            ...this._handleAnalise(BIKE_CONDITIONS.cloudy, this.weather?.cloudcover),
        })
        if (this.sunrise && this.sunset) {
            this.resultArray.push(this._setSunDay())
        }
        console.log(this.resultArray)
    }

    init(weather: Hour, sunrise: number, sunset: number, timezone: string) {
        this.weather = weather
        this.sunrise = sunrise
        this.sunset = sunset
        this.timeZone = timezone
        this._dayAnalise()
        this._resultCounter()
        return {
            percent: this.resultPercent,
            conditions: this.resultConditions,
            array: this.resultArray,
        }
    }
}