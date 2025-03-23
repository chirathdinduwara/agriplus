import '../../css/SpecialFunction/SmartAssist.css';

function WeatherData({ temp, desc, icon }) {
    return (
        <div className="weather-item">
            <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt={desc} className="weather-icon" />
            <div className="weather-info-container">
                <p className="weather-desc">{desc}</p>
                <p className="weather-temp">{temp}°C</p>
            </div>
        </div>
    );
}

export default WeatherData;
