import React, {useEffect} from 'react';
import {get} from "../Service/FirebaseService";

function Dashboard() {
    // songs = [userId: [song]]
    const [songs, setSongs] = React.useState([]);
    const [topList, setTopList] = React.useState([]);

    const createTopList = () => {
        // songs = [userId: [song]]
        const songList = Object.values(songs);
        const songCount = {};

        songList.forEach((userSongs) => {
            userSongs.forEach((song) => {
                if (songCount[song.id]) {
                    songCount[song.id] += 1;
                    return;
                }

                songCount[song.id] = 1;
            });
        });

        if (songCount.length === 0) {
            return [];
        }

        let topList = Object.entries(songCount).sort((a, b) => b[1] - a[1]);

        // topList = topList.splice(0, 100);

        if (topList.length === 0) {
            return [];
        }

        // add song data to topList
        topList = topList.map((entry) => {
            const songId = entry[0];
            const count = entry[1];
            const song = Object.values(songs).flat().find((s) => s.id === songId);

            return {
                song,
                count
            };
        });

        if (topList[0] === undefined) {
            return [];
        }

        setTopList(topList);
        console.log(topList);
    }

    useEffect(() => {
        get('songs', (snapshot) => {
            const songs = snapshot.val();
            setSongs(songs);
        });
    }, []);

    useEffect(() => {
        createTopList();
        console.log(topList);
    }, [songs]);

    return (
        <div>
            <h1 className="text-2xl">Dashboard</h1>
            <h2 className={"text-xl"}>Total votes: {Object.values(songs).length}</h2>

            <h2 className="text-xl">Top 10 songs</h2>
            <ul>
                {topList.map((entry, index) => (
                    <li key={entry.song.id}>
                        {index + 1} - {entry.song.artists.map((artist) => artist.name).join(', ')} - {entry.song.name} - {entry.count}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;