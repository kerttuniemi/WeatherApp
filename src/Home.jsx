import React, { useState, useEffect } from "react";
import { Card, Spinner, Alert } from "react-bootstrap";
import "./Weather.css";
import WeatherAnimation from "./WeatherAnimation";

const Home = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "ddb4b568c7a7f7143161bea7aeefa554";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          setError("Error getting location.");
          console.error("Error getting location: ", error);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      setLoading(true);
      setError(null);
      fetchWeather(location.lat, location.lon);
    }
  }, [location]);

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`
      );

      if (!response.ok) {
        throw new Error("Could not load weather data.");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError("Error fetching weather data.");
      console.error("Weather fetch error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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
    <div className="p-4 d-flex flex-column align-items-center">
      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {weatherData && (
        <Card
          className="kortti"
          style={{
            width: "18rem",
            maxHeight: "30rem",
            padding: "1rem",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          <Card.Body>
            <Card.Title className="mb-3">
              <h3>
                Current weather in <strong>{capitalizeFirstLetter(weatherData.name)}</strong>
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
              <strong>Weather:</strong> {capitalizeFirstLetter(weatherData.weather[0].description)}
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

      {!loading && !error && !weatherData && (
        <p className="mt-3" style={{color: "#34666f"}}>Please wait while I search for your location...</p>
      )}
    </div>
  );
};

export default Home;
