// import { fetchMovieById } from './api';
import axios from 'axios';
import filmCard from '../templates/film-card.hbs';

// const filmsIds = {
//   watchedFilmsIds: [634649, 522016],
//   queueFilmsIds: [597891],
// };
// localStorage.setItem("filmsIds", JSON.stringify(filmsIds))

const refs = {
  libraryList: document.querySelector('.library__list'),
  watchedBtn: document.querySelector('.button-list > .button--orange'),
  queueBtn: document.querySelector('.button-list > .button--transparent'),
};

function getWatchedFilmsIds() {
  return JSON.parse(localStorage.getItem('filmsIds')).watchedFilmsIds;
}

function getqueueFilmsIds() {
  return JSON.parse(localStorage.getItem('filmsIds')).queueFilmsIds;
}

function fetchMovieById(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const parmams = {
    api_key: '0a0eacc01c98f8ef04ac7ca82867ea4e',
  };

  return axios.get(`${url}?api_key=${parmams.api_key}`);
}

function renderFilmsCards(data) {
  const markup = data
    .map(item => {
      return filmCard(item.data);
    })
    .join('');

  refs.libraryList.innerHTML = '';
  refs.libraryList.insertAdjacentHTML('beforeend', markup);
}

function onWatchBtnClick() {
  const watchedFilmsIds = getWatchedFilmsIds();
  Promise.all(
    watchedFilmsIds.map(filmId => {
      return fetchMovieById(filmId);
    }),
  ).then(renderFilmsCards);
}

function onQueueBtnClick() {
  const queueFilmsIds = getqueueFilmsIds();
  Promise.all(
    queueFilmsIds.map(filmId => {
      return fetchMovieById(filmId);
    }),
  ).then(renderFilmsCards);
}

function start() {
  refs.watchedBtn.addEventListener('click', onWatchBtnClick);
  refs.queueBtn.addEventListener('click', onQueueBtnClick);
  window.addEventListener('load', onQueueBtnClick)
}

start();
