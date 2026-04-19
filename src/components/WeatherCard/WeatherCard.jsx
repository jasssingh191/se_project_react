import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temperature}°F</p>
      {weatherData.icon && (
        <img
          className="weather-card__image"
          src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
          alt={weatherData.condition}
        />
      )}
    </section>
  );
}

export default WeatherCard;
