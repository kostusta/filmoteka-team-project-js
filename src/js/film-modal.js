import Notiflix from 'notiflix';
import modalMovie from '../templates/modal_movie.hbs';
import { fetchMovieById } from './api';
import { saveData, loadData } from "./storage";
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
}

function onAddWatchedBtn() {
  if (filmsIds.watchedFilmsIds.some(id => id === currentFilmId)) {
    return;
  }

  filmsIds.watchedFilmsIds.push(currentFilmId);
  saveData("filmsIds", filmsIds);
  Notiflix.Notify.success('This movie has been added to WATCH');
}

function onAddQueueBtn() {
  if (filmsIds.queueFilmsIds.some(id => id === currentFilmId)) {
    return;
  }

  filmsIds.queueFilmsIds.push(currentFilmId);
  saveData("filmsIds", filmsIds);
    Notiflix.Notify.success('This movie has been added to QUEUE');

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
   const trailerId =  response.data.items[0].id.videoId;
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


