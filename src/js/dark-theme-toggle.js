import LocalStorage from './local-storage-api';

const refs = {
  checkbox: document.querySelector('[data-checkbox]'),
  toggleControl: document.querySelector('.toggle__control'),
  toggleTrack: document.querySelector('.toggle__track'),
  toggle: document.querySelector('.toggle'),
  body: document.querySelector('body'),
  footer: document.querySelector('footer .container'),
  footerLink: document.querySelector('.team-modal-link'),
  footerLinkUnderline: document.querySelector('.underline'),
};

refs.toggle.addEventListener('click', onToggleClick);

const storage = new LocalStorage();

export function onToggleClick() {
  refs.checkbox.checked = !refs.checkbox.checked;

  if (!refs.checkbox.checked) {
    darkThemeOn();
    storage.saveData('dark-theme', true);
    return;
  }
  darkThemeOff();
  storage.saveData('dark-theme', false);
}

export function darkThemeOff() {
  refs.toggleControl.classList.remove('toggle-control--checked');
  refs.toggleTrack.classList.remove('toggle__track--checked');
  refs.body.classList.remove('body--dark-theme');
  refs.footer.classList.remove('container-footer--dark-theme');
  refs.footerLink.classList.remove('team-modal-link--dark-theme');
  refs.footerLinkUnderline.classList.remove('underline--dark-theme');
}

export function darkThemeOn() {
  refs.toggleControl.classList.add('toggle-control--checked');
  refs.toggleTrack.classList.add('toggle__track--checked');
  refs.body.classList.add('body--dark-theme');
  refs.footer.classList.add('container-footer--dark-theme');
  refs.footerLink.classList.add('team-modal-link--dark-theme');
  refs.footerLinkUnderline.classList.add('underline--dark-theme');
}

function userThemeSetingsDetection() {
  window.addEventListener('load', () => {
    if (JSON.parse(localStorage.getItem('dark-theme'))) {
      darkThemeOn()
    }
  });
}

userThemeSetingsDetection()


