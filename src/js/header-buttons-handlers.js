import { refs } from './common-references';
import filmCard from '../templates/film-card-my-library.hbs';
import emptyLs from '../templates/my-library-empty-ls.hbs';

import FilmsApi from './films-api';
import LocalStorage from './local-storage-api';

const filmApi = new FilmsApi();
const storage = new LocalStorage();

export function filmCardsMarkupCreate(data) {
  return data.map(item => filmCard(item.data)).join('');
}

export function renderMarkup(element, markup) {
  element.insertAdjacentHTML('beforeend', markup);
}

export function clearContainerMarkup(containerRef) {
  containerRef.innerHTML = '';
}

function watchedBtnClickActivation() {
  refs.queueBtn.classList.remove('button--orange');
  refs.queueBtn.classList.add('button--transparent');
  refs.watchedBtn.classList.add('button--orange');
  refs.watchedBtn.classList.remove('button--transparent');
}

function queueBtnClickActivation() {
  refs.queueBtn.classList.add('button--orange');
  refs.queueBtn.classList.remove('button--transparent');
  refs.watchedBtn.classList.add('button--transparent');
  refs.watchedBtn.classList.remove('button--orange');
}

export function onWatchBtnClick() {
  watchedBtnClickActivation();

  if (storage.getWatchedFilmsIds().length === 0) {
    clearContainerMarkup(refs.libraryList);
    const markup = emptyLs();
    renderMarkup(refs.libraryList, markup);
   //  document.querySelector('.empty-message').addClasslist('is-shown');
    return;
  }


  Promise.all(
    storage.getWatchedFilmsIds().map(filmId => {
      return filmApi.fetchMovieById(filmId);
    }),
  )
    .then(data => {
      return filmCardsMarkupCreate(data);
    })
    .then(markup => {
      clearContainerMarkup(refs.libraryList);
      renderMarkup(refs.libraryList, markup);
    })
    .catch();
}

export function onQueueBtnClick() {

  queueBtnClickActivation();

  if (storage.getqueueFilmsIds().length === 0) {
    clearContainerMarkup(refs.libraryList);
    const markup = emptyLs();
    renderMarkup(refs.libraryList, markup);
    return;
  }

  Promise.all(
    storage.getqueueFilmsIds().map(filmId => {
      return filmApi.fetchMovieById(filmId);
    }),
  )
    .then(data => {
      return filmCardsMarkupCreate(data);
    })
    .then(markup => {
      clearContainerMarkup(refs.libraryList);
      renderMarkup(refs.libraryList, markup);
    })
    .catch();
}

function start() {
  refs.watchedBtn.addEventListener('click', onWatchBtnClick);
  refs.queueBtn.addEventListener('click', onQueueBtnClick);
}

start();

// console.log(
//   filmApi.fetchMovieById(774825).then(r => {
//     console.dir(r);
//   }),
// );
