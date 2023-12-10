function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElementMain = document.querySelector("#description-main");
  let humidityElementMain = document.querySelector("#humidity-details");
  let windSpeedElementMain = document.querySelector("#wind-speed-details");
  let weatherIconElementMain = document.querySelector("#weather-icon-main");

  if (temperatureElement && cityElement && descriptionElementMain && humidityElementMain && windSpeedElementMain && weatherIconElementMain) {
    cityElement.innerHTML = response.data.city;
    descriptionElementMain.innerHTML = response.data.condition.description;
    humidityElementMain.innerHTML = response.data.humidity;
    windSpeedElementMain.innerHTML = response.data.wind.speed;

    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    setWeatherIcon(weatherIconElementMain, response.data.condition.icon);
  } else {
    console.error("One or more elements not found in HTML.");
  }
}

function setWeatherIcon(element, iconCode) {
  const iconMappings = {
    "01d": "☀️", "01n": "🌙", "02d": "⛅", "02n": "🌥️",
    "03d": "☁️", "03n": "☁️", "04d": "☁️", "04n": "☁️",
    "09d": "🌧️", "09n": "🌧️", "10d": "🌦️", "10n": "🌦️",
    "11d": "⛈️", "11n": "⛈️", "13d": "❄️", "13n": "❄️",
    "50d": "🌫️", "50n": "🌫️"
  };

  element.innerHTML = iconMappings[iconCode] || "❓";
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "6a31bo1005009840837b5525f35tf65a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
