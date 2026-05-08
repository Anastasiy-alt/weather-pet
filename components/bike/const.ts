const BIKE_CONDITIONS = {
    temperature: {
        ideal:      { min: 15, max: 25 },  // комфортно
        acceptable: { min: 5,  max: 32 },  // можно ехать
        bad:        { min: -5, max: 40 },  // тяжело но можно
        // всё за пределами — не рекомендуется
    },

    feelsLike: {
        ideal:      { min: 12, max: 26 },
        acceptable: { min: 3,  max: 33 },
        bad:        { min: -3, max: 38 },
    },

    wind: {
        speed: {
            ideal:      { max: 5  },  // попутный ветерок
            acceptable: { max: 10 },  // заметно но терпимо
            bad:        { max: 15 },  // тяжело крутить
            dangerous:  { max: 999 }, // опасно
        },
        gust: {
            acceptable: { max: 12 },
            bad:        { max: 20 },
            // выше — опасно
        }
    },

    precipitation: {
        prob: {
            ideal:      { max: 10 },  // почти нет
            acceptable: { max: 30 },  // мало вероятно
            bad:        { max: 60 },  // возможен дождь
            // выше — не ехать
        },
        amount: {
            acceptable: { max: 1  },  // морось
            bad:        { max: 5  },  // дождь
            // выше — не ехать
        },
        types: {
            dangerous: ['snow', 'ice', 'freezingrain', 'hail'],
            bad:       ['rain'],
            acceptable:['showers'],
        }
    },

    visibility: {
        ideal:      { min: 10 },   // км
        acceptable: { min: 5  },
        bad:        { min: 2  },
        // ниже — опасно
    },

    humidity: {
        ideal:      { max: 60 },   // %
        acceptable: { max: 80 },
        bad:        { max: 90 },
    },

    uvindex: {
        acceptable: { max: 6  },   // крем обязателен выше
        bad:        { max: 9  },   // очень высокий
        dangerous:  { max: 11 },
    },

    daylight: {
        // поездка должна быть в светлое время
        // если выезд после заката или до рассвета — предупреждение
    }
} as const