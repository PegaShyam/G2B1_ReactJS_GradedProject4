import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, onAddToFavourites, onRemoveFromFavourites, isFavourite }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to the movie details page using the movie's ID
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        onClick={handleCardClick} // Navigate to the movie details on click
        style={{ cursor: 'pointer' }}
      />
      <h3>{movie.title}</h3>
      {!isFavourite ? (
        <button onClick={() => onAddToFavourites(movie)}>🤍Add to Favourites</button>
      ) : (
        <button onClick={() => onRemoveFromFavourites(movie.id)}>Remove from Favourites</button>
      )}
    </div>
  );
};

export default MovieCard;
