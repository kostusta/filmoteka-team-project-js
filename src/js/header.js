import {
  clearContainerMarkup,
  filmCardsMarkupCreate,
  renderMarkup,
  onWatchBtnClick,
} from './header-buttons-handlers';
import LocalStorage from './local-storage-api';
import FilmsApi from './films-api';

import { paginationOn, fetch } from './pagination';

const filmApi = new FilmsApi();
const storage = new LocalStorage();

const refs = {
  header: document.querySelector('.header'),
  homeBtn: document.querySelector('[data-home-btn]'),
  libBtn: document.querySelector('[data-lib-btn]'),
  form: document.querySelector('.header-form'),
  btnList: document.querySelector('.button-list'),
  galery: document.querySelector('.library__list'),
  headerIcon: document.querySelector('.header__home-link'),
  pagination: document.getElementById('tui-pagination-container')
};

refs.homeBtn.addEventListener('click', onHomeBtnClick);
refs.libBtn.addEventListener('click', onLibBtnClick);
refs.headerIcon.addEventListener('click', onHomeBtnClick);

function onHomeBtnClick(event) {
  event.preventDefault();
  clearContainerMarkup(refs.galery);

  paginationOn();
  fetch();

  refs.header.classList.add('header-home');
  refs.header.classList.remove('header-lib');
  refs.form.classList.remove('visually-hidden');
  refs.btnList.classList.add('visually-hidden');
  refs.homeBtn.classList.add('site-nav__link--current');
  refs.libBtn.classList.remove('site-nav__link--current');
  refs.pagination.classList.remove('visually-hidden')
}

function onLibBtnClick(event) {
  event.preventDefault();
  clearContainerMarkup(refs.galery);

  refs.header.classList.remove('header-home');
  refs.header.classList.add('header-lib');
  refs.form.classList.add('visually-hidden');
  refs.btnList.classList.remove('visually-hidden');
  refs.libBtn.classList.add('site-nav__link--current');
  refs.homeBtn.classList.remove('site-nav__link--current');
  refs.pagination.classList.add('visually-hidden')

  onWatchBtnClick()
}
