import './styles.css';

const input = document.getElementById('search');

const mainPanel = document.getElementById('mainInfo');
const additionalPanel = document.getElementById('additionalInfo');
const dataBlock = document.getElementsByClassName('dataBlock');

const location = document.getElementById('loc');
const weather = document.getElementById('weather');
const temp = document.getElementById('temp');
const low = document.getElementById('low');
const high = document.getElementById('high');
const humidity = document.getElementById('humidity');

const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const wind = document.getElementById('wind');

function getTemp(tempInKelvin, units) {
  if (units === 'C') {
    return `${(tempInKelvin - 273.15).toFixed(2)} \u00B0C`;
  }
  return `${((tempInKelvin - 273.15) * (9 / 5) + 32).toFixed(2)} \u00B0F`;
}

function getTime(time, timezone) {
  const today = new Date(time * 1000 + (timezone * 1000));
  let hours = today.getUTCHours();
  const ampm = hours >= 12 ? 'pm' : 'am';
  let min = today.getUTCMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  hours %= 12;
  if (hours === 0) {
    hours = 12;
  }
  return `${hours}:${min}${ampm}`;
}

async function getData(query) {
  let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=1b8951a5e2a01979256ecf6576eb035e`);
  response = response.json();
  console.log(response);
  return response;
}

async function readData(query) {
  const weatherData = await getData(query);

  location.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
  weather.textContent = `${weatherData.weather[0].main}`;
  temp.textContent = `Temperature: ${getTemp(weatherData.main.temp, 'C')}`;
  low.textContent = `Low: ${getTemp(weatherData.main.temp_min, 'C')}`;
  high.textContent = `High: ${getTemp(weatherData.main.temp_max, 'C')}`;
  humidity.textContent = `Humidity: ${weatherData.main.humidity}`;
  sunrise.textContent = `Sunrise: ${getTime(weatherData.sys.sunrise, weatherData.timezone)}`;
  sunset.textContent = `Sunset: ${getTime(weatherData.sys.sunset, weatherData.timezone)}`;
  wind.textContent = `Wind: ${weatherData.wind.speed}`;
}

readData('bellingham');

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    readData(input.value);
    input.blur();
    input.value = '';
  }
});

Array.from(dataBlock).forEach((block) => {
  block.addEventListener('click', () => {
    if (additionalPanel.classList.contains('isVisible')) {
      additionalPanel.classList.remove('isVisible');
    } else {
      additionalPanel.classList.add('isVisible');
    }
  });
});
