import Api from "./apiMoviesSearch"
import filmCard from "../templates/movie-card.hbs"
import { startPreloader, stopPreloader } from './preloader';
import { pagination } from './pagination';




const api = new Api();

const  mainSection = document.querySelector(".main-section-js")  
const cardList = document.querySelector(".library__list")
const headerError = document.querySelector(".error-message")
const headerFormSubmitBtn = document.querySelector(".search-button")
const headerFormInput = document.querySelector(".header__input")

headerFormSubmitBtn.addEventListener('click', onSearchMovies);

pagination.on('beforeMove', (e) => {
  startPreloader()
  api.page = e.page;
  api.fetchSearchMovies()
    .then(async movies => {
      const genres = await api.fetchGenre();
      return { movies, genres };
    })
    .then(obj => {
      const data = obj.movies.results.map(({ release_date, genre_ids, ...movie }) => {
        const data = {
          ...movie,
          release_date: release_date?.split('-')[0],
          genres: genre_ids.map(id => obj.genres[id]),   // переобразование id в name
        };
        if (data.genres.length > 3) {
          data.genres.splice(2, genre_ids.length - 2, 'Other');
        }
        return { ...data, genres: data.genres.join(', ') };
      });
        window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      appendMovieCardMarkup(data);
      stopPreloader()
    })
    .catch(err => console.log(err))
});



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

         pagination.setTotalItems(movies.total_results);
         pagination.movePageTo(1);
        
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


