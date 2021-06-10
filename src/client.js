const API_URL = 'https://ron-swanson-quotes.herokuapp.com/v2';

const get = async (route) => {
return await fetch(`${API_URL}/${route}`).then(async (response) => {
    try {
        if (response.ok) {
            return await response.json();
        }
        throw response;
    } catch (error) {
        throw error;
    }
    })
    .catch((error) => console.log(error));
}

export default get;