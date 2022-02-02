import axios from 'axios';
import filmCard from '../templates/film-card.hbs';

const refs = {
  libraryList: document.querySelector('.library__list'),
  watchedBtn: document.querySelector('.button-list > .button--orange'),
  queueBtn: document.querySelector('.button-list > .button--transparent'),
};

class FilmsApi {
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

class Storage {
  constructor() {}

  getWatchedFilmsIds() {
    try {
      return localStorage.getItem('filmsIds') === null
        ? []
        : JSON.parse(localStorage.getItem('filmsIds')).watchedFilmsIds;
    } catch {}
  }

  getqueueFilmsIds() {
    try {
      return localStorage.getItem('filmsIds') === null
        ? []
        : JSON.parse(localStorage.getItem('filmsIds')).queueFilmsIds;
    } catch {}
  }
}

const filmApi = new FilmsApi();
const storage = new Storage();

console.log(filmApi.fetchMovieById(774825).then(r => {console.log(r.data)}));

function filmCardsMarcupCreate(data) {
  return data.map(item => filmCard(item.data)).join('');
}

function renderFilmsCards(markup) {
  refs.libraryList.insertAdjacentHTML('beforeend', markup);
}

function clearContainerMarkup(containerRef) {
  containerRef.innerHTML = '';
}

function onWatchBtnClick() {
  Promise.all(
    storage.getWatchedFilmsIds().map(filmId => {
      return filmApi.fetchMovieById(filmId);
    }),
  )
    .then(data => {
      clearContainerMarkup(refs.libraryList);
      return filmCardsMarcupCreate(data);
    })
    .then(markup => {
      renderFilmsCards(markup);
    })
    .catch(error => console.error(error));
}

function onQueueBtnClick() {
  Promise.all(
    storage.getqueueFilmsIds().map(filmId => {
      return filmApi.fetchMovieById(filmId);
    }),
  )
    .then(data => {
      clearContainerMarkup(refs.libraryList);
      return filmCardsMarcupCreate(data);
    })
    .then(markup => {
      renderFilmsCards(markup);
    })
    .catch(error => console.error(error));
}

function start() {
  refs.watchedBtn.addEventListener('click', onWatchBtnClick);
  refs.queueBtn.addEventListener('click', onQueueBtnClick);
  window.addEventListener('load', onWatchBtnClick);
}

start();

// //******************************
// function fetchMovieById(id) {
//   const url = `https://api.themoviedb.org/3/movie/${id}`;
//   const parmams = {
//     api_key: '0a0eacc01c98f8ef04ac7ca82867ea4e',
//   };
//   return axios.get(`${url}?api_key=${parmams.api_key}`);
// }

// function getWatchedFilmsIds() {
//   try {
//     return localStorage.getItem('filmsIds') === null ? [] : JSON.parse(filmIds).watchedFilmsIds;
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// function getqueueFilmsIds() {
//   try {
//     return localStorage.getItem('filmsIds') === null ? [] : JSON.parse(filmIds).queueFilmsIds;
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// function renderFilmsCards(data) {
//   const markup = data
//     .map(item => {
//       return filmCard(item.data);
//     })
//     .join('');

//   refs.libraryList.innerHTML = '';
//   refs.libraryList.insertAdjacentHTML('beforeend', markup);
// }

