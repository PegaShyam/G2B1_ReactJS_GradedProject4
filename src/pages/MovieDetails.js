import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = 'a76a5083cc5d48e2af8ccd94181a352a'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
          },
        });
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="movie-details">
      <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
        <p><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(', ')}</p>
        {/* Additional movie details can be displayed here */}
      </div>
    </div>
  );
};

export default MovieDetails;
