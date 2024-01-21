export function openPopup(popupName){
  popupName.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeClose);
  document.addEventListener('click', overlayClose)
}

export function closePopup(popupName) {
  popupName.classList.remove('popup_is-opened');
}

function escapeClose(e) {
  const popupIsOpened = document.querySelector('.popup_is-opened')
  if (e.key === 'Escape') {
    closePopup(popupIsOpened)
  }
}

function overlayClose(e) {
    e.target.classList.remove('popup_is-opened')
}

export function getFormByName(name){
  return document.forms[name]
}