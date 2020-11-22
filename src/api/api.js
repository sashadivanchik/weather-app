export const postCity = async (cityName) => { 
    const city = {
        city: cityName
    };
    
    await fetch(`http://localhost:3000/api/addCity`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(city)
    })
};

export const getCities = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/cities`)
        return await response.json();
    } catch (e) {
        console.error(`ERROR MESSAGE: ${e}`);
    }
};