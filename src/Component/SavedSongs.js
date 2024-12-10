import {useState, forwardRef, useImperativeHandle, useEffect} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {get, insert} from "../Service/FirebaseService";
import {signature} from "../Service/UserService";
import TrashSVG from "../Assets/trashSVG";

export const MAX_SAVED_SONGS = 10;

const SavedSongs = forwardRef((props, ref) => {
    const [savedSongs, setSavedSongs] = useState([]);

    const message = (message) => toast(message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
    });

    useEffect(() => {
        get(`songs/${signature}`, (snapshot) => {
            console.log(snapshot.val(), signature);
            if (snapshot.exists()) {
                setSavedSongs(snapshot.val());
            }
        });
    }, []);

    useImperativeHandle(ref, () => ({
        addSong(song) {
            addSong(song);
        },
    }));

    const addSong = (song) => {
        if (savedSongs.length >= MAX_SAVED_SONGS) {

            message('Je hebt al 10 nummers gekozen, verstuur je lijst of pas aan.');
            return;
        }

        const songExists = savedSongs.find((savedSong) => savedSong.id === song.id);

        if (songExists) {
            message('Je heb dit nummer al gekozen, kies een ander nummer.');
            return;
        }

        setSavedSongs([...savedSongs, song]);
    };

    const removeSong = (song) => {
        setSavedSongs(savedSongs.filter((savedSong) => savedSong.id !== song.id));
    }

    const sendList = () => {
        insert(`songs/${signature}`, savedSongs).then(() => {
            message('Je lijst is succesvol verstuurd, bedankt voor het stemmen! Je kan je lijst nog aanpassen door opnieuw te versturen.');
        });
    }

    return (
        <div className="w-full">
            <h3 className="text-xl font-bold mb-2">Opgeslagen nummers:</h3>

            <table className="table-fixed w-full text-left">
                <thead className="bg-neutral-600 text-gray-200">
                <tr>
                    <th className="w-10"></th>
                    <th>Artiest</th>
                    <th>Nummer</th>
                    <th className="w-10"></th>
                </tr>
                </thead>
                <tbody className="">
                    {savedSongs.map((song, idx) => (
                        <tr key={song.id} className="border-b border-gray-500">
                            <td>{idx + 1}</td>
                            <td>{song.artists.map((artist) => artist.name).join(', ')}</td>
                            <td>{song.name}</td>
                            <td><span className="cursor-pointer flex justify-end" onClick={() => removeSong(song)}>
                                <TrashSVG color="#dc2626" size="25px" />
                            </span></td>
                        </tr>
                    ))}
                    {[...Array(MAX_SAVED_SONGS - savedSongs.length)].map((_, idx) => (
                        <tr key={idx} className="border-b border-gray-500">
                            <td>{idx + savedSongs.length + 1}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {savedSongs.length > 0 && <button className="bg-red-700 text-white px-4 py-2 mt-4 rounded-lg" onClick={sendList}>
                Verstuur je lijst
            </button>}

            <p className="text-sm text-gray-400 mt-2">
                Je kunt maximaal {MAX_SAVED_SONGS} nummers kiezen. De lijst kan achteraf aangepast worden.
            </p>
        </div>
    );
});


export default SavedSongs;