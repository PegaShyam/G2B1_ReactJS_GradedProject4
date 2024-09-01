import React from 'react';
import MovieCard from '../components/MovieCard';

const Favourites = ({ favourites, onRemoveFromFavourites }) => {
  return (
    <div className="movies-container">
      {favourites.length > 0 ? (
        favourites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onRemoveFromFavourites={onRemoveFromFavourites}
            isFavourite={true}
          />
        ))
      ) : (
        <p>No favourites added yet.</p>
      )}
    </div>
  );
};

export default Favourites;
