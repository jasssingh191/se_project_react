import { WEATHER_API_KEY, LOCATION_COORDS } from "./constants";
import { checkResponse } from "./request";

function getWeatherCondition(temperature) {
  if (temperature >= 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
}

function extractWeatherData(data) {
  const tempF = Math.round(data.main.temp);
  return {
    city: data.name,
    temperature: {
      F: tempF,
      C: Math.round((tempF - 32) * (5 / 9)),
    },
    type: getWeatherCondition(tempF),
    condition: data.weather[0].main,
    icon: data.weather[0].icon,
  };
}

function getWeather(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${WEATHER_API_KEY}`;
  return fetch(url).then(checkResponse).then(extractWeatherData);
}

export { getWeatherCondition, getWeather };
