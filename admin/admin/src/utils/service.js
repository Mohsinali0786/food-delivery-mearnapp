export const baseUrl = "https://food-delivery-b-mearnapp.vercel.app/api";
import axios from "axios";
export const getRequest = async (url) => {
    // const baseUrl = "http://localhost:5001/api"

    let fullUrl = baseUrl + url
    const response = await axios.get(fullUrl)
        .then(response => {
            console.log(response);

            if (response.data)
                return response.data;
            // }
        })
        .catch(error => {
            console.error('Error fetching data', error);
        });

    return response;
}
export const patchRequest = async (url, body) => {
    let fullUrl = baseUrl + url
    console.log(body,'bbbbbbbb')
    const response = await axios.patch(fullUrl, body)
        .then(response => {
            console.log(response, 'response');

            if (response.data)
                return response.data;
            // }
        })
        .catch(error => {
            console.error('Error fetching data', error);
        });

    return response;
}