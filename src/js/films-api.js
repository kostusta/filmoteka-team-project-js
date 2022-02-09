import axios from 'axios';

export default class FilmsApi {
  #url;
  #apiKey;
  #genresListUrl;

  constructor() {
    this.#url = 'https://api.themoviedb.org/3/movie/';
    this.#genresListUrl = 'https://api.themoviedb.org/3/genre/movie/list'
    this.#apiKey = '0a0eacc01c98f8ef04ac7ca82867ea4e';
  }

  fetchMovieById(id) {
    return axios.get(`${this.#url}${id}?api_key=${this.#apiKey}`);
  }

  async fetchGenresList() {
    const responce = await axios.get(`${this.#genresListUrl}?api_key=${this.#apiKey}`)
    const genresList = await responce.data.genres
    return genresList
  }
}