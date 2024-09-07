// Replace with your actual API key
const apiKey = ' http://api.weatherapi.com/v1/current.json';
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data
async function fetchWeatherData(city) {
  try {
    const response = await fetch(`${weatherApiUrl}?q=${city}&units=imperial&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === 200) { // HTTP status code 200 means success
      updateWeatherDisplay(data);
    } else {
      alert('City not found. Please try another city.');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Failed to fetch weather data. Please try again later.');
  }
}

// Function to update the weather display on the page
function updateWeatherDisplay(data) {
  const locationElement = document.querySelector('.location h1');
  const dateElement = document.querySelector('.location p');
  const tempElement = document.querySelector('.current-weather h2');
  const iconElement = document.querySelector('.current-weather img');
  const conditionElement = document.querySelector('.current-weather p:nth-child(3)');
  const feelsLikeElement = document.querySelector('.current-weather p:nth-child(4)');
  const windSpeedElement = document.querySelector('.current-weather p:nth-child(5)');
  const humidityElement = document.querySelector('.current-weather p:nth-child(6)');
  const pressureElement = document.querySelector('.current-weather p:nth-child(7)');

  // Update the elements with API data
  locationElement.textContent = `${data.name}, ${data.sys.country}`;
  dateElement.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  tempElement.textContent = `${data.main.temp}°F`;
  iconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  iconElement.alt = data.weather[0].description;
  conditionElement.textContent = data.weather[0].description;
  feelsLikeElement.textContent = `Feels Like: ${data.main.feels_like}°F`;
  windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} mph`;
  humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
  pressureElement.textContent = `Pressure: ${data.main.pressure} mb`;
}

// Event listener for search input
document.getElementById('search').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    const city = event.target.value;
    fetchWeatherData(city);
  }
});

// Initial default city (optional)
fetchWeatherData('New York');
