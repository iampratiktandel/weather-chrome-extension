const OPEN_WEATHER_API_KEY = 'a2a9dd45ff46fb86507f766972ea1ffb';

export interface OpenWeatherData {
    name: string;
    main: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_max: number
        temp_min: number
    }
    weather: {
        id: number
        main: string
        description: string
        icon: string
    }[]
    wind: {
        deg: number
        speed: number
    }
}

export async function fetchOpenWeatherData(city: string): Promise<OpenWeatherData> {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}`);

    if (!res.ok) {
        throw new Error('City not found');
    }

    const data: OpenWeatherData = await res.json();
    return data;
}