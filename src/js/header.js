const refs = {
  home: document.querySelector('.site-nav__link'),
  library: document.querySelector('.nav-list__link'),
   body: document.querySelector("body"),
};

const headerHome = "<header>
  <include src="./partials/home-header.html"></include>
</header > ";

const headerLibrary = "<header>
  <include src="./partials/my-library-header.html"></include>
</header>";

refs.home.addEventListener('click', onHome);
refs.library.addEventListener('click', onlibrary);

function onHome(e) {
  e.preventDefault();

  refs.body.insertAdjacentHTML("afterbegin", headerHome);
 
}

function onlibrary(e) {
  e.preventDefault();

   refs.body.insertAdjacentHTML("afterbegin", headerLibrary);

}




