import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Weather.css";
import WeatherAnimation from "./WeatherAnimation";
import { Card, Spinner, Alert } from "react-bootstrap";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const API_KEY = "ddb4b568c7a7f7143161bea7aeefa554";

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const city = query.get("city");

  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`
          );

          if (!response.ok) {
            throw new Error("Could not load weather information :(");
          }

          const data = await response.json();
          setWeatherData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchWeather();
    }
  }, [city]);

  const handleSearch = () => {
    if (searchCity.trim()) {
      window.location.search = `?city=${searchCity}`;
    }
  };

  const getWeatherType = () => {
    if (weatherData) {
      const mainWeather = weatherData.weather[0].main.toLowerCase();
      if (mainWeather.includes("clear")) return "sunny";
      if (mainWeather.includes("clouds")) return "cloudy";
      if (mainWeather.includes("rain")) return "rainy";
      if (mainWeather.includes("thunder")) return "thundery";
      if (mainWeather.includes("partly")) return "partly_cloudy";
    }
    return null;
  };

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <div className="hakukenttä">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            
          }}
        >
          <input
          className="hakukenttä"
            type="text"
            placeholder="Enter city"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          
          />
          <button
          className="hakunappi"
            type="submit"
            >
            Search
          </button>
        </form>
      </div>
      {loading && <Spinner animation="border" variant="primary"/>}
      {error && <Alert variant="danger">{error}</Alert>}
      {weatherData && (
        <Card
          className="kortti"
          style={{
            width: "18rem",
            maxHeight: "30rem",
            padding: "1rem",
            textAlign: "center",
            marginTop: "10px"
          }}
        >
          <Card.Body>
            <Card.Title className="mb-3">
              <h3>
                Weather now in <strong>{city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}</strong>
              </h3>
            </Card.Title>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <WeatherAnimation weather={getWeatherType()} />
            </div>
            <Card.Text className="mt-2 mb-2">
              <strong>Temperature:</strong> {Math.round(weatherData.main.temp)}°C
            </Card.Text>
            <Card.Text className="mb-2">
              <strong>Weather:</strong> {weatherData.weather[0].description}
            </Card.Text>
            <Card.Text className="mb-2">
              <strong>Humidity:</strong> {weatherData.main.humidity} %
            </Card.Text>
            <Card.Text className="mb-2">
              <strong>Wind speed:</strong> {weatherData.wind.speed.toFixed(1)} m/s
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Weather;
