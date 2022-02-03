import Notiflix from 'notiflix';


export function loadData(key) {
   
  try {
     return JSON.parse(localStorage.getItem(key))

  } catch (error) {

     Notiflix.Notify.warning('Something went wrong.Sorry for the inconvenience');
     return {};
  }
}

export function saveData(key, payload) {
    localStorage.setItem(key, JSON.stringify(payload));
}
