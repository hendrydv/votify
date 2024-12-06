import axios from "axios";

export const searchSong = (query, token) => {
    console.log('searchSong', query, token);
    return axios.get(`https://api.spotify.com/v1/search`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        json: true,
        params: {
            q: query,
            type: 'track'
        }
    });
};