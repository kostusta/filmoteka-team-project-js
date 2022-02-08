
export { startPreloader, stopPreloader }

const preloader = document.querySelector('.preloader-js');
const mainSection = document.querySelector('.main-section-js');

// ----- для запуска -----
function startPreloader() {

    preloader.classList.remove('preloader--hide')
    preloader.classList.remove('none')
    mainSection.classList.add('main__preloader')
    
}

// ----- для остановки -----
function stopPreloader() {
    preloader.classList.add('preloader--hide')
    setTimeout(() => {
        preloader.classList.add('none')
        mainSection.classList.remove('main__preloader')
    }, 600)

}