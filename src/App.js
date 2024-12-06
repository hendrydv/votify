import React, {useState} from 'react';
import {token} from "./Service/TokenService";
import SearchField from "./Component/searchField";

function App() {
    const [accessToken, setAccessToken] = useState('');
    token().then((response) => {
        setAccessToken(response);
    });

    return (
    <div className="App">
        <h1>Spotify API</h1>
        <span>Access token: {accessToken}</span>
        <SearchField token={accessToken} />
    </div>
    );
}

export default App;
