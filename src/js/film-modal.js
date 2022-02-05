import Notiflix from 'notiflix';
import modalMovie from '../templates/modal_movie.hbs';
import { fetchMovieById } from './api';
import { saveData, loadData } from "./storage";

const refs = {
  libraryList: document.querySelector('.library__list'),
  modal: document.querySelector('[data-modal]'),
  modalContainer: document.querySelector('.card'),
};
refs.libraryList.addEventListener('click', onOpenModal);

let currentFilmId;
let filmsIds = {
  watchedFilmsIds: [],
  queueFilmsIds: []
}


function onOpenModal(e) {
  if (loadData('filmsIds')) {
      filmsIds = loadData('filmsIds');
  }

  refs.modalContainer.innerHTML = '';
  currentFilmId = e.target.closest('li').dataset.id;

  fetchMovieById(currentFilmId).then(createModal);
}

function createModal(data) {
  const markup = modalMovie(data);

  refs.modalContainer.insertAdjacentHTML('beforeend', markup);
  refs.modal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';

  addEventListeners();
}

function onAddWatchedBtn() {

  filmsIds.watchedFilmsIds.push(currentFilmId);
  saveData("filmsIds", filmsIds);
}

function onAddQueueBtn() {

  filmsIds.queueFilmsIds.push(currentFilmId);
  saveData("filmsIds", filmsIds);
}



function backDropHandler(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
    return;
  }
}

function onCloseModal() {
  refs.modal.classList.toggle('is-hidden');
  document.removeEventListener('keydown', onEscapeClick);
  refs.modal.removeEventListener('click', backDropHandler);
  document.body.style.overflow = '';
}

function onEscapeClick(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

function addEventListeners() {
    document.addEventListener('keydown', onEscapeClick);
  refs.modal.addEventListener('click', backDropHandler);
  const closeBtn = document.querySelector('.close-button');
  closeBtn.addEventListener('click', onCloseModal);
  const addWatchedBtn = document.querySelector('[data-watched]');
  addWatchedBtn.addEventListener('click', onAddWatchedBtn);
    const addQueueBtn = document.querySelector('[data-queue]');
  addQueueBtn.addEventListener('click', onAddQueueBtn);
}