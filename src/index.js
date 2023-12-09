function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let weatherIconElement = document.querySelector("#weather-icon");

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.humidity;
  windSpeedElement.innerHTML = response.data.wind.speed;

  temperatureElement.innerHTML = temperature;


  setWeatherIcon(weatherIconElement, response.data.condition.icon);

    console.log(response.data);
  }
  function setWeatherIcon(element, iconCode) {
  }
    const iconMappings = {
        "01d": "☀️", // clear sky day
        "01n": "🌙", // clear sky night
        "02d": "⛅", // few clouds day
        "02n": "🌥️", // few clouds night
        "03d": "☁️", // scattered clouds day
        "03n": "☁️", // scattered clouds night
        "04d": "☁️", // broken clouds day
        "04n": "☁️", // broken clouds night
        "09d": "🌧️", // shower rain day
        "09n": "🌧️", // shower rain night
        "10d": "🌦️", // rain day
        "10n": "🌦️", // rain night
        "11d": "⛈️", // thunderstorm day
        "11n": "⛈️", // thunderstorm night
        "13d": "❄️", // snow day
        "13n": "❄️", // snow night
        "50d": "🌫️", // mist day
        "50n": "🌫️", // mist night
    };

  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;
  
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
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
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);