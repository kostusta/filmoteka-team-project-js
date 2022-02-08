import { refs } from './common-references';
import LocalStorage from './local-storage-api';

refs.toggle.addEventListener('click', onToggleClick);

const storage = new LocalStorage();

export function onToggleClick() {
  refs.checkbox.checked = !refs.checkbox.checked;

  if (!refs.checkbox.checked) {
    darkThemeOn();
    storage.saveData('dark-scheme', true);
    return;
  }
  darkThemeOff();
  storage.saveData('dark-scheme', false);
}

export function darkThemeOff() {
  refs.toggleControl.classList.remove('toggle-control--checked');
  refs.toggleTrack.classList.remove('toggle__track--checked');
  refs.body.classList.remove('body--dark-scheme');
  refs.footer.classList.remove('container-footer--dark-scheme');
  refs.footerLink.classList.remove('team-modal-link--dark-scheme');
  refs.footerLinkUnderline.classList.remove('underline--dark-scheme');
  refs.footerDomEl.classList.remove('footer--dark-scheme');
  refs.footerDomEl.classList.add('footer');
}

export function darkThemeOn() {
  refs.toggleControl.classList.add('toggle-control--checked');
  refs.toggleTrack.classList.add('toggle__track--checked');
  refs.body.classList.add('body--dark-scheme');
  refs.footer.classList.add('container-footer--dark-scheme');
  refs.footerLink.classList.add('team-modal-link--dark-scheme');
  refs.footerLinkUnderline.classList.add('underline--dark-scheme');
  refs.footerDomEl.classList.add('footer--dark-scheme');
  refs.footerDomEl.classList.remove('footer');
}

function userThemeSetingsDetection() {
  window.addEventListener('load', () => {
    if (JSON.parse(localStorage.getItem('dark-scheme'))) {
      darkThemeOn();
    }
  });
}

userThemeSetingsDetection();
