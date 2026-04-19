import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "./Main.css";
import { getWeatherCondition } from "../utils/weatherApi";

function Main({ weatherData, clothingItems, onCardClick }) {
  // Filter clothing items based on current weather
  const currentWeather = getWeatherCondition(weatherData.temperature);
  const filteredItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === currentWeather,
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="items">
        <h2 className="items__title">
          Today is {weatherData.temperature}°F / You might want to wear:
        </h2>
        <ul className="items__list">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
