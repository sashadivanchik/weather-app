const { gettingWeatherByCityName } = require("./getWeather");

const searchInput = document.querySelector('.js-search-input');
const searchButton = document.querySelector('.js-search-button');
const cities = document.querySelector('.js-current-city');

const createCityByName = () => {
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (searchInput.value === '') {
            return;
        }
        console.log('click')
        gettingWeatherByCityName(searchInput.value, 'weather');
        gettingWeatherByCityName(searchInput.value, 'forecast');
        searchInput.value === ''   
    });
};

export default createCityByName;
