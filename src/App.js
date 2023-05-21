import { useState, useEffect } from "react";
import React from "react";

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=******';

const App = () => {

    // useState is used to initialize value and helpful for setting updated values after some event happens
    // Helpful for state management like hook
    const [movies, setMovies] = useState([]);
    const [searchText, setSearchText] = useState('');

    // Async search movies api call function
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    // Initially calls movies api once with Superman as input when page loads
    // @param1 => function call to search movies
    // @param2 => dependency array is empty as it will be called only once at the start
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
                    onChange={( e ) => setSearchText(e.target.value)}
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