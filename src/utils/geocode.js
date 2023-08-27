const request = require("request")

const geocode = (address, callback) => {
  const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibWFudGhhbjk5IiwiYSI6ImNrcGZrMXR6azI3MHoyc29naDY4YzUyNHAifQ.-tWhNj1Q7zf73XIhM2-1GA`
  request({ url: mapboxURL, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location Services")
    } else {
      const geocode = body.features
      if (geocode.length === 0) {
        callback("Unable to find location. Try another search")
      } else {
        const { center, place_name } = geocode[0]
        callback(undefined, {
          longitude: center[0],
          latitude: center[1],
          location: place_name,
        })
      }
    }
  })
}

module.exports = geocode
