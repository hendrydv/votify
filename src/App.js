import React, {useState, useRef, useEffect} from 'react';
import {token} from "./Service/TokenService";
import SearchField from "./Component/SearchField";
import logo from './Assets/cover.png';
import SavedSongs from "./Component/SavedSongs";
import {ToastContainer} from "react-toastify";
import InstagramSVG from "./Assets/instagramSVG";
import FacebookSVG from "./Assets/facebookSVG";
import { detectIncognito } from "detectincognitojs";

function App() {
    useEffect(() => {
        detectIncognito().then((result) => {
            if (result.isPrivate) {
                alert("Incognito mode detected. Please disable incognito mode to use this application.");
                window.location.href = "https://www.facebook.com/carbidploegfeankleaster";
            }
        });
    }, []);

    const [accessToken, setAccessToken] = useState('');
    token().then((response) => {
        setAccessToken(response);
    });

    const savedSongsRef = useRef(null);

    const addSong = (song) => {
        savedSongsRef.current.addSong(song);
    }

    return (
        <div className="max-w-screen-md mx-auto flex flex-col items-center text-center gap-4 p-8">
            <div className="flex justify-around">
                <img src={logo} alt="Caravan" className="w-1/2" />
                <div className="flex flex-col gap-2 justify-around items-center w-1/6">
                    <a href="https://www.instagram.com/caravankz.nl/" target="_blank" rel="noreferrer">
                        <InstagramSVG color="white" size="100%"/>
                    </a>
                    <a href="https://www.facebook.com/carbidploegfeankleaster" target="_blank" rel="noreferrer">
                        <FacebookSVG color="white" size="100%"/>
                    </a>
                </div>
            </div>
            <div className="flex flex-col gap-6 w-full">
                <SearchField token={accessToken} addSong={addSong} getToken={token} />
                <SavedSongs ref={savedSongsRef} />
            </div>
            <ToastContainer />
        </div>
    );
}

export default App;
