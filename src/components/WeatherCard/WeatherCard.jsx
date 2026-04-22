import "./WeatherCard.css";
import sunnyDay from "../../assets/sunny-day.png";
import sunnyNight from "../../assets/sunny-night.png";
import cloudyDay from "../../assets/cloudy-day.png";
import cloudyNight from "../../assets/cloudy-night.png";
import rainDay from "../../assets/rian-day.png";
import rainNight from "../../assets/rain-night.png";
import stormDay from "../../assets/storm-day.png";
import stormNight from "../../assets/storm-night.png";
import snowDay from "../../assets/snow-day.png";
import snowNight from "../../assets/snow-night.png";
import fogDay from "../../assets/fog-day.png";
import fogNight from "../../assets/fog-night.png";

const weatherImageMap = {
  "01d": sunnyDay,
  "01n": sunnyNight,
  "02d": cloudyDay,
  "02n": cloudyNight,
  "03d": cloudyDay,
  "03n": cloudyNight,
  "04d": cloudyDay,
  "04n": cloudyNight,
  "09d": rainDay,
  "09n": rainNight,
  "10d": rainDay,
  "10n": rainNight,
  "11d": stormDay,
  "11n": stormNight,
  "13d": snowDay,
  "13n": snowNight,
  "50d": fogDay,
  "50n": fogNight,
};

function WeatherCard({ weatherData }) {
  const image = weatherImageMap[weatherData.icon];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temperature} &deg;F</p>
      {image && (
        <img
          className="weather-card__image"
          src={image}
          alt={weatherData.condition}
        />
      )}
    </section>
  );
}

export default WeatherCard;
