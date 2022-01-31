const modalLinks = document.querySelectorAll('.team-modal-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (modalLinks.length > 0) {
  for (let index = 0; index < modalLinks.length; index++) {
    const modalLink = modalLinks[index];
    modalLink.addEventListener('click', function (e) {
      const modalName = modalLink.getAttribute('href').replace('#', '');
      const curentModal = document.getElementById(modalName);
      modalOpen(curentModal);
      e.preventDefault();
    });
  }
}

const modalCloseIcon = document.querySelectorAll('.close-team');
if (modalCloseIcon.length > 0) {
  for (let index = 0; index < modalCloseIcon.length; index++) {
    const el = modalCloseIcon[index];
    el.addEventListener('click', function (e) {
      modalClose(el.closest('.team-modal'));
      e.preventDefault();
    });
  }
}

function modalOpen(curentModal) {
  if (curentModal && unlock) {
    const modalActive = document.querySelector('.team-modal.open');
    curentModal.classList.add('open');
    curentModal.addEventListener('click', function (e) {
      if (!e.target.closest('.team-modal-content')) {
        modalClose(e.target.closest('.team-modal'));
      }
    });
  }
}

function modalClose(modalActive) {
  if (unlock) {
    modalActive.classList.remove('open');
  }
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const modalActive = document.querySelector('.team-modal.open');
    modalClose(modalActive);
  }
});
