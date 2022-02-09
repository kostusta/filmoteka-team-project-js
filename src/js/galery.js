import filmCard from '../templates/film-card.hbs';
import { fetchMovies } from './api';
import genres from './genres.json';
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

export const namesOfGenres = new Map();
genres.genres.map(genre => {
  namesOfGenres.set(genre.id, genre.name);
});

export function getColection() {
  fetchMovies().then(data => {
    renderGalery(data);
  });
}

export function renderGalery({ results }) {
  const markup = getGenres(results).map(filmCard);
  refs.gallery.innerHTML = '';
  refs.gallery.insertAdjacentHTML('beforeend', markup.join(''));
}

export function getGenres(results) {
  const newResults = results.map(film => {
    const { genre_ids, release_date } = film;

    if (genre_ids.length > 2) {
      genre_ids.splice(2);
    }

    const newName = genre_ids.map(genreId => {
      return namesOfGenres.get(genreId);
    });

    film.release_year = release_date.split('').slice(0, 4).join('');
    if (newName.length === 0) {
      film.genreWithNames = 'Action';
      return film;
    }
    film.genreWithNames = newName.length > 1 ? `${newName[0]}, ${newName[1]}` : `${newName[0]}`;

    return film;
  });

  return newResults;
}
