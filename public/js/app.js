console.log("Client Side JS Loaded")

const form = document.querySelector("form")
const searchText = document.querySelector("input")
const outputP1 = document.querySelector("#output-1")
const outputP2 = document.querySelector("#output-2")

outputP1.textContent = ""
outputP2.textContent = ""

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const address = searchText.value
  outputP1.textContent = `On our way to ${address} ✈️🌍`
  outputP2.textContent = "Loading...."

  fetch(`/weather?address=${encodeURIComponent(address)}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        outputP1.textContent = data.error
        outputP2.textContent = "😿"
        return
      }
      console.log(data.forecastData)
      outputP1.textContent = data.location
      outputP2.textContent = data.forecastData
    })
  })
})

// fetch("https://puzzle.mead.io/puzzle").then((res) => {
//   res.json().then((data) => {
//     console.log(data)
//   })
// })
