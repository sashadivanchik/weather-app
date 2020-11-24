import { deleteCity, getCities, postCity } from "../api/api";
import { src } from "../utils/getIconSrc";
import { weekdayName } from "../utils/getWeekdayName";

const { gettingWeatherByCityName } = require("./getWeather");

const searchInput = document.querySelector('.js-search-input');
const searchButton = document.querySelector('.js-search-button');
const currentCityContainer = document.querySelector('.js-cities');
const citiesList = document.createElement('div');

const time = '18:00:00';

const weather = (weather, id) => {
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
                        <div class="current-city__visibility">Visibility ${weather.visibility / 1000} km</div>
                        <div class="current-city__humidity">Humidity ${weather.main.humidity} %</div>
                    </div>
                    <button class="current-city__delete-button" data-button-id=${id}>delete</button>
                    `
    return result;
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

const createList = (list) => {
    citiesList.innerHTML = '';

    for (let i = 0; i < list.length; i++) {
        const city = document.createElement('div');
        const weekly =  document.createElement('div');
        city.className = 'current-city__container'
        weekly.className = 'current-city__weekly'
        weekly.innerHTML = forecast(list[i].forecast)
        city.innerHTML = weather(list[i].weather, list[i].id)
        city.append(weekly);
        citiesList.append(city);
    };
    
    currentCityContainer.append(citiesList)
};

const createCitiesList = (list) => { 

    if (list.length) {
        const types = ['weather', 'forecast'];

        const cities = list.map((item) => {
            return gettingWeatherByCityName(item.city, types, item.id);
        });
    
        Promise.all(cities).then(data => createList(data)); 
    }
    
    citiesList.innerHTML = '';  
};

citiesList.addEventListener('click', (event) => {
    const target = event.target;

    if (target.className === 'current-city__delete-button') {
        console.log(target.dataset.buttonId);
        deleteCity(target.dataset.buttonId).then(citiesList => createCitiesList(citiesList))
    }
})

const createCityByName = () => {
    getCities().then(citiesList => createCitiesList(citiesList))

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (searchInput.value === '') {
            return;
        } 
        postCity(searchInput.value).then(() => {
            getCities().then(citiesList => createCitiesList(citiesList))
        })
        searchInput.value = '' 
    });
};

export default createCityByName;
