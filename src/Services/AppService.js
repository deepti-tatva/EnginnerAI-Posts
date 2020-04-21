import axios from 'axios';

export const getApiData = (url, urlData) => {

    return new Promise(async (resolve, reject) => {
        try {
            const response = axios.get(url, { params: urlData });
            return resolve(response);
        }
        catch (err) {
            return reject(err);
        }
    }
    )
}