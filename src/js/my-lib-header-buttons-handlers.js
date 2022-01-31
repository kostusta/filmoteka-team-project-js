import { getColection } from './galery.js'

const refs = {
  watchedBtn: document.querySelector('.button-list > .button--orange'),
  queueBtn: document.querySelector('.button-list > .button--transparent'),
};

function onWatchBtnClick() {}
function onQueueBtnClick() {}

function start() {
  refs.watchedBtn.addEventListener('click', onWatchBtnClick);
  refs.queueBtn.addEventListener('click', onQueueBtnClick);
}

console.log(getColection())

start()
