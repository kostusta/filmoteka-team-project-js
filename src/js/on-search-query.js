import card from '../templates/film-card.hbs';
import API from './api';
import searchErr from './search-error';
import {renderGalery} from "./galery"
import { fetch } from './pagination';

export let searchBy = '';
const api = new API();
const searchForm = document.querySelector(".search-form")
const paginationBox = document.getElementById('tui-pagination-container');
const galleryList = document.querySelector(".library__list")
searchForm.addEventListener('submit', onSearchInput);

export async function onSearchInput(e) {
  e.preventDefault();
  paginationBox.classList.add('visually-hidden');
  const value = e.currentTarget.elements.searchQuery.value;
  if (!value.trim()) return;
  initialReset();
  api.setQuery(value);

  try {
    const data = await api.fetchMovieSearchQuery();
    console.log(data);
    const result = await data.results;
      const markup = await renderGalery(result);
    if (!result.length) {
      searchErr(true);

      return;
    }
    if (data.total_results > 20) {
      fetch(data.total_results);
      paginationBox.classList.remove('visually-hidden');
    }
    galleryList.insertAdjacentHTML('beforeend', card(markup));
    searchBy = 'query';
  } catch (error) {
    console.error(error);
  }
}

function initialReset() {
  galleryList.innerHTML = '';
  searchErr(false);
  api.setPage(1);
}

