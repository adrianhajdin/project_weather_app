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
    const { geolocation } = this.state;

    this.getCoords()
      .then(() => {
        axios.post('/weather', geolocation)
      .then(() => {
        axios.get('/weather')
          .then(({ data: { forecastData, location } }) => {
            this.setState({ forecastData, location });
          })
      })
      })
  }

  getCoords = async () => {
    await navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude} }) => this.setState({ geolocation: { latitude, longitude} }));
  }

  render() {
    const { forecastData, location, loaded } = this.state;
    return (
      <div>
        <WeatherCard forecastData={forecastData} location={location} loaded={loaded}/>
      </div>
    )
  }
}

export default App;
