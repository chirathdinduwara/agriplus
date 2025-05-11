import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../css/SpecialFunction/SmartAssist.css';
import WeatherData from './WeatherData';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CiSearch } from "react-icons/ci";

function GetWeather() {
  
  const [weatherList, setWeatherList] = useState([]);
  const [city, setCity] = useState("Colombo");
  const [inputCity, setInputCity] = useState("Colombo");

  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather/${cityName}`);
      const data = response.data;
      setWeatherList(data.list || []);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setWeatherList([]); // Clear if error
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity.trim());
    }
  };

  const generatePDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(`16-Day Weather Forecast for ${city}`, 14, 15);

  const columns = ["Day", "Description", "Temperature"];
  const rows = weatherList.map((day, index) => [
    `Day ${index + 1}`,
    day.weather[0].description,
    `${day.temp.day}°C`
  ]);

  autoTable(doc, {
    startY: 25,
    head: [columns],
    body: rows,
    styles: { fontSize: 11 },
    headStyles: { fillColor: [0, 123, 255] },
    alternateRowStyles: { fillColor: [240, 240, 255] }
  });

  doc.save(`${city}_weather_forecast.pdf`);
};

  return (
    <div className="smart-farming">
      <h1 className="smart-heading">16-Day Weather Forecast {"- " + city}</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-btn"> <CiSearch size={20} /> </button>
      </form>

      <button className="add" onClick={generatePDF}>Generate PDF</button>

      <div className="smart-weather-list">
        {weatherList.length === 0 ? (
          <p>No data available. Try another city.</p>
        ) : (
          weatherList.map((data, index) => (
            <WeatherData
              key={index}
              day={index + 1}
              temp={data.temp.day}
              desc={data.weather[0].description}
              icon={data.weather[0].icon}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default GetWeather;
