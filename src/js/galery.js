import filmCard from '../templates/film-card.hbs';
import { fetchMovies } from './api';

export const refs = {
  gallery: document.querySelector('.library__list'),
  modal: document.querySelector('.card'),
  closeModal: document.querySelector('.close-button'),
  authBtn: document.querySelector('.auth-btn'),
  authModal: document.querySelector('.modal-auth'),
  authForm: document.querySelector('.auth-form'),
  signInBtn: document.querySelector('.sign-in-btn'),
  registrBtn: document.querySelector('.registr-btn'),
  authClose: document.querySelector('.login_wr__close-button'),
};

export function getColection() {
  fetchMovies().then(data => {
    renderGalery(data);
  });
}

export function renderGalery({ results }) {
  const markup = results.map(filmCard);
  refs.gallery.innerHTML = '';
  refs.gallery.insertAdjacentHTML('beforeend', markup.join(''));
  console.log('Зарендерили', results);
}
