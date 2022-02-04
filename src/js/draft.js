import filmCard from '../templates/film-card.hbs';
import { fetchMovies } from './api';

import FilmsApi from './films-api';
import filrCardGenres from '../templates/film-card-genres.hbs'
const filmsApi = new FilmsApi();

const refs = {
  gallery: document.querySelector('.library__list'),
  modal: document.querySelector('.card'),
  closeModal: document.querySelector('.close-button'),
};

export function getColection() {
  fetchMovies().then(data => {
    renderGalery(data);
  });
}

async function renderGalery({ results }) {
  const markup = results.map(filmCard);
  refs.gallery.insertAdjacentHTML('beforeend', markup.join(''));

  const genresList = await filmsApi.fetchGenresList();
  // console.log(genresList);
  // console.log(results);
  // genresList.map((genre)=>{console.log(genre.id)})
  
  // const r = await results.map(result => {
  //   // const filmGenresIds = result.genre_ids
  //   // console.log(filmGenresIds)
  //   result.genre_ids.map(id => {
  //     // filmsGenresArray.push(result.title)
  //     for (const genre of genresList) {
  //       if (id === genre.id) {
  //         // console.log(result.title, genre.name);
  //         return genre.name;
  //       }
  //     }
  //   });
  // });

  const r = await results.reduce((acc, result) => { 
    result.genre_ids.map(id => {
      for (const genre of genresList) {
        if (id === genre.id) {
          acc.push({[result.title]: genre.name});
        }
      }
    });
    return acc
  }, [])

  console.log(r)

  const markup2 = r.map(filrCardGenres);
  refs.gallery.insertAdjacentHTML('beforeend', markup2.join(''));


  console.log(r)


  // const res = await results.reduce((fimsArray, result) => {
  //   fimsArray.push({[result.title]: result.genre_ids})

  //   // (results.map(result => { 
  //   //   result.genre_ids.map(id => {
  //   //     for (const genre of genresList) {
  //   //       if (id === genre.id) {
  //   //         return genre.name;
  //   //       }
  //   //     }
  //   //   });
  //   // }))

  //   return fimsArray
  // }, []);

  // console.log(res);
}
