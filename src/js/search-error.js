const errorMessage = document.querySelector(".error-message")

export default function (isTrue) {
  if (isTrue) {
    errorMessage.classList.remove('visually-hidden');

    return;
  }
  errorMessage.classList.add('visually-hidden');
}