
import './styles/reset.css';
import './styles/styles.css';
import './styles/scss.scss';
import getLocation from './js/geolocation';

window.addEventListener('load', () => {
  if (navigator.geolocation) {
    getLocation();
  }  
});