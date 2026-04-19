import { WEATHER_API_KEY, LOCATION_COORDS } from "./constants";

function getWeatherCondition(temperature) {
  if (temperature >= 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
}

function extractWeatherData(data) {
  const temperature = Math.round(data.main.temp);
  return {
    city: data.name,
    temperature,
    type: getWeatherCondition(temperature),
    condition: data.weather[0].main,
    icon: data.weather[0].icon,
  };
}

async function getWeather(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${WEATHER_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }
  const data = await response.json();
  return extractWeatherData(data);
}

export { getWeatherCondition, getWeather };
