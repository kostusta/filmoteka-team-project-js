import modalMovie from '../templates/modal_movie.hbs';
import { fetchMovieById } from './api';

export const refs = {
  libraryList: document.querySelector('.library__list'),
  closeModalBtn: document.querySelector('.close-button'),
  modal: document.querySelector('[data-modal]'),
  modalContainer: document.querySelector('.card'),
};

function createModal(data) {
  const markup = modalMovie(data);

  refs.modalContainer.insertAdjacentHTML('beforeend', markup);
  refs.modal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onEscapeClick);
  refs.modal.addEventListener('click', backDropHandler);
  const closeBtn = document.querySelector('.close-button');
  closeBtn.addEventListener('click', closeBtnHandler);
  const addWatchedBtn = document.querySelector('[data-watched]');
  addWatchedBtn.addEventListener('click', onAddWatchedBtn);
    const addQueueBtn = document.querySelector('[data-queue]');
  addQueueBtn.addEventListener('click', onAddQueueBtn);

}

refs.libraryList.addEventListener('click', onOpenModal);

export function onOpenModal(e) {
  refs.modalContainer.innerHTML = '';
  const movieId = e.target.closest('li').dataset.id;
  fetchMovieById(movieId).then(createModal);
}

function backDropHandler(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
    return;
  }
}

function closeBtnHandler(e) {
  onCloseModal();
}

export function onCloseModal() {
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

function onAddWatchedBtn(e) {
	console.log(e.target);
}

function onAddQueueBtn(e) {
	console.log(e.target);
}