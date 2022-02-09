import axios from "axios";

const API_KEY = '0a0eacc01c98f8ef04ac7ca82867ea4e';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class Api {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

   

    // ----- Метод класса для запроса фильмов по ключевому слову -----
    async fetchSearchMovies() {
        const url = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            return data;

        } catch (error) {
            console.log(error);
        }
    };

      async fetchGenre() {
        const url = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;

        try {
            const data = await axios.get(url);
            const objects = data.data.genres;
            const genres = {};
            objects.forEach(({id, name}) => {
                genres[id] = name;
            });
        
            return genres;

        } catch (error) {
            console.log(error);
        }
    }



    decrementPage() {
        this.page -= 1;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}