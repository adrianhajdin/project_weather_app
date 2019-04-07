const express = require('express');
const bodyParser = require('body-parser');

const NodeGeocoder = require('node-geocoder');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const geocoder = NodeGeocoder({ apiKey: 'AIzaSyCE3hpT8Yq2CYIHYwJFnXRskOxNsJoyAxg' });

app.use(bodyParser.json());

app.post('/weather', (req, res) => {
  const { latitude: lat, longitude: lon } = req.body;

  console.log(lat);

  app.locals.latitude = lat;
  app.locals.longitude = lon;

  geocoder.reverse({ lat, lon })
    .then((res) => {
      app.locals.location = {
        city: res[0].city,
        county: res[0].administrativeLevels.level1short,
        country: res[0].country,
        countryCode: res[0].countryCode,
      };
    })
    .catch((err) => {
      console.log(err);
    });

  res.end();
});

// app.get('/weather', (req, res) => {
//     if (!app.locals.address) {
//         return res.send({ error: 'You must provide an address!' });
//     }

//     console.log('reach get')


//     geocode(app.locals.address, (error, { latitude, longitude, location } = {}) => {
//         if (error) {
//             return res.send({ error })
//         }

//         forecast(latitude, longitude, (error, forecastData) => {
//             if (error) {
//                 return res.send({ error })
//             }

//             console.log(forecastData)

//             res.send({ forecast: forecastData, location, address: req.query.address });
//         });
//     });
// });

app.get('/weather', (req, res) => {
  const { latitude, longitude, location } = app.locals;

  forecast(latitude, longitude, (error, forecastData) => {
    if (error) {
      return res.send({ error });
    }

    res.json({ forecastData, location });
  });
});

app.listen(5000, () => console.log('Server is up on port 5000.'));
