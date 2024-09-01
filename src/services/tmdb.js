import axios from 'axios';

const API_KEY = 'a76a5083cc5d48e2af8ccd94181a352a';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchMoviesInTheatre = () =>
  tmdb.get('/movie/now_playing');

export const fetchComingSoonMovies = () =>
  tmdb.get('/movie/upcoming');

export const fetchTopRatedIndianMovies = () =>
  tmdb.get('/discover/movie', {
    params: {
      with_original_language: 'hi',
      sort_by: 'vote_average.desc',
    },
  });

export const fetchTopRatedMovies = () =>
  tmdb.get('/movie/top_rated');

export const searchMovies = (query) =>
  tmdb.get('/search/movie', {
    params: { query },
  });
