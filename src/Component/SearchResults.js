import React from 'react';
import spinner from "../Assets/spinner.svg";

const SearchResults = ({ searchResults, addSong, loading, setShowResults }) => {
    return (
        <div className="absolute bg-white shadow-lg top-10 rounded-b-lg w-full">
            <div className="p-2 border border-gray-300 rounded-b-lg">
                {loading && <div className="flex items-center justify-center">
                    <img src={spinner} alt="Loading..." className="w-6 h-6" />
                    Aan het zoeken...
                </div>}

                {searchResults.length > 0 && !loading && <div className="divide-y divide-gray-300">
                    {searchResults.map((result) => (
                        <div className="p-2 hover:shadow-lg cursor-pointer" key={result.id} onClick={() => {
                            addSong(result);
                            setShowResults(false);
                        }}>
                            {result.artists.map((artist) => artist.name).join(', ')} - {result.name}
                        </div>
                    ))}
                </div>}

                {!loading && searchResults.length === 0 && <div>
                    Geen resultaten gevonden
                </div>}
            </div>
        </div>
    )
}

export default SearchResults;