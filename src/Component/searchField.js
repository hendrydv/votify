import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import {searchSong} from "../Service/SpotifyService";

const Search = (token) => {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    const handleSearch = (event) => {
        setQuery(event.target.value);
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
                console.log(response);
            });
            console.log('Zoeken naar:', debouncedQuery); // Hier kun je je zoekactie uitvoeren
        }
    }, [debouncedQuery]);

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Zoek..."
            />
            <p>Debounced query: {debouncedQuery}</p>
        </div>
    );
};

export default Search;