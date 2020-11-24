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

export const deleteCity = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/deleteCity/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        })
        return await response.json();
    } catch (e) {
        console.error(`ERROR MESSAGE: ${e}`);
    }
};