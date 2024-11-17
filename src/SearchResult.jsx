import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchResult = () => {
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const API_KEY = "YOUR_OPENWEATHER_API_KEY";
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeather();
  }, [city]);
};

export default SearchResult;
