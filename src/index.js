
import './styles/reset.css';
import './styles/styles.css';
import './styles/scss.scss';
import getLocation from './js/geolocation';
import createCityByName from './js/createCityByName';

window.addEventListener('load', () => {
  getLocation();
  createCityByName();
});