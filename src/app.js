const path = require("path")

// external libraries
const express = require("express")
const hbs = require("hbs")

//Utils
const geocode = require("./utils/geocode")
const weather = require("./utils/weather")

const app = express()
const port = process.env.PORT || 3000

// Define path configs
const publicPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup config directory to serve from
app.use(express.static(publicPath))

//Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Manthan Laad",
    message: `Welcome to Weather App`,
  })
})

app.get("/weather", (req, res) => {
  const address = req.query.address
  if (!address) {
    return res.send({ address: "Please Provide an Address" })
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    weather(latitude, longitude, (error, forecastData, icon_url) => {
      if (error) {
        return res.send({ error })
      }
      console.log("Location", location)
      console.log("Data", forecastData)
      res.send({
        title: "Home",
        name: "Manthan Laad",
        location,
        forecastData,
        icon_url,
        message: `Location: ${location}  Forecast: ${forecastData}`,
      })
    })
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Manthan Laad",
    message:
      "This site was created by Manthan, using Mapbox🌏📌 and Weather Stack⛅ APIs",
  })
})
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Manthan Laad",

    message:
      "Contact me at laad.manthan@gmail.com when it snows in the desert 🐪☃️",
  })
})
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Home",
    name: "Manthan Laad",
    message: "Help Article not Found",
  })
})

app.get("*", (req, res) => {
  res.render("index", {
    title: "404",
    name: "Manthan Laad",
    message: "Page not Found",
  })
})

app.listen(port, () => {
  console.log(`Server up at port ${port}`)
})
