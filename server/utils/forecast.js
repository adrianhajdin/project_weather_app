const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/b51dd7257f9524793206bc4d5edca00e/${latitude},${longitude}`;

    request({ url, json: true }, (error, {
        body: {
            error : err,
            currently,
            daily,
        }
    }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (err) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, { currently, daily });
        }
    })
}

module.exports = forecast