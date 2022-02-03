export default class LocalStorage {
  constructor() {}

  getWatchedFilmsIds() {
    try {
      return localStorage.getItem('filmsIds') === null
        ? []
        : JSON.parse(localStorage.getItem('filmsIds')).watchedFilmsIds;
    } catch {}
  }

  getqueueFilmsIds() {
    try {
      return localStorage.getItem('filmsIds') === null
        ? []
        : JSON.parse(localStorage.getItem('filmsIds')).queueFilmsIds;
    } catch {}
  }
} 