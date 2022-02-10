import axios from 'axios';
import { startPreloader, stopPreloader } from './preloader';
// Поиск фильма по номеру id.
export async function fetchMovieById(id) {
  startPreloader();
  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const parmams = {
    api_key: '0a0eacc01c98f8ef04ac7ca82867ea4e',
  };
  const response = await axios.get(`${url}?api_key=${parmams.api_key}`);
  stopPreloader();
  return response.data;
}

// Возвращает список популярных фильмов
export async function fetchMovies(page) {
  startPreloader();
  const url = 'https://api.themoviedb.org/3/trending/movie/day';
  const parmams = {
    api_key: '0a0eacc01c98f8ef04ac7ca82867ea4e',
    total_results: 100,
    page,
  };
  const meta = new URLSearchParams(parmams);
  const response = await axios.get(`${url}?${meta}`);
  //console.log(response.data);
  //console.log(parmams.page);
  stopPreloader();
  return response.data;
}
