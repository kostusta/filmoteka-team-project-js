import { refs } from './galery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  onValue,
  connectDatabaseEmulator,
} from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAuIJvi5z6NtVFPfwJkL6QvQ6UjY2tDTZo',
  authDomain: 'my-movie-library-cb4ea.firebaseapp.com',
  projectId: 'my-movie-library-cb4ea',
  storageBucket: 'my-movie-library-cb4ea.appspot.com',
  messagingSenderId: '730088017215',
  appId: '1:730088017215:web:21cb9e034c90d4209dd78a',
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const database = getDatabase(
  app,
  'https://my-movie-library-cb4ea-default-rtdb.europe-west1.firebasedatabase.app',
);

// Подключение эмулятора для тестирования

// if (location.hostname === 'localhost') {
//   // Point to the RTDB emulator running on localhost.
//   connectDatabaseEmulator(database, 'http://localhost:9000');
//   connectAuthEmulator(auth, 'http://localhost:9099');
// }

function onAuthModalOpen() {
  refs.authModal.classList.toggle('is-hidden');
  refs.signInBtn.addEventListener('click', loginEmailPassword);
  refs.registrBtn.addEventListener('click', createAccount);
  refs.authModal.addEventListener('click', onBackDropClick);
  refs.authClose.addEventListener('click', onCloseModal);
  document.addEventListener('keydown', onEscapeClick);
}

// Вход с помощью почты и пароля
const loginEmailPassword = async () => {
  const email = document.querySelector('[type="email"]').value;
  const password = document.querySelector('[type="password"]').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    refs.authModal.classList.toggle('is-hidden');
    return userCredential;
  } catch (error) {
    console.log(error.message);
  }
};

// Создание нового пользователя
const createAccount = async () => {
  const email = document.querySelector('[type="email"]').value;
  const password = document.querySelector('[type="password"]').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    refs.authModal.classList.toggle('is-hidden');
  } catch (error) {
    console.log(error.message);
  }
};

//Мониторинг состояния авторизации
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      refs.authBtn.removeEventListener('click', onAuthModalOpen);
      refs.authBtn.textContent = `Log out`;
      refs.authBtn.addEventListener('click', logOut);
    } else {
      refs.authBtn.removeEventListener('click', logOut);
      refs.authBtn.textContent = 'Log in';
      refs.authBtn.addEventListener('click', onAuthModalOpen);
    }
  });
};

// Выйти с аккаунта
const logOut = async () => {
  await signOut(auth);
};

monitorAuthState();

// Запись даных в firebase
export function writeUserData(user, filmsIds) {
  //Текущий пользователь, если пользователь не вошел равен null
  if (!user) {
    return;
  }

  try {
    set(ref(database, 'users/' + user.uid), filmsIds);
  } catch (error) {
    console.log(error);
  }
}

//Чтение даных с firebase, возвращает промис
// readUserData(user).then(data => console.log(data.val().queueFilmsIds));
export async function readUserData(user) {
  if (!user) {
    return;
  }
  const dbRef = ref(database);

  try {
    const snapshot = await get(child(dbRef, `users/${user.uid}`));
    if (snapshot.exists()) {
      return snapshot;
    } else {
      console.log('No data available');
    }
  } catch (error) {
    console.error(error);
  }
}

function onBackDropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
    return;
  }
}

function onCloseModal() {
  refs.authModal.classList.toggle('is-hidden');
  refs.authModal.removeEventListener('click', onBackDropClick);
  refs.signInBtn.removeEventListener('click', loginEmailPassword);
  refs.registrBtn.removeEventListener('click', createAccount);
  refs.authClose.removeEventListener('click', onCloseModal);
  document.removeEventListener('keydown', onEscapeClick);
}

function onEscapeClick(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}
