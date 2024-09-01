// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MoviesInTheatre from './pages/MoviesInTheatre';
import ComingSoon from './pages/ComingSoon';
import TopRatedIndian from './pages/TopRatedIndian';
import TopRatedMovies from './pages/TopRatedMovies';
import Favourites from './pages/Favourites';
import MovieDetails from './pages/MovieDetails';
import {
  fetchMoviesInTheatre,
  fetchComingSoonMovies,
  fetchTopRatedIndianMovies,
  fetchTopRatedMovies,
  searchMovies,
} from './services/tmdb';
import './App.css';
import Swal from 'sweetalert2';


const App = () => {
  const [favourites, setFavourites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [moviesInTheatre, setMoviesInTheatre] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [topRatedIndianMovies, setTopRatedIndianMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const storedFavourites = localStorage.getItem('favourites');
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inTheatre, comingSoon, topIndian, topRated] = await Promise.all([
          fetchMoviesInTheatre(),
          fetchComingSoonMovies(),
          fetchTopRatedIndianMovies(),
          fetchTopRatedMovies(),
        ]);

        setMoviesInTheatre(inTheatre.data.results);
        setComingSoonMovies(comingSoon.data.results);
        setTopRatedIndianMovies(topIndian.data.results);
        setTopRatedMovies(topRated.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      try {
        const response = await searchMovies(query);
        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleAddToFavourites = (movie) => {
    if (!favourites.some((fav) => fav.id === movie.id)) {
      const updatedFavourites = [...favourites, movie];
      setFavourites(updatedFavourites);
      Swal.fire("Added to favourites.");
    }
  };

  const handleRemoveFromFavourites = (id) => {
    const updatedFavourites = favourites.filter((movie) => movie.id !== id);
    setFavourites(updatedFavourites);
    Swal.fire("Removed from favourites.");
  };

  return (
    <Router>
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route
          path="/movies-in-theatre"
          element={
            <MoviesInTheatre
              movies={searchQuery ? searchResults : moviesInTheatre}
              favourites={favourites}
              onAddToFavourites={handleAddToFavourites}
              onRemoveFromFavourites={handleRemoveFromFavourites}
            />
          }
        />
        <Route
          path="/coming-soon"
          element={
            <ComingSoon
              movies={searchQuery ? searchResults : comingSoonMovies}
              favourites={favourites}
              onAddToFavourites={handleAddToFavourites}
              onRemoveFromFavourites={handleRemoveFromFavourites}
            />
          }
        />
        <Route
          path="/top-rated-indian"
          element={
            <TopRatedIndian
              movies={searchQuery ? searchResults : topRatedIndianMovies}
              favourites={favourites}
              onAddToFavourites={handleAddToFavourites}
              onRemoveFromFavourites={handleRemoveFromFavourites}
            />
          }
        />
        <Route
          path="/top-rated-movies"
          element={
            <TopRatedMovies
              movies={searchQuery ? searchResults : topRatedMovies}
              favourites={favourites}
              onAddToFavourites={handleAddToFavourites}
              onRemoveFromFavourites={handleRemoveFromFavourites}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <Favourites
              favourites={favourites}
              onRemoveFromFavourites={handleRemoveFromFavourites}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />
      </Routes>
      {searchQuery && !searchResults.length && <p>No movies found.</p>}
    </Router>
  );
};

export default App;
