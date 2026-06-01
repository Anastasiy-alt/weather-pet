# WeatherPet

Погодный pet-проект на Next.js. Показывает текущую погоду по геолокации, почасовой прогноз, детальную статистику и оценивает условия для велопрогулки.

Ссылка на проект - https://weather-pet-theta.vercel.app/

Ссылка на кейс -https://roadmap.sh/projects/weather-app

## Стек

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **SASS Modules** — стилизация, переменные и миксины глобально инжектируются в каждый модуль
- **Zustand** — глобальное состояние (погода, геолокация, поиск)
- **Recharts** — графики почасового прогноза
- **Yandex Maps v3** — интерактивная карта на главной странице
- **Serwist** — PWA с service worker и офлайн-страницей

## Функциональность

### Страницы

| Путь | Описание |
|------|----------|
| `/` | Главная — текущая погода со всей статистикой и картой |
| `/day/[slug]` | Детальный прогноз на конкретный день |
| `/search` | Поиск погоды по городу с историей запросов |
| `/bike` | Анализ погоды для велопрогулки |
| `/offline` | Офлайн-страница (PWA) |

### Погодные виджеты

- Текущая температура, ощущаемая температура, состояние неба
- Дуга восхода/заката с текущим положением солнца
- Ветер: скорость, порывы, направление
- Осадки: вероятность, количество, снег
- UV-индекс, облачность, видимость, фаза луны, влажность, диапазон температур
- Почасовой прогноз (график)
- Предупреждения о погодных явлениях

### Велосипедный анализатор (`/bike`)

Взвешенная оценка погодных условий в процентах (0–100%). Учитывает:
- Температуру и ощущаемую температуру (вес ×4)
- Скорость и порывы ветра (вес ×4)
- Вероятность осадков (вес ×4)
- Влажность, УФ-индекс, видимость, облачность, время суток

По каждому параметру выводится описание и рекомендация по одежде.

## Архитектура

```
app/
├── page.tsx                  # Главная → WeatherWidget
├── layout.tsx                # Root layout: шрифт, header, footer, WeatherInit
├── day/[slug]/page.tsx       # Детальная страница дня
├── search/page.tsx           # Поиск по городу
├── bike/page.tsx             # Велоанализатор
├── offline/page.tsx          # PWA offline fallback
├── api/weather/route.ts      # API route → прокси к внешнему weather API
├── sw.ts                     # Service worker (Serwist)
└── manifest.ts               # PWA manifest

components/
├── weather/
│   ├── widget.tsx            # Главный оркестратор: собирает все виджеты
│   ├── main.tsx              # Карточка с текущей погодой
│   ├── init.tsx              # Инициализация геолокации + загрузка данных
│   ├── icon.tsx              # Иконки погоды (lookup table)
│   ├── map.tsx               # Yandex Maps
│   └── alert.tsx             # Погодные предупреждения
├── stats/
│   ├── sun-arc.tsx           # Дуга восхода/заката
│   ├── wind.tsx              # Ветер
│   ├── precip.tsx            # Осадки
│   ├── hoursWeather.tsx      # Почасовой прогноз (Recharts)
│   ├── chart.tsx             # Базовый компонент графика
│   └── small/                # Малые карточки: UV, луна, влажность и т.д.
├── day/                      # Компоненты детального прогноза на день
├── bike/
│   ├── widget.tsx            # Велоанализатор
│   ├── main.tsx              # Общая оценка
│   ├── card.tsx              # Карточка параметра
│   └── const.ts              # Данные оценки: пороги, описания, BIKE_CONDITIONS
├── header/                   # Шапка с бургером
├── footer/                   # Подвал
└── ui/                       # Button, Loader, Modal, Search, Accordion, Toggle и др.

store/
├── weather.ts                # Zustand: данные погоды + геолокации, load(), refresh()
├── geolocation.ts            # Zustand: браузерная геолокация + fallback на случайный город
├── search.ts                 # История поиска
├── day.ts                    # Состояние страницы дня
├── burger.ts                 # Состояние мобильного меню
└── backHome.ts               # Навигация назад

lib/
├── weather.ts                # fetchWeather() → GET /api/weather
├── location.ts               # fetchLocation() → reverse geocoding API
└── fetchRequest.ts           # Общая обёртка над fetch

types/
├── weather.ts                # Интерфейсы ответа weather API
├── location.ts               # Интерфейсы геокодера
└── svg.d.ts                  # Декларации для SVG как React-компонентов

styles/
├── _variables.sass           # CSS-переменные: цвета, размеры
└── _mixins.sass              # SASS-миксины (автоинжект в модули)
```

### Поток данных

```
WeatherInit (layout)
    ↓ useGeoStore.init()
Браузерная геолокация / localStorage / fallback (случайный город)
    ↓ координаты
useWeatherStore.load(lat, lon)
    ↓ параллельно
fetchWeather() → /api/weather → External Weather API
fetchLocation() → Geocoding API
    ↓
Zustand store (weather, location)
    ↓
Все страницы и компоненты читают из стора
```

## Запуск

```bash
# Установка зависимостей
yarn

# Разработка
yarn dev

# Production-сборка
yarn build
yarn start

# Линтинг
yarn lint
```

## Переменные окружения

Скопируй `.env.example` → `.env.local` и заполни:

```env
# Weather API
API_WEATHER=""              # Базовый URL внешнего weather API
SECRET_API_KEY_WEATHER=""   # API-ключ
METRIC=""                   # Единицы измерения (например unitGroup=metric)
LANG=""                     # Язык ответа (например lang=ru)

# Геокодер (reverse geocoding)
NEXT_PUBLIC_API_GEO=""      # URL геокодера (публичный, используется на клиенте)
SECRET_API_KEY_GEO=""       # API-ключ геокодера

# Yandex Maps
NEXT_PUBLIC_API_KEY_MAPS="" # API-ключ Яндекс.Карт
```

API-роуты валидируют наличие серверных переменных при старте и выбрасывают ошибку, если что-то не задано.

## SVG-иконки

SVG-файлы из `assets/` импортируются как React-компоненты через SVGR (Turbopack/Webpack). Типы покрыты `types/svg.d.ts`. Новые иконки погоды добавляются в lookup table внутри `components/weather/icon.tsx`.

## PWA

Приложение работает как PWA: устанавливается на устройство, кешируется через service worker (Serwist), имеет офлайн-страницу по адресу `/offline`. Service worker отключён в режиме разработки.
