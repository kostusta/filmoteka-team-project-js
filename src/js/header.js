const refs = {
  header: document.querySelector('.header'),
  homeBtn: document.querySelector('[data-home-btn]'),
  libBtn: document.querySelector('[data-lib-btn]'),
  form: document.querySelector('.header-form'),
  btnList: document.querySelector('.button-list'),
};

refs.homeBtn.addEventListener('click', onHomeBtnClick);
refs.libBtn.addEventListener('click', onLibBtnClick);

function onHomeBtnClick(event) {
  event.preventDefault();

  refs.header.classList.add('header-home');
  refs.header.classList.remove('header-lib');
  refs.form.classList.remove('visually-hidden');
  refs.btnList.classList.add('visually-hidden');
  refs.homeBtn.classList.add('site-nav__link--current')
  refs.libBtn.classList.remove('site-nav__link--current')
}
function onLibBtnClick(event) {
  event.preventDefault();

  refs.header.classList.remove('header-home');
  refs.header.classList.add('header-lib');
  refs.form.classList.add('visually-hidden');
  refs.btnList.classList.remove('visually-hidden');
  refs.libBtn.classList.add('site-nav__link--current')
  refs.homeBtn.classList.remove('site-nav__link--current')
}
