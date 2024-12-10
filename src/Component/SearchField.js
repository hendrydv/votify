import React, { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import {searchSong} from "../Service/SearchService";
import SearchResults from "./SearchResults";

const Search = ({token, addSong, getToken}) => {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const searchRef = useRef(null);

    const handleSearch = (event) => {
        const query = event.target.value;
        setLoading(!!query);
        setSearchResults([]);
        setQuery(query);
    };

    useEffect(() => {
        const debouncedSearch = debounce((value) => {
            setDebouncedQuery(value);
        }, 500);
        debouncedSearch(query);
        return () => debouncedSearch.cancel();
    }, [query]);

    useEffect(() => {
        if (debouncedQuery) {
            searchSong(debouncedQuery, token).then((response) => {
                setSearchResults(response.data.tracks.items);
                setLoading(false);
            }).catch(() => {
                getToken();
                setLoading(false);
            });
        }
    }, [debouncedQuery, token, getToken]);

    useEffect(() => {
        document.addEventListener('click', (event) => {
            if (searchRef.current && searchRef.current.contains(event.target)) {
                return;
            }

            setShowResults(false);
        });
    }, []);

    const resultsShown = query !== '' && showResults;

    return (
        <div className="flex flex-col gap-2 mx-auto relative text-black w-full" ref={searchRef}>
            <input
                type="search"
                value={query}
                onChange={handleSearch}
                onClick={() => setShowResults(true)}
                placeholder="Zoek naar een nummer of artiest..."
                className={`${resultsShown ? 'border-b-0 outline-none rounded-b-none' : ''} border border-gray-300 rounded-lg p-2`}
            />

            {resultsShown && SearchResults({searchResults, addSong, loading, setShowResults})}
        </div>
    );
};

export default Search;
