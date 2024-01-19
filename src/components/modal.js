export function openPopup(popupName){
  popupName.classList.add('popup_is-opened');
}

export function closePopup(popupName) {
  popupName.classList.remove('popup_is-opened');
}
