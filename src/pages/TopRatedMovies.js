import React from 'react';
import MovieCard from '../components/MovieCard';

const TopRatedMovies = ({ movies, favourites, onAddToFavourites, onRemoveFromFavourites }) => {
  return (
    <div className="movies-container">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAddToFavourites={onAddToFavourites}
            onRemoveFromFavourites={onRemoveFromFavourites}
            isFavourite={favourites.some((fav) => fav.id === movie.id)}
          />
        ))
      ) : (
        <p>No top-rated movies found.</p>
      )}
    </div>
  );
};

export default TopRatedMovies;
