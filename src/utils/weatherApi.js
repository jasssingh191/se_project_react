import { WEATHER_API_KEY, LOCATION_COORDS } from "./constants";

/**
 * Determines weather condition based on temperature in Fahrenheit
 * @param {number} temperature - Temperature in Fahrenheit
 * @returns {string} - Weather condition: "hot", "warm", or "cold"
 */
function getWeatherCondition(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}

/**
 * Extracts necessary weather data from OpenWeather API response
 * @param {object} data - Raw API response data
 * @returns {object} - Processed weather object with city, temperature, and condition
 */
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

/**
 * Fetches current weather data from OpenWeather API
 * @param {number} latitude - Location latitude
 * @param {number} longitude - Location longitude
 * @returns {Promise<object>} - Processed weather data
 */
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
