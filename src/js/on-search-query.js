import Api from "./apiMoviesSearch"
import filmCard from "../templates/movie-card.hbs"
import { startPreloader, stopPreloader } from './preloader'


const api = new Api();

const cardList = document.querySelector(".library__list")
const headerError = document.querySelector(".error-message")
const headerFormSubmitBtn = document.querySelector(".search-button")
const headerFormInput = document.querySelector(".header__input")

headerFormSubmitBtn.addEventListener('click', onSearchMovies);

function onSearchMovies(event) {
  startPreloader()
  api.query = headerFormInput.value.trim();
  api.resetPage();
  event.preventDefault();

  if (api.query === '') {
    event.preventDefault();
    headerError.classList.remove('visually-hidden', 'none');
    
    setTimeout(() => {
      headerError.classList.add('visually-hidden', 'none');
    }, 3000);
    stopPreloader()
    return;
  }

  if (api.query !== '') {
    api.fetchSearchMovies()
      .then((movies) => {
        if (movies.results.length < 1) {
          headerError.classList.remove('visually-hidden', 'none');
          
          setTimeout(() => {
            headerError.classList.add('visually-hidden', 'none');
          }, 3000);
          cleanInput()
         stopPreloader()
        
          return;
        };
        if (movies.results.length > 1) {

          headerError.classList.add('visually-hidden', 'none');
          clearMovieCardContainer();
          appendMovieCardMarkup(movies.results);
          cleanInput();



          stopPreloader();
        
        }

      })
      .catch(err => console.log(err))
  }
 

}
function cleanInput() {
  headerFormInput.value = '';
}
function clearMovieCardContainer() {
  cardList.innerHTML = '';
}

 async function appendMovieCardMarkup(data) {
  const markup = await filmCard(data);
  cardList.innerHTML = markup;
}