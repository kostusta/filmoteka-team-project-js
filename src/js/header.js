import homeHeaderMarkup from '../templates/home-header-markup.hbs'
import libHeaderMarkup from '../templates/lib-header-markup.hbs'

const refs = {
  header: document.querySelector('header'),
  homeBtn: document.querySelector('[data-home-btn]'),
  libBtn: document.querySelector('[data-lib-btn]')
}

// refs.homeBtn.addEventListener('click', onHomeBtnClick)
// refs.libBtn.addEventListener('click', onLibBtnClick)

function onHomeBtnClick(event) {
  event.preventDefault()

  refs.header.innerHTML=''
  refs.header.insertAdjacentHTML('beforeend', homeHeaderMarkup())
}
function onLibBtnClick(event) {
  event.preventDefault()

  refs.header.innerHTML=''
  refs.header.insertAdjacentHTML('beforeend', libHeaderMarkup())
}