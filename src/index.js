function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElementMain = document.querySelector("#description-main");
  let humidityElementMain = document.querySelector("#humidity-main");
  let windSpeedElementMain = document.querySelector("#wind-speed-main");
  let weatherIconElementMain = document.querySelector("#weather-icon-main");

  cityElement.innerHTML = response.data.city;
  descriptionElementMain.innerHTML = response.data.condition.description;
  humidityElementMain.innerHTML = response.data.humidity;
  windSpeedElementMain.innerHTML = response.data.wind.speed;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  
  setWeatherIcon(weatherIconElementMain, response.data.condition.icon);


  console.log(response.data);
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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;


  console.log("API URL:", apiUrl);

  axios.get(apiUrl).then(displayTemperature);
}


function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let formattedDay = days[day];

  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
