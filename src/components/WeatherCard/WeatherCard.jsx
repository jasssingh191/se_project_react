import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <div className="weather-card__container">
        <p className="weather-card__temp">{weatherData.temperature}°F</p>
        <p className="weather-card__description">{weatherData.condition}</p>
      </div>
      <div className="weather-card__icon">
        {/* Weather icon will be displayed here based on condition */}
        {weatherData.temperature >= 86 && <span className="icon-sun">☀️</span>}
        {weatherData.temperature < 86 && weatherData.temperature >= 66 && (
          <span className="icon-cloud">⛅</span>
        )}
        {weatherData.temperature < 66 && <span className="icon-snow">❄️</span>}
      </div>
    </section>
  );
}

export default WeatherCard;
