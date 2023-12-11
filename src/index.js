
function displayTemperature(response) {
  const temperatureElement = document.querySelector("#current-temperature-main");
  const cityElementMain = document.querySelector("#current-city-main");
  const descriptionElementMain = document.querySelector("#description-main");
  const humidityElementDetails = document.querySelector("#humidity-details");
  const windSpeedElementDetails = document.querySelector("#wind-speed-details");
  const weatherIconElementMain = document.querySelector("#weather-icon-main");
  const currentDateMain = document.querySelector("#current-date-main");
  const currentDateDetails = document.querySelector("#current-date-details");

  if (temperatureElement && cityElementMain && descriptionElementMain && humidityElementDetails && windSpeedElementDetails && weatherIconElementMain) {
    cityElementMain.textContent = response.data.city;
    descriptionElementMain.textContent = response.data.condition.description;
    humidityElementDetails.textContent = response.data.humidity;
    windSpeedElementDetails.textContent = response.data.wind.speed;

    temperatureElement.textContent = Math.round(response.data.temperature.current);
    setWeatherIcon(weatherIconElementMain, response.data.condition.icon);
  
    currentDateDetails.textContent = formatDate(new Date());
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

  element.textContent = iconMappings[iconCode] || "⛅";
}

function search(event) {
  event.preventDefault();
  const searchInputElement = document.querySelector("#search-input");
  const city = searchInputElement.value;

  const apiKey = "6a31bo1005009840837b5525f35tf65a";
  const currentWeatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(currentWeatherApiUrl).then(response => {
    displayTemperature(response);
    getForecast(city);
  });
}





const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);


function displayForecast(response) {
  console.log(response.data);

}


function getForecast(city) {
  const apiKey = "6a31bo1005009840837b5525f35tf65a";
  const forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios.get(forecastApiUrl).then(displayForecast);
}



function formatDate(date) {

  return date.toDateString();
}


window.onload = function() {
  displayForecast();
};


