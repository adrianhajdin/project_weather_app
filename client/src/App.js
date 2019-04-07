import React, { Component } from 'react';
import axios from 'axios';

import WeatherCard from './components/WeatherCard/WeatherCard';

class App extends Component {
  state = {
    geolocation: { latitude: 0, longitude: 0 },
    forecastData: {},
    location: {},
  }

  componentDidMount() {
    this.getCoords();
  }

  getCoords = async () => {
    await navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      this.setState({ geolocation: { latitude, longitude } }, () => {
        axios.post('/weather', this.state.geolocation)
          .then(() => {
            axios.get('/weather')
              .then(({ data: { forecastData, location } }) => {
                this.setState({ forecastData, location });
              });
          });
      });
    });
  }

  render() {
    const { forecastData, location, loaded } = this.state;

    return (
      <div>
        <WeatherCard forecastData={forecastData} location={location} loaded={loaded} />
      </div>
    );
  }
}

export default App;
