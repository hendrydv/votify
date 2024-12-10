import React, {useState, useRef} from 'react';
import {token} from "./Service/TokenService";
import SearchField from "./Component/SearchField";
import logo from './Assets/logo.png';
import SavedSongs from "./Component/SavedSongs";
import {ToastContainer} from "react-toastify";

function App() {
    const [accessToken, setAccessToken] = useState('');
    token().then((response) => {
        setAccessToken(response);
    });

    const savedSongsRef = useRef(null);

    const addSong = (song) => {
        savedSongsRef.current.addSong(song);
    }

    return (
        <div className="bg-neutral-800 text-white min-h-screen">
            <div className="max-w-screen-md mx-auto flex flex-col items-center text-center gap-4 p-8">
                <h1 className="text-4xl font-bold">Caravan top 100</h1>
                <img src={logo} alt="Caravan" className="w-1/2" />
                <div className="flex flex-col gap-6 w-full">
                    <SearchField token={accessToken} addSong={addSong} getToken={token} />
                    <SavedSongs ref={savedSongsRef} />
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default App;
