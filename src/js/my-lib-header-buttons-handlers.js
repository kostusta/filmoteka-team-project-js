import axios from 'axios';
import filmCard from '../templates/film-card-my-library.hbs';
import emptyLs from '../templates/my-library-empty-ls.hbs';
import { addEventListeners } from './film-modal';

const refs = {
  libraryList: document.querySelector('.library__list'),
  watchedBtn: document.querySelector('.button-list > .button--orange'),
  queueBtn: document.querySelector('.button-list > .button--transparent'),
  libraryContainer: document.querySelector('.library__container'),
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

// console.log(
//   filmApi.fetchMovieById(774825).then(r => {
//     console.dir(r);
//   }),
// );

function filmCardsMarkupCreate(data) {
  return data.map(item => filmCard(item.data)).join('');
}

function renderMarkup(element, markup) {
  element.insertAdjacentHTML('beforeend', markup);
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
      if (data.length === 0) {
        clearContainerMarkup(refs.libraryContainer);
        const markup = emptyLs();
        renderMarkup(refs.libraryContainer, markup);
      }
      return data;
    })
    .then(data => {
      clearContainerMarkup(refs.libraryList);
      return filmCardsMarkupCreate(data);
    })
    .then(markup => {
      renderMarkup(refs.libraryList, markup);
    })
    .catch();
}

function onQueueBtnClick() {
  Promise.all(
    storage.getqueueFilmsIds().map(filmId => {
      return filmApi.fetchMovieById(filmId);
    }),
  )
    .then(data => {
      if (data.length === 0) {
        clearContainerMarkup(refs.libraryContainer);
        const markup = emptyLs();
        renderMarkup(refs.libraryContainer, markup);
      }
      return data;
    })
    .then(data => {
      clearContainerMarkup(refs.libraryList);
      return filmCardsMarkupCreate(data);
    })
    .then(markup => {
      renderMarkup(refs.libraryList, markup);
    })
    .catch();
}

function start() {
  refs.watchedBtn.addEventListener('click', onWatchBtnClick);
  refs.queueBtn.addEventListener('click', onQueueBtnClick);
  window.addEventListener('load', onWatchBtnClick);
}

start();

addEventListeners()

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
