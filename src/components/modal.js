export function openPopup(popupName){
  popupName.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeClose);
}

export function closePopup(popupName) {
  popupName.classList.remove('popup_is-opened');
}

function escapeClose(e) {
  if (e.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'))
  }
}