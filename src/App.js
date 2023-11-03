import React, { useState, useEffect } from 'react';
import './App.css';
import MoviesList from './components/MoviesList';
import RemoveList from './components/RemoveList';


function App() {
  const [movie, setMovie] = useState([]);
  const [movieSearch, setMovieSearch] = useState("");
  const [favourites, setFavourites] = useState([]);

  const getMovie = async (movieSearch) => {
    const API_LINK = `https://www.omdbapi.com/?s=${movieSearch}&apikey=46d7117`;
    const resData = await fetch(API_LINK);
    const resJSON = await resData.json();

    if(resJSON.Search) {
      setMovie(resJSON.Search)
    }
  }

  useEffect(() => {
    getMovie(movieSearch);
  }, [movieSearch]);

  useEffect(() => {
    const movieFav = JSON.parse(
      localStorage.getItem("favourites-movies")
    );
    setFavourites(movieFav)
  }, [])

  const saveToLocalS = (items) => {
    localStorage.setItem('favourites-movies', JSON.stringify(items))
  };

  const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalS(newFavouriteList);
	};

  const removeMovie = (movie) => {
    const removeMovieList = favourites.filter(
      (remove) => remove.imdbID !== movie.imdbID
    )
    setFavourites(removeMovieList)
  }

  return (
    <div className="App">
      <input
        className="input-box"
        type="text"
        placeholder="Search Your Movie..."
        value={movieSearch}
        onChange={(e) => setMovieSearch(e.target.value)}
      />
      <MoviesList movie={movie} movieSearch={movieSearch}
      handleClicked={addFavouriteMovie}
      />

      <h1>Your Favourites</h1>
      <RemoveList movie={favourites} movieSearch={movieSearch}
      handleDelete={removeMovie}
      />
    </div>
  );
}

export default App;
