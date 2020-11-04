export const getWeather = (latitude, longitude) => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=bdac2775cb8c6d58f608195af81c6184`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        });
};