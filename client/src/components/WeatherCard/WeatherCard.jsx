import React, { Component } from 'react';

import './WeatherCard.css';

import locationPin from './location-pin.png';
import iconImg from './sunny.png';

const WeatherCard = ({
  forecastData: {
    currently: {
      // icon: iconCurrently = '',
      summary: summaryCurrently = '',
      temperature = '',
      uvIndex = '',
      windSpeed = '',
    } = {},
    daily: {
      // icon: iconWeekly = '',
      summary: summaryWeekly = '',
    } = {},
  },
  location: {
    city = '',
    county = '',
    country = '',
  } = {},
}) => (
  <div className="card">
    <h3>{city}, {county}, {country} <img src={locationPin} width="10px" alt="location pin" /></h3>

    <h3>
      {summaryCurrently}
      <br />
      <span>Wind {windSpeed}km/h </span>
      <span className="dot">•</span>
      <span>Precip {5}</span>
      <span className="dot">•</span>
      <span>UV {uvIndex}</span>
      {/* <span>{iconCurrently}</span> */}
    </h3>

    <img style={{ marginBlockStart: '1.8em', marginBlockEnd: '0.67em' }} width="100px" src={iconImg} alt="" />
    <h1>{Math.round(temperature)}°</h1>

    <h3>
          This week:
      <br />
      <span>{summaryWeekly}</span>
      {/* <span>{iconWeekly}</span> */}
    </h3>
  </div>
);

export default WeatherCard;
