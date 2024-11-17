import React from 'react';
import './WeatherAnimation.css';

const WeatherAnimation = ({ weather }) => {
  return (
    <div className="weather-animation-wrapper">
      {weather === 'sunny' && (
        <>
          <div className="sunny"></div>

        </>
      )}
      {weather === 'partly_cloudy' && (
        <>
          <div className="partly_cloudy">
            <div className="partly_cloudy__sun"></div>
            <div className="partly_cloudy__cloud"></div>
          </div>
        </>
      )}
      {weather === 'cloudy' && (
        <>
          <div className="cloudy"></div>
        </>
      )}
      {weather === 'rainy' && (
        <>
          <div className="rainy">
            <div className="rainy__cloud"></div>
            <div className="rainy__rain"></div>
          </div>
        </>
      )}
      {weather === 'thundery' && (
        <>
          <div className="thundery">
            <div className="thundery__cloud"></div>
            <div className="thundery__rain"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherAnimation;
