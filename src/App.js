import { useState, useEffect } from "react";
import React from "react";

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=4ff77180';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchText, setSearchText] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Superman');
    }, []);

    return (
        <div className="app">
            <h1>MoviesApp</h1>

            <div className="search">
                <input
                    placeholder="Search Movies"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchText)}
                />
            </div>

            {
                movies?.length > 0 ? (
                    <div className="container">
                        {
                            movies.map((movie) => (
                                <MovieCard movie={movie}/>
                            ))
                        }
                    </div>
                ) :
                (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;