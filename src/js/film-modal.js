import Notiflix from 'notiflix';
import modalMovie from '../templates/modal_movie.hbs';
import { onAuthStateChanged } from 'firebase/auth';
import { fetchMovieById } from './api';
import { saveData, loadData} from './storage';
import { auth, writeUserData, readUserData } from './auth';
import {onWatchBtnClick, onQueueBtnClick} from "./header-buttons-handlers";
import axios from 'axios';

Notiflix.Notify.init({
  width: '300px',
  position: 'left-top',
  distance: '40px',
  clickToClose: true,
  fontSize: '22px',
  cssAnimationStyle: 'from-left',
  fontAwesomeIconSize: '30px',
});

const refs = {
  libraryList: document.querySelector('.library__list'),
  modal: document.querySelector('[data-modal]'),
  modalContainer: document.querySelector('.card'),
  trailerVideo: document.querySelector('.trailer-video'),
};
refs.libraryList.addEventListener('click', onOpenModal);
let currentFilmId;
let currentTrailerTitle;
let filmsIds = {
  watchedFilmsIds: [],
  queueFilmsIds: [],
};

// Авторизация
onAuthStateChanged(auth, user => {
  if (user) {
    readUserData(user)
      .then(data => {
        filmsIds.watchedFilmsIds = data.val().watchedFilmsIds;
        filmsIds.queueFilmsIds = data.val().queueFilmsIds;

        saveData('filmsIds', filmsIds);
      })
      .catch(e => console.log(e));
  }
});

// Открытие модалки
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
  checkHomepageForDuplicates();
  checkLibraryForDuplicates();
}


// Функция обработки события по кнопке добавления в просмотренные фильмы
function onAddWatchedBtn(e) {
  const button = e.target;

  if (filmsIds.watchedFilmsIds.some(id => id === currentFilmId)) {
  removeMovieById(button, filmsIds.watchedFilmsIds);
  saveData('filmsIds', filmsIds);
    onWatchBtnClick();
    return;
  }
  
  onAuthStateChanged(auth, user => {
    if (user) {
      writeUserData(user, filmsIds);
    } else {
      console.log('вы не вошли');
    }
  });

  filmsIds.watchedFilmsIds.push(currentFilmId);
  saveData('filmsIds', filmsIds);
  changeStyleBtn(button, 'watched');
}

// Функция обработки события по кнопке добавления фильма в очередь
function onAddQueueBtn(e) {
  const button = e.target;

  if (filmsIds.queueFilmsIds.some(id => id === currentFilmId)) {
	    removeMovieById(button, filmsIds.queueFilmsIds);
  saveData('filmsIds', filmsIds);
onQueueBtnClick();
    return;
  }

  onAuthStateChanged(auth, user => {
    if (user) {
      writeUserData(user, filmsIds);
    } else {
      console.log('вы не вошли');
    }
  });

  filmsIds.queueFilmsIds.push(currentFilmId);
  saveData('filmsIds', filmsIds);
  changeStyleBtn(button, 'queue');
}

// Функция обработки бэкдропа
function backDropHandler(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
    return;
  }
}

// Закрытие модалки
function onCloseModal() {
  refs.modal.classList.toggle('is-hidden');
  document.removeEventListener('keydown', onEscapeClick);
  refs.modal.removeEventListener('click', backDropHandler);
  document.body.style.overflow = '';
}

// Обработка события по эскейпу
function onEscapeClick(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

// Добавление слушателей событий
function addEventListeners() {
  document.addEventListener('keydown', onEscapeClick);
  refs.modal.addEventListener('click', backDropHandler);
  const closeBtn = document.querySelector('.close-button');
  closeBtn.addEventListener('click', onCloseModal);
  const addWatchedBtn = document.querySelector('[data-watched]');
  addWatchedBtn.addEventListener('click', onAddWatchedBtn);
  const addQueueBtn = document.querySelector('[data-queue]');
  addQueueBtn.addEventListener('click', onAddQueueBtn);
  const trailerBtn = document.querySelector('.trailer-btn');
  trailerBtn.addEventListener('click', onTrailerBtnClick);
}


// Запрос трейлера на апи ютуба 
//  Kак получить ключ https://www.pandoge.com/stati-i-sovety/kak-poluchit-api-key-dlya-raboty-s-servisom-youtube
async function fetch(name) {
  const API = 'AIzaSyCZe9rPo2hXxE-YtCc92VzPMTl5oX22cU8';
  const url = `https://www.googleapis.com/youtube/v3/search?q=${name}+trailer+official+russian&key=${API}`;
  const response = await axios.get(`${url}`);
  const trailerId = response.data.items[0].id.videoId;
  return trailerId;
}

// Функция обработки события на кнопку открытия трейлера
function onTrailerBtnClick(e) {
  const trailer = e.target.parentNode.nextElementSibling;
  const x = document.querySelector('.close-cross');

  currentTrailerTitle = trailer.dataset.title;
  fetch(currentTrailerTitle).then(trailerId => {
    trailer.setAttribute('src', `https://www.youtube.com/embed/${trailerId}`);
  });

  trailer.classList.add('active');
  x.classList.add('close-cross-white');
}

// Проверка на наличие фильма в библиотеке и применение соответствующих стилей на кнопки
function checkLibraryForDuplicates() {
	const currentPage = document.querySelector('[data-lib-btn]');

	if(currentPage.classList.contains('site-nav__link--current')){
	    	  if (filmsIds.queueFilmsIds.some(id => id === currentFilmId)) {
const btnQueue = document.querySelector('[data-queue]');
	  btnQueue.classList.add("button--transparent");
	  btnQueue.textContent = 'remove from queue';
  }

      	  if (filmsIds.watchedFilmsIds.some(id => id === currentFilmId)) {
		  const btnWatched = document.querySelector('[data-watched]');
	  btnWatched.classList.add("button--transparent");
	  btnWatched.textContent = 'remove from watched';
  }
	}
}
function checkHomepageForDuplicates() {
	const currentPage = document.querySelector('[data-home-btn]');

	if(currentPage.classList.contains('site-nav__link--current')){

if (filmsIds.queueFilmsIds.some(id => id === currentFilmId)) {
const btnQueue = document.querySelector('[data-queue]');
	  btnQueue.classList.add("button--transparent");
	  btnQueue.textContent = 'already added';
  btnQueue.setAttribute('disabled', "disabled");
  btnQueue.classList.add('card__btn--disabled');
  }

      	  if (filmsIds.watchedFilmsIds.some(id => id === currentFilmId)) {
		  const btnWatched = document.querySelector('[data-watched]');
	  btnWatched.classList.add("button--transparent");
	  btnWatched.textContent = 'already added';
    btnWatched.setAttribute('disabled', "disabled");
            btnWatched.classList.add('card__btn--disabled');

  }	} 
}

// Получение текущей страницы
function getCurrentPage() {
  const currentPage = document.querySelector('.site-nav__link--current');

  if (currentPage.textContent == 'home') {
    return 'home'
  } else {
        return 'library';
  }
}

// Функция изменения стиля кнопок при добавлении фильма
function changeStyleBtn(button, name) {
    const currentPage = getCurrentPage();

          button.classList.remove('button--orange');
button.classList.add('button--transparent');

          if(currentPage == 'library'){
button.textContent = `remove from ${name}`;
          } else {
            button.textContent = `added to ${name}`;
            button.setAttribute('disabled', "disabled");
            button.classList.add('card__btn--disabled')
    }
}

// Функция удаления фильма
function removeMovieById(button, array) {
array = array.filter(id => id !== currentFilmId);
button.classList.remove('button--transparent');
button.classList.add('button--orange');
button.textContent = 'add to watched';
}

