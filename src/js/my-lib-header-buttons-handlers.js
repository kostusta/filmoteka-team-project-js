const refs = {
  watchedBtn: document.querySelector('.button-list > .button--orange'),
  queueBtn: document.querySelector('.button-list > .button--transparent'),
};

refs.watchedBtn.addEventListener('click', () => {console.log('click watchedBtn')})
refs.queueBtn.addEventListener('click', () => {console.log('click queueBtn')})
