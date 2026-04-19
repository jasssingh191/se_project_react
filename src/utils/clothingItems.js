import { WEATHER_API_KEY, LOCATION_COORDS } from "./constants";

function getWeatherCondition(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}

function extractWeatherData(data) {
  return {
    city: data.name,
    temperature: Math.round(data.main.temp),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
  };
}

async function getWeather(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    const data = await response.json();
    return extractWeatherData(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

export { getWeatherCondition, getWeather };
