export const postCity = async (cityName) => {
    const city = {
        city: cityName
    };
    
    await fetch(`http://localhost:3000/cities`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(city)
    })
};

export const getCities = async () => {
    try {
        const response = await fetch(`http://localhost:3000/cities`)
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(`ERROR MESSAGE: ${e}`);
    }
};