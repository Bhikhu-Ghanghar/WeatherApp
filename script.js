// Get all necessary elements from the DOM
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.Humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('#locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cityList = document.querySelectorAll('.city');

let cityInput = "Delhi";

// Default city weather on page load
fetchWeatherData(cityInput);

// Event listener for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    cityInput = search.value;
    fetchWeatherData(cityInput);
    search.value = '';
});

// Event listeners for each city in the panel
cityList.forEach(city => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData(cityInput);
    });
});

// Fetch and display weather data
function fetchWeatherData(city) {
    const apiKey = '0aa2824e546fa183dcaefe46b847e1db';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateWeatherInfo(data);
            updateBackgroundImage(data.weather[0].main);
        })
        .catch(() => {
            alert('City not found');
        });
    
}

function updateWeatherInfo(data) {
    temp.innerHTML = `${data.main.temp}&#176;C`;
    conditionOutput.innerHTML = data.weather[0].description;
    nameOutput.innerHTML = data.name;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    cloudOutput.innerHTML = `${data.clouds.all}%`;
    humidityOutput.innerHTML = `${data.main.humidity}%`;
    windOutput.innerHTML = `${data.wind.speed} km/h`;
    const date = new Date();
    dateOutput.innerHTML = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    timeOutput.innerHTML = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}



function updateBackgroundImage(weather) {
    let backgroundImage;
    switch (weather.toLowerCase()) {
        case 'clear':
            backgroundImage = 'url(clear.jpg)';
            break;

        case 'broken clouds':
            backgroundImage - 'url(cloudy.jpg)';
            break;
          
        case 'overcast clouds':
            backgroundImage - 'url(partly-cloudy.jpg)';
            break;

        case 'haze':
            backgroundImage = 'url(cloudy.jpg)';
            break;

        case 'rain':
            backgroundImage = 'url(rain.jpg)';
            break;

        case 'thunderstorm':
            backgroundImage = 'url(thunderstorm.jpg)';
            break;
        
        case 'snow':
            backgroundImage = 'url(snow.jpg)';
            break;

        case 'fog':
            backgroundImage = 'url(fog.jpg)';
            break;

        case 'windy':
            backgroundImage = 'url(windy.jpg)';
            break;     

        case 'mist':
            backgroundImage = 'url(mist.jpg)';
            break;

        case 'night clear':
            backgroundImage = 'url(night-clear.jpg)';
            break;
            
        case 'night cloudy':
            backgroundImage = 'url(night-cloudy.jpg)';
            break;    
    }
    console.log(`Weather: ${weather}, Background Image: ${backgroundImage}`);
    app.style.backgroundImage = backgroundImage;
}


  


  
