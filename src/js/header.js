import { refs } from './common-references';
import { clearContainerMarkup, onWatchBtnClick } from './header-buttons-handlers';
import { paginationOn, fetch } from './pagination';

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
  refs.pagination.classList.remove('visually-hidden');
  refs.headerDomEl.classList.remove('header--my-lib');
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
  refs.pagination.classList.add('visually-hidden');
  refs.headerDomEl.classList.add('header--my-lib');

  onWatchBtnClick();
}
