// import SimpleLightbox from "simplelightbox";
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const card = new SimpleLightbox('.card', {
// 	captionsData:'alt',
// 	captionType:'alt',
// 	captionDelay:200,
// 	captionPosition:'bottom',
//  });


  export const refs = {
   //  openModalBtn: document.querySelector('[data-modal-open]'),

	libraryList: document.querySelector(".library__list"),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.closeModalBtn.addEventListener('click', onCloseModal);
  refs.libraryList.addEventListener('click', onOpenModal);
  refs.modal.addEventListener("click", onBackDropClick);


    export function onOpenModal(e) {
	    document.addEventListener("keydown", onEscapeClick);
	      refs.modal.classList.remove('is-hidden');
  }


  export function onCloseModal(e) {
		document.removeEventListener("keydown", onEscapeClick);
    refs.modal.classList.add('is-hidden');
  }

   function onEscapeClick(e) {
	   if(e.code === 'Escape'){
		    onCloseModal();
	  }
  }
   function onBackDropClick(e) {
	  if(e.currentTarget === e.target){
		  onCloseModal();
	  }
  }


