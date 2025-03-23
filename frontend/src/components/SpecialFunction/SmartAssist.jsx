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
                <p className="weather-sub">Your Location: {detail.location}</p>
                {weathers.length > 0 ? (
                    <div className="weather-list">
                        {weathers.map((weather, index) => {
                            // Generate days in the sequence 1, 2, 3, 5, ..., 7
                            const dayIndex = index + 1; // This gives you 1, 2, 3, ..., based on index
                            const day = [1, 2, 3, 4,5, 6,7].includes(dayIndex) ? dayIndex : null;
                            return day ? (
                                <WeatherData
                                    key={index}
                                    day={day}
                                    temp={weather.temp.day}
                                    desc={weather.weather[0].description}
                                    icon={weather.weather[0].icon}
                                />
                            ) : null;
                        })}
                    </div>
                ) : (
                    <p>Loading weather data...</p>
                )}
                <hr />
            </div>
        </div>
    );
}    

export default WeatherDetails;