import { gettingWeatherByCoordinates } from "./getWeather";

const time = '18:00:00';
const userLocationCity = document.querySelector('.js-current-city');

const container = document.createElement('div');
container.className = 'current-city__container';

const list = document.createElement('ul');
list.className = 'current-city__weekly'

const weekdayName = (date, lang) => {
    const ms = date * 1000;
    return new Date(ms).toLocaleString(lang, {weekday: 'long'});
};

const weeklyDay = (day) => {   
    return `<div class="current-city__day-info">
                <div class="current-city__weekday">${weekdayName(day.dt)}</div>
                <img class="current-city__weekday-icon" src=http://openweathermap.org/img/wn/${day.weather[0].icon}.png alt="icon">
                <div class="current-city__day-temp">${day.main.temp.toFixed(0)}&deg C</div>
                <div class="current-city__day-main">${day.weather[0].description}</div>
            </div>`
};

const weather = (weather) => {
    const result = `<div class="current-city__location-info">
                    <div class="current-city__city">${weather.name}, </div>
                    <div class="current-city__country">${weather.sys.country}</div>
                    <div class="current-city__date">${new Date().toLocaleTimeString()}</div>
                    <div class="current-city__curent-day">${weekdayName(weather.dt)}</div>
                </div>
                <div class="current-city__current-temp">
                    <div class="current-city__temp">${weather.main.temp.toFixed(0)}&deg C</div>
                    <div class="current-city__main">${weather.weather[0].description}</div>
                </div>
                <div class="current-city__main-info">
                    <div class="current-city__feels-like">Feels like ${weather.main.feels_like.toFixed(0)}&deg</div>
                    <div class="current-city__wind">Wind ${weather.wind.deg} ${weather.wind.speed} km/h</div>
                    <div class="current-city__pressure">Barometer ${weather.main.pressure} mb</div>
                    <div class="current-city__visibility">Visibility ${weather.visibility/1000} km</div>
                    <div class="current-city__humidity">Humidity ${weather.main.humidity} %</div>
                </div>`

    container.insertAdjacentHTML("afterbegin", result)
};

const forecast = (forecast) => {
    const weekly = forecast.list.filter(reading => reading.dt_txt.includes(time));

    for (let i = 1; i < weekly.length; i++) {
        const item = document.createElement('li');
        item.className = 'current-city__item'
        item.innerHTML = weeklyDay(weekly[i]);
        list.append(item)
    };
};

container.append(list);
userLocationCity.append(container);

export const createCityByCoordinates = (position) => {
    const { latitude, longitude } = position.coords;

    gettingWeatherByCoordinates(latitude, longitude, 'weather')
        .then(weatherData => weather(weatherData))

    gettingWeatherByCoordinates(latitude, longitude, 'forecast')
        .then(forecastData => forecast(forecastData))
};
