// const BIKE_CONDITIONS = {
//     temperature: {
//         ideal:      { min: 15, max: 25 },  // комфортно
//         acceptable: { min: 5,  max: 32 },  // можно ехать
//         bad:        { min: -5, max: 40 },  // тяжело но можно
//         // всё за пределами — не рекомендуется
//     },
//
//     feelsLike: {
//         ideal:      { min: 12, max: 26 },
//         acceptable: { min: 3,  max: 33 },
//         bad:        { min: -3, max: 38 },
//     },
//
//     wind: {
//         speed: {
//             ideal:      { max: 5  },  // попутный ветерок
//             acceptable: { max: 10 },  // заметно но терпимо
//             bad:        { max: 15 },  // тяжело крутить
//             dangerous:  { max: 999 }, // опасно
//         },
//         gust: {
//             acceptable: { max: 12 },
//             bad:        { max: 20 },
//             // выше — опасно
//         }
//     },
//
//     precipitation: {
//         prob: {
//             ideal:      { max: 10 },  // почти нет
//             acceptable: { max: 30 },  // мало вероятно
//             bad:        { max: 60 },  // возможен дождь
//             // выше — не ехать
//         },
//         amount: {
//             acceptable: { max: 1  },  // морось
//             bad:        { max: 5  },  // дождь
//             // выше — не ехать
//         },
//         types: {
//             dangerous: ['snow', 'ice', 'freezingrain', 'hail'],
//             bad:       ['rain'],
//             acceptable:['showers'],
//         }
//     },
//
//     visibility: {
//         ideal:      { min: 10 },   // км
//         acceptable: { min: 5  },
//         bad:        { min: 2  },
//         // ниже — опасно
//     },
//
//     humidity: {
//         ideal:      { max: 60 },   // %
//         acceptable: { max: 80 },
//         bad:        { max: 90 },
//     },
//
//     uvindex: {
//         acceptable: { max: 6  },   // крем обязателен выше
//         bad:        { max: 9  },   // очень высокий
//         dangerous:  { max: 11 },
//     },
//
//     daylight: {
//         // поездка должна быть в светлое время
//         // если выезд после заката или до рассвета — предупреждение
//     }
// } as const
//
//
// type BikeScore = 'ideal' | 'good' | 'acceptable' | 'bad' | 'dangerous'
//
// interface BikeAnalysis {
//     score: BikeScore
//     recommendation: string
//     warnings: string[]
//     tips: string[]
// }
//
// function analyzeBikeConditions(data: WeatherData): BikeAnalysis {
//     const warnings: string[] = []
//     const tips: string[] = []
//     let score: BikeScore = 'ideal'
//
//     // понижаем оценку если показатель плохой
//     function downgrade(to: BikeScore) {
//         const order: BikeScore[] = ['ideal', 'good', 'acceptable', 'bad', 'dangerous']
//         if (order.indexOf(to) > order.indexOf(score)) score = to
//     }
//
//     // температура
//     const temp = data.feelslike
//     if (temp < BIKE_CONDITIONS.feelsLike.bad.min || temp > BIKE_CONDITIONS.feelsLike.bad.max) {
//         downgrade('dangerous')
//         warnings.push(temp < 0 ? 'Слишком холодно — риск обморожения' : 'Слишком жарко — риск перегрева')
//     } else if (temp < BIKE_CONDITIONS.feelsLike.acceptable.min || temp > BIKE_CONDITIONS.feelsLike.acceptable.max) {
//         downgrade('bad')
//         warnings.push('Некомфортная температура для поездки')
//     } else if (temp < BIKE_CONDITIONS.feelsLike.ideal.min || temp > BIKE_CONDITIONS.feelsLike.ideal.max) {
//         downgrade('acceptable')
//         tips.push('Оденься по погоде')
//     }
//
//     // ветер
//     if (data.windgust > BIKE_CONDITIONS.wind.gust.bad.max) {
//         downgrade('dangerous')
//         warnings.push(`Сильные порывы ${data.windgust} м/с — опасно`)
//     } else if (data.windspeed > BIKE_CONDITIONS.wind.speed.bad.max) {
//         downgrade('bad')
//         warnings.push(`Сильный ветер ${data.windspeed} м/с — тяжело крутить`)
//     } else if (data.windspeed > BIKE_CONDITIONS.wind.speed.acceptable.max) {
//         downgrade('acceptable')
//         tips.push('Встречный ветер — запас больше времени')
//     }
//
//     // осадки
//     if (data.preciptype?.some(t => BIKE_CONDITIONS.precipitation.types.dangerous.includes(t))) {
//         downgrade('dangerous')
//         warnings.push('Гололёд или снег — ехать опасно')
//     } else if (data.precipprob > 60) {
//         downgrade('bad')
//         warnings.push('Высокая вероятность дождя')
//     } else if (data.precipprob > 30) {
//         downgrade('acceptable')
//         tips.push('Возможен дождь — возьми дождевик')
//     }
//
//     // видимость
//     if (data.visibility < BIKE_CONDITIONS.visibility.bad.min) {
//         downgrade('dangerous')
//         warnings.push('Плохая видимость — опасно на дороге')
//     } else if (data.visibility < BIKE_CONDITIONS.visibility.acceptable.min) {
//         downgrade('bad')
//         warnings.push('Ограниченная видимость')
//     }
//
//     // УФ
//     if (data.uvindex > BIKE_CONDITIONS.uvindex.bad.max) {
//         downgrade('bad')
//         tips.push('Высокий УФ — нанеси SPF 50 и возьми воды больше')
//     } else if (data.uvindex > BIKE_CONDITIONS.uvindex.acceptable.max) {
//         tips.push('Не забудь крем от солнца')
//     }
//
//     const recommendations: Record<BikeScore, string> = {
//         ideal:      'Отличные условия — самое время крутить педали! 🚴',
//         good:       'Хорошие условия для поездки',
//         acceptable: 'Ехать можно, но учти предупреждения',
//         bad:        'Не лучший день для велопрогулки',
//         dangerous:  'Сегодня лучше оставить велосипед дома',
//     }
//
//     return {
//         score,
//         recommendation: recommendations[score],
//         warnings,
//         tips,
//     }
// }