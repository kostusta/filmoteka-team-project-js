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
};
refs.libraryList.addEventListener('click', onOpenModal);

let currentFilmId;
let currentTrailerTitle;
let filmsIds = {
  watchedFilmsIds: [],
  queueFilmsIds: [],
};

onAuthStateChanged(auth, user => {
  if (user) {
    readUserData(user)
      .then(data => {
        filmsIds.watchedFilmsIds = data.val().watchedFilmsIds;
        filmsIds.queueFilmsIds = data.val().queueFilmsIds;
        console.log(filmsIds);
        saveData('filmsIds', filmsIds);
      })
      .catch(e => console.log(e));
  }
});

function onOpenModal(e) {

  if (loadData('filmsIds')) {
    filmsIds = loadData('filmsIds');
  }
  refs.modalContainer.innerHTML = '';
  currentFilmId = e.target.closest('li').dataset.id;

  fetchMovieById(currentFilmId).then(createModal);

}

// function onOpenModal(e) {
//   if (loadData('filmsIds')) {
//       filmsIds = loadData('filmsIds');
//   }
//   refs.modalContainer.innerHTML = '';
//   currentFilmId = e.target.closest('li').dataset.id;

//   fetchMovieById(currentFilmId)
//   .then(createModal)
//   .then(fetch)
//   .then((data) => {
// 	  console.log(data);
//   })
//   ;
// }

function createModal(data) {
  const markup = modalMovie(data);

  refs.modalContainer.insertAdjacentHTML('beforeend', markup);
  refs.modal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';

  addEventListeners();
  checkHomepageForDuplicates();
  checkLibraryForDuplicates();
}

function onAddWatchedBtn(e) {
  if (filmsIds.watchedFilmsIds.some(id => id === currentFilmId)) {
	//   e.target.textContent = 'already in the watched';
	//   	e.target.setAttribute('disabled', "disabled");
filmsIds.watchedFilmsIds = filmsIds.watchedFilmsIds.filter(id => id !== currentFilmId);
  saveData('filmsIds', filmsIds);
onWatchBtnClick();
e.target.classList.remove('button--transparent');
e.target.classList.add('button--orange');
e.target.textContent = 'add to watched';

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
  e.target.classList.remove('button--orange');
e.target.classList.add('button--transparent');
e.target.textContent = 'remove from watched';

}

function onAddQueueBtn(e) {
  if (filmsIds.queueFilmsIds.some(id => id === currentFilmId)) {
	//   e.target.classList.add("card__btn--disabled");
	//   e.target.textContent = 'already in the queue';
	//   	e.target.setAttribute('disabled', "disabled");
	filmsIds.queueFilmsIds = filmsIds.queueFilmsIds.filter(id => id !== currentFilmId);
  saveData('filmsIds', filmsIds);
onQueueBtnClick();
e.target.classList.remove('button--transparent');
e.target.classList.add('button--orange');
e.target.textContent = 'add to queue';
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
    e.target.classList.remove('button--orange');
e.target.classList.add('button--transparent');
e.target.textContent = 'remove from queue';

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
  const trailerBtn = document.querySelector('.trailer-btn');
  trailerBtn.addEventListener('click', onTrailerBtnClick);
  const trailerVideo = document.querySelector('.trailer-video');
}

//  Kак получить ключ https://www.pandoge.com/stati-i-sovety/kak-poluchit-api-key-dlya-raboty-s-servisom-youtube

async function fetch(name) {
  const API = 'AIzaSyCZe9rPo2hXxE-YtCc92VzPMTl5oX22cU8';
  const url = `https://www.googleapis.com/youtube/v3/search?q=${name}+trailer+official+russian&key=${API}`;
  const response = await axios.get(`${url}`);
  const trailerId = response.data.items[0].id.videoId;
  return trailerId;
}

function onTrailerBtnClick(e) {
  const trailer = e.target.parentNode.nextElementSibling;
  currentTrailerTitle = trailer.dataset.title;
  fetch(currentTrailerTitle).then(trailerId => {
    trailer.setAttribute('src', `https://www.youtube.com/embed/${trailerId}`);
  });
  trailer.classList.add('active');
}

function checkLibraryForDuplicates() {
	const currentPage = document.querySelector('[data-lib-btn]');

	if(currentPage.classList.contains('site-nav__link--current')){
	    	  if (filmsIds.queueFilmsIds.some(id => id === currentFilmId)) {
const btnQueue = document.querySelector('[data-queue]');
	  btnQueue.classList.add("button--transparent");
	  btnQueue.textContent = 'remove from queue';
	  	// btnQueue.setAttribute('disabled', "disabled");
  }

      	  if (filmsIds.watchedFilmsIds.some(id => id === currentFilmId)) {
		  const btnWatched = document.querySelector('[data-watched]');
	  btnWatched.classList.add("button--transparent");
	  btnWatched.textContent = 'remove from watched';
	  	// btnWatched.setAttribute('disabled', "disabled");
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
  }

      	  if (filmsIds.watchedFilmsIds.some(id => id === currentFilmId)) {
		  const btnWatched = document.querySelector('[data-watched]');
	  btnWatched.classList.add("button--transparent");
	  btnWatched.textContent = 'already added';
	  	btnWatched.setAttribute('disabled', "disabled");
  }	} 
}