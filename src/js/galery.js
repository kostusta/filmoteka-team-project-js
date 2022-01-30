import axios from 'axios';
const refs = {
  gallery: document.querySelector('.library__list'),
};

const template = ({ poster_path, backdrop_path, original_title }) => {
  return `<li class="item">
        <a class="card-link" href="https://image.tmdb.org/t/p/w500${backdrop_path}">
          <div class="thumb"><img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="" /></div>
          <p>
            ${original_title} <br />
            <span>Drama, Action | 2020</span>
          </p>
        </a>
      </li>`;
};

export function getColection() {
  const url = 'https://api.themoviedb.org/3/trending/movie/week';
  const parmams = {
    api_key: '0a0eacc01c98f8ef04ac7ca82867ea4e',
  };

  return axios.get(`${url}?api_key=${parmams.api_key}&total_results=100`).then(({ data }) => {
    const markup = data.results.map(template);

    refs.gallery.insertAdjacentHTML('beforeend', markup.join(''));
  });
}
