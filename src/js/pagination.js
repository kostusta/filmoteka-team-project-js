import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/_pagination-btn.scss';
import { fetchMovies } from './api';
import { renderGalery } from './galery';

const container = document.getElementById('tui-pagination-container');

const pagination = new Pagination(container, {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
});

const page = pagination.getCurrentPage();

export function fetch() {
  fetchMovies(page).then(data => {
    pagination.reset(data.total_results);
    renderGalery(data);
  });
}

fetch();

export function paginationOn() {
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    fetchMovies(currentPage).then(data => {
      renderGalery(data);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
  });
}

paginationOn();
