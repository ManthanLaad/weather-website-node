const request = require("request")

const weather = (latitude, longitude, callback) => {
  const weatherStackURL = `http://api.weatherstack.com/current?access_key=2542492c1d2e0179bcb03e0ba9a088c8&query=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}&units=m`
  request({ url: weatherStackURL, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to Weather API")
    } else if (body.success === false) {
      callback("Unable to find location")
    } else {
      const {
        weather_descriptions,
        weather_icons,
        humidity,
        precip,
        temperature,
        feelslike,
      } = body.current
      callback(
        undefined,
        `The weather is ${weather_descriptions[0]}. It is currently ${temperature}ºC. But it feels like ${feelslike}ºC. \nThe humidity in the region is ${humidity} and the chance of precipitate is ${precip}%`,
        weather_icons
      )
    }
  })
}

module.exports = weather
