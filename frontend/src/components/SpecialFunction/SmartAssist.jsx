import { useLocation } from "react-router-dom";
import '../../css/SpecialFunction/SmartAssist.css';
import { useEffect, useState } from "react";
import axios from "axios";
import WeatherData from "./WeatherData";

const WeatherDetails = () => {
    const location = useLocation();
    const detail = location.state;
    const [weathers, setWeather] = useState([]);

    if (!detail) {
        return <p>Details not found</p>;
    }

    useEffect(() => {
        async function fetchWeather() {
            try {
                const response = await axios.get(`http://localhost:5000/api/weather/${detail.location}`);
                setWeather(response.data.list);  // Update the state with the weather data
                console.log(response.data.list);  // Log the response directly
            } catch (err) {
                console.error("Error fetching weather data:", err);
            }
        }

        // Call the function to fetch weather data
        fetchWeather();
    }, [detail]);  // Depend on the detail object to re-fetch weather when it changes

    return (
        <div className="assist">
            <div className="assist-container">

            <h1 className="weather-location">Weather Information</h1>
            <p className="weather-sub">{detail.location}</p>
            {weathers.length > 0 ? (
                <div className="weather-list">
                    {weathers.map((weather, index) => (
                        <WeatherData key={index} temp={weather.temp.day} desc={weather.weather[0].description} icon={weather.weather[0].icon}/>
                    ))}
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
            </div>
        </div>
    );
};

export default WeatherDetails;