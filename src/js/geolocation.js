import { getWeather } from "./getWeather";

const findMe = (position) =>  {
  const {latitude, longitude} = position.coords;
  getWeather(latitude, longitude)
  console.log(latitude, longitude)
};

const error = (e) => {
  console.log(`Произошла ошибка: ${e}`);
};

const getLocation = () => {
  if (navigator.geolocation) {
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })
      .then((position) => findMe(position))
      .catch((e) => error(e));
  }
  console.log('Geolocation не поддерживается вашим браузером');
};

export default getLocation;
