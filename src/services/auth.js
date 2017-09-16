import { API_ENDPOINT } from 'src/constants';
import rp from 'request-promise';


export const authenticate = token => {
    let options = {
        uri: `${API_ENDPOINT}/auth/authenticate`,
        method: 'POST',
        body: {
            token: token || ''
        },
        json: true
    };

    return rp(options);
};

export const signin = (username, password) => {
    let options = {
        uri: `${API_ENDPOINT}/auth/signin`,
        method: 'POST',
        body: {
            username,
            password
        },
        json: true
    };

    return rp(options);
};