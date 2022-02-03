import axios from 'axios';

export default class FilmsApi {
  #url;
  #apiKey;

  constructor() {
    this.#url = 'https://api.themoviedb.org/3/movie/';
    this.#apiKey = '0a0eacc01c98f8ef04ac7ca82867ea4e';
  }

  fetchMovieById(id) {
    return axios.get(`${this.#url}${id}?api_key=${this.#apiKey}`);
  }
}