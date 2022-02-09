import { refs } from './common-references';
import filmCard from '../templates/film-card-my-library.hbs';
import emptyLs from '../templates/my-library-empty-ls.hbs';

import FilmsApi from './films-api';
import LocalStorage from './local-storage-api';

const filmApi = new FilmsApi();
const storage = new LocalStorage();

export async function filmCardsMarkupCreate(data) {
  const markup = await releaseYear(data).map(filmCard);
  return markup.join('');
}

export function renderMarkup(element, markup) {
  element.insertAdjacentHTML('beforeend', markup);
}

export function clearContainerMarkup(containerRef) {
  containerRef.innerHTML = '';
}

function releaseYear(data) {
  const tempData = [...data];

  const newData = tempData.map(item => {
    const year = item.data.release_date.slice(0, 4);
    item.data.release_date = year;
    return item;
  });
  return newData;
}

async function watchedBtnHandler() {
  try {
    const filmApiResp = await Promise.all(
      storage.getWatchedFilmsIds().map(filmId => {
        return filmApi.fetchMovieById(filmId);
      }),
    );
    const filmCardsMarkup = await filmCardsMarkupCreate(filmApiResp);
    clearContainerMarkup(refs.libraryList);
    renderMarkup(refs.libraryList, filmCardsMarkup);
  } catch (error) {
    console.log(error.message);
  }
}

async function queueBtnHandler() {
  try {
    const filmApiResp = await Promise.all(
      storage.getqueueFilmsIds().map(filmId => {
        return filmApi.fetchMovieById(filmId);
      }),
    );
    const filmCardsMarkup = await filmCardsMarkupCreate(filmApiResp);
    clearContainerMarkup(refs.libraryList);
    renderMarkup(refs.libraryList, filmCardsMarkup);
  } catch (error) {
    console.log(error.message);
  }
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

export async function onWatchBtnClick() {
  watchedBtnClickActivation();

  if (storage.getWatchedFilmsIds().length === 0) {
    clearContainerMarkup(refs.libraryList);
    const markup = await emptyLs();
    renderMarkup(refs.libraryList, markup);
    return;
  }

  watchedBtnHandler();
}

export async function onQueueBtnClick() {
  queueBtnClickActivation();

  if (storage.getqueueFilmsIds().length === 0) {
    clearContainerMarkup(refs.libraryList);
    const markup = emptyLs();
    renderMarkup(refs.libraryList, markup);
    return;
  }

  queueBtnHandler();
}

function start() {
  refs.watchedBtn.addEventListener('click', onWatchBtnClick);
  refs.queueBtn.addEventListener('click', onQueueBtnClick);
}

start();

// console.log(
//   filmApi
//     .fetchMovieById(774825)
//     .then(r => {
//       console.log(r);
//       return r;
//     })
//     .then(r => {
//       return r.data.release_date.slice(0, 4);
//     }),
// );
