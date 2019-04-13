import React, { Component } from 'react';
import axios from 'axios';

import Loader from 'react-loader-spinner';
import WeatherCard from './components/WeatherCard/WeatherCard';

class App extends Component {
  state = {
    geolocation: { latitude: 0, longitude: 0 },
    forecastData: {},
    location: {},
    isLoading: false,
  }

  componentDidMount() {
    this.getCoords();
  }

  getCoords = async () => {
    this.setState({ isLoading: true });
    await navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      this.setState({ geolocation: { latitude, longitude } }, () => {
        axios.post('/weather', this.state.geolocation)
          .then(() => {
            axios.get('/weather')
              .then(({ data: { forecastData, location } }) => {
                this.setState({ forecastData, location, isLoading: false });
              });
          });
      });
    });
  }

  render() {
    const { forecastData, location, isLoading } = this.state;

    return (
      <div>
        <WeatherCard forecastData={forecastData} location={location} isLoading={isLoading} />
      </div>
    );
  }
}

export default App;
