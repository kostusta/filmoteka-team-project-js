import axios from 'axios';
// Поиск фильма по номеру id.
export async function fetchMovieById(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const parmams = {
    api_key: '0a0eacc01c98f8ef04ac7ca82867ea4e',
  };
  const response = await axios.get(`${url}?api_key=${parmams.api_key}`);
  return response.data;
}

// Возвращает список популярных фильмов
export async function fetchMovies(page) {
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
  return response.data;
}
export default class API {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }
  async fetchMovieSearchQuery() {
    const options = {
      api_key: '0a0eacc01c98f8ef04ac7ca82867ea4e',
    };
    try {
      const response = await axios.get(
        `/search/movie?api_key=${options.api_key}&query=${this.searchQuery}&page=${this.page}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
   setQuery(newQuery) {
    this.searchQuery = newQuery;
  }
  setPage(newPage) {
    this.page = newPage;
  }
  resetPage() {
    this.page = 1;
  }
}