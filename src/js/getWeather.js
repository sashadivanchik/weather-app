export const gettingWeatherByCoordinates = async (latitude, longitude, type) => {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/${type}?lat=${latitude}&lon=${longitude}&units=metric&appid=bdac2775cb8c6d58f608195af81c6184`)
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(`ERROR MESSAGE: ${e}`);
    }

};

export const gettingWeatherByCityName = async (cityName, type) => {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/${type}?q=${cityName}&units=metric&appid=bdac2775cb8c6d58f608195af81c6184`)
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(`ERROR MESSAGE: ${e}`);
    }
};

export const getWeatherByCoords = (latitude, longitude, types) => {
    let requests = types.map((type) => {
        return fetch(`http://api.openweathermap.org/data/2.5/${type}?lat=${latitude}&lon=${longitude}&units=metric&appid=bdac2775cb8c6d58f608195af81c6184`)
    });

    return Promise.all(requests)
            .then(responses => responses)
            .then(responses => Promise.all(responses.map(res => {
                try {
                    const parseRes = res.json();
                    return parseRes;
                } catch(error) {
                    console.error(error)
                }
            })))
}
