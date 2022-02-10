export const refs = {
  // header refs
  headerDomEl: document.querySelector('header'),
  header: document.querySelector('.header'),
  homeBtn: document.querySelector('[data-home-btn]'),
  libBtn: document.querySelector('[data-lib-btn]'),
  form: document.querySelector('.header-form'),
  btnList: document.querySelector('.button-list'),
  galery: document.querySelector('.library__list'),
  headerIcon: document.querySelector('.header__home-link'),
  pagination: document.getElementById('tui-pagination-container'),

  // dark theme refs
  checkbox: document.querySelector('[data-checkbox]'),
  toggleControl: document.querySelector('.toggle__control'),
  toggleTrack: document.querySelector('.toggle__track'),
  toggle: document.querySelector('.toggle'),
  body: document.querySelector('body'),
  footerDomEl: document.querySelector('footer'),
  footer: document.querySelector('footer .container'),
  footerLink: document.querySelector('.team-modal-link'),
  footerLinkUnderline: document.querySelector('.underline'),
  filmModal: document.querySelector('.card.modal'),
  teamModalBg: document.querySelector('.team-modal-content'),
  teamModalListTextColor: [...document.querySelectorAll('.team-list-text')],
  teamModalListTitleColor: [...document.querySelectorAll('.team-list-title')],
    teamModalListIconColor: [...document.querySelectorAll('.social-list-icon')],
	     teamModalListWrapperBgColor: [...document.querySelectorAll('.team-wrapper')],

    teamModalCloseBtnColor: document.querySelector('.team-close-cross'),
	 


  // header buttons click handler refs
  libraryList: document.querySelector('.library__list'),
  watchedBtn: document.querySelector('[data-watched-btn]'),
  queueBtn: document.querySelector('[data-queue-btn]'),
};
