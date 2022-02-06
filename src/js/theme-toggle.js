const refs = {
  checkbox: document.querySelector('[data-checkbox]'),
  toggleControl: document.querySelector('.toggle-control'),
  toggleTrack: document.querySelector('.toggle-track'),
  toggle: document.querySelector('.toggle'),
  
}

refs.toggle.addEventListener('click', onToggleClick)

function onToggleClick() {
  refs.checkbox.checked = !refs.checkbox.checked

  if(!refs.checkbox.checked){
    refs.toggleControl.classList.add('control--checked')
    refs.toggleTrack.classList.add('toggle-track--checked')

    return
  }

  refs.toggleControl.classList.remove('control--checked')
  refs.toggleTrack.classList.remove('toggle-track--checked')
}