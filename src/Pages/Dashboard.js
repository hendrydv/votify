import React, {useEffect} from 'react';
import {get, insert} from "../Service/FirebaseService";
import {ReactSortable} from "react-sortablejs";

function Dashboard() {
    const [topList, setTopList] = React.useState([]);

    useEffect(() => {
        get('toplist', (snapshot) => {
            console.log(snapshot);
            const toplist = snapshot.val();
            setTopList(toplist);
        });
    }, []);

    useEffect(() => {
        if (topList.length === 0) {
            return;
        }

        insert('toplist', topList);
    }, [topList]);

    return (
        <div>
            <h1 className="text-2xl">Dashboard</h1>

            <h2 className="text-xl">Top 100 songs</h2>
            <ReactSortable list={topList} setList={setTopList}>
                {topList.map((entry, index) => (
                    <div key={entry.song.id} className="hover:bg-gray-200 hover:cursor-move hover:text-gray-800 p-2">
                        {index + 1} - {entry.song.artists.map((artist) => artist.name).join(', ')} - {entry.song.name} - {entry.count}
                    </div>
                ))}
            </ReactSortable>
        </div>
    );
}

export default Dashboard;