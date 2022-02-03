import filmCard from '../templates/film-card-my-library.hbs';
import emptyLs from '../templates/my-library-empty-ls.hbs';

import FilmsApi from './films-api';
import LocalStorage from './local-storage-api';

const refs = {
  libraryList: document.querySelector('.library__list'),
  watchedBtn: document.querySelector('.button-list > .button--orange'),
  queueBtn: document.querySelector('.button-list > .button--transparent'),
};

const filmApi = new FilmsApi();
const storage = new LocalStorage();

function filmCardsMarkupCreate(data) {
  return data.map(item => filmCard(item.data)).join('');
}

function renderMarkup(element, markup) {
  element.insertAdjacentHTML('beforeend', markup);
}

function clearContainerMarkup(containerRef) {
  containerRef.innerHTML = '';
}

function watchedBtnClickActivation() {
  refs.queueBtn.classList.remove('button--orange')
  refs.queueBtn.classList.add('button--transparent')
  refs.watchedBtn.classList.add('button--orange')
  refs.watchedBtn.classList.remove('button--transparent')
}

function queueBtnClickActivation() {
  refs.queueBtn.classList.add('button--orange')
  refs.queueBtn.classList.remove('button--transparent')
  refs.watchedBtn.classList.add('button--transparent')
  refs.watchedBtn.classList.remove('button--orange')

}

function onWatchBtnClick() {
  watchedBtnClickActivation()

  clearContainerMarkup(refs.libraryList);
  if (storage.getWatchedFilmsIds().length === 0) {
    clearContainerMarkup(refs.libraryList);
    const markup = emptyLs();
    renderMarkup(refs.libraryList, markup);
    document.querySelector('.empty-message').addClasslist('is-shown');
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

function onQueueBtnClick() {
  queueBtnClickActivation()

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
  window.addEventListener('load', onWatchBtnClick);
}

start();

// console.log(
//   filmApi.fetchMovieById(774825).then(r => {
//     console.dir(r);
//   }),
// );
