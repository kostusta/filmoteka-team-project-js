export default class LocalStorage {
  constructor() {
    // this.key = key
    // this.value = value
  }

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

  saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
} 