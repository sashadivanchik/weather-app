const fetchData = (latitude, longitude) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=bdac2775cb8c6d58f608195af81c6184`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
};

const findMe = (position) =>  {
  const {latitude, longitude} = position.coords;
  fetchData(latitude, longitude)
  console.log(latitude, longitude)
};

const error = (e) => {
  console.log(`Произошла ошибка: ${e}`);
};

const getLocation = () => {
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
    .then((position) => findMe(position))
    .catch((e) => error(e));
};

export default getLocation;
