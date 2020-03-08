import React from 'react';

import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import './WeatherCard.css';

import locationPin from '../../images/location-pin.png';
import iconImg from '../../images/sunny.png';

const WeatherCard = ({
  forecastData: {
    currently: {
      icon: iconCurrently = '',
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
  },
  isLoading,
}) => (
  <div className="card">
    {console.log(iconCurrently)}
    {isLoading ? (
      <Loader type="ThreeDots" color="#00BFFF" height="100" width="100" />
    )
      : (
        <div>
          <h3>{city}, {county}, {country}
            <img src={locationPin} width="10px" alt="location pin" />
          </h3>
          <h3>
            {summaryCurrently}
            <br />
            <span>Wind {windSpeed}km/h</span>
            <span className="dot">•</span>
            <span>Precip {5}</span>
            <span className="dot">•</span>
            <span>UV {uvIndex}</span>
          </h3>
          <img style={{ marginBlockStart: '1.8em', marginBlockEnd: '0.67em' }} width="100px" src={iconImg} alt="weather" />
          <h1>{Math.round(temperature)}°</h1>
          <h3>
      This week:
            <br />
            <span>{summaryWeekly}</span>
            {/* <span>{iconWeekly}</span> */}
          </h3>
        </div>
      )
  }

  </div>
);

WeatherCard.defaultProps = {
  forecastData: {},
  location: {},
};

WeatherCard.propTypes = {
  forecastData: PropTypes.shape({}),
  location: PropTypes.shape({}),
};

export default WeatherCard;
