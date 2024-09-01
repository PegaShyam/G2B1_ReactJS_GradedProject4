import React from 'react';
import MovieCard from '../components/MovieCard';

const MoviesInTheatre = ({ movies, favourites, onAddToFavourites, onRemoveFromFavourites }) => {
  return (
    <div className="movies-container">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onAddToFavourites={onAddToFavourites}
          onRemoveFromFavourites={onRemoveFromFavourites}
          isFavourite={favourites.some((fav) => fav.id === movie.id)}
        />
      ))}
    </div>
  );
};

export default MoviesInTheatre;
