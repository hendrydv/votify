import {Buffer} from "buffer";
import axios from "axios";

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const data = {
    headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
    },
    params: {
        grant_type: 'client_credentials'
    },
};

const getAccessToken = async () => {
    axios.post('https://accounts.spotify.com/api/token', null, data).then((response) => {
        const accessToken = response.data.access_token;
        const expiresIn = 5 * 60 * 1000;
        const expiryTime = Date.now() + expiresIn;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('expiryTime', expiryTime.toString());
        window.location.reload();
    });
}

export const token = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const expiryTime = localStorage.getItem('expiryTime');

    if (accessToken && expiryTime && Date.now() < expiryTime) {
        return accessToken;
    }

    await getAccessToken();

    return localStorage.getItem('accessToken');
};