import './styles.css';

const input = document.getElementById('search');

const location = document.getElementById('loc');
const weather = document.getElementById('weather');
const temp = document.getElementById('temp');
const low = document.getElementById('low');
const high = document.getElementById('high');
const humidity = document.getElementById('humidity');

// function kelvinToCelcius(tempInKelvin) {
//   return (tempInKelvin - 273.15).toFixed(2);
// }

// function kelvinToFahrenheit(tempInKelvin) {
//   return ((tempInKelvin - 273.15) * (9 / 5) + 32).toFixed(2);
// }

function getTemp(tempInKelvin, units) {
  if (units === 'C') {
    return `${(tempInKelvin - 273.15).toFixed(2)} \u00B0C`;
  }
  return `${((tempInKelvin - 273.15) * (9 / 5) + 32).toFixed(2)} \u00B0F`;
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
  humidity.textContent = `Humidity ${weatherData.main.humidity}`;
}

readData('bellingham');

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    readData(input.value);
    input.blur();
    input.value = '';
  }
});
