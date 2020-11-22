import { getDate } from "../utils/getDate";
import { src } from "../utils/getIconSrc";
import { weekdayName } from "../utils/getWeekdayName";
import { getWeatherByCoords } from "./getWeather";

const userLocationCity = document.querySelector('.js-current-city');
const time = '18:00:00';

const weather = (weather) => {
    return `<div class="current-city__location-info">
                <div class="current-city__city">${weather.name}, </div>
                <div class="current-city__country">${weather.sys.country}</div>
                <div class="current-city__date">${getDate()}</div>
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
};

const forecast = (forecast) => {
    const day = (day) => {   
        return `<div class="current-city__day-info">
                    <div class="current-city__weekday">${weekdayName(day.dt)}</div>
                    <img class="current-city__weekday-icon" src=${src(day.weather[0].icon)} alt="icon">
                    <div class="current-city__day-temp">${day.main.temp.toFixed(0)}&deg C</div>
                    <div class="current-city__day-main">${day.weather[0].description}</div>
                </div>`
    };

    const weekly = forecast.list.filter(reading => reading.dt_txt.includes(time));

    let result = '';

    for (let i = 0; i <= weekly.length - 1; i += 1) {
        result += day(weekly[i])
    };

    return result;
};

const cityContainer = (data, container) => {
    const result = `<div class="current-city__container">
                        ${weather(data.weather)}
                        <div class="current-city__weekly">${forecast(data.forecast)}</div>
                    </div>`;

    container.insertAdjacentHTML('afterbegin', result)
};

export const createCityByCoordinates = (position) => {
    const { latitude, longitude } = position.coords;

    const types = ['weather', 'forecast']

    getWeatherByCoords(latitude, longitude, types).then(weather => cityContainer(weather, userLocationCity));
};
