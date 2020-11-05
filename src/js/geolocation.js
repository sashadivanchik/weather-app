import { createCityByCoordinates } from "./createCityByCoordinates";

const error = (e) => {
  console.log(`Произошла ошибка: ${e}`);
};

const getLocation = () => {
  if (!navigator.geolocation) {
    console.log('Geolocation не поддерживается вашим браузером');
  } else {
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })
      .then((position) => createCityByCoordinates(position))
      .catch((e) => error(e));
  }
};

export default getLocation;
