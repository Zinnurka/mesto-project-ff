import { modalImagePreview } from "../index.js";

const popupIsOpened = 'popup_is-opened'

export function openModal(modalName) {
  modalName.classList.add(popupIsOpened);
  document.addEventListener('keydown', escapeClose);
  document.addEventListener('click', overlayClose)
}

export function closeModal(modalName) {
  modalName.classList.remove(popupIsOpened);
  document.removeEventListener('keydown', escapeClose);
  document.removeEventListener('click', overlayClose)
}

function escapeClose(e) {
  if (e.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'))
  }
}

function overlayClose(e) {
  if(e.target.classList.contains(popupIsOpened)){
    e.target.classList.remove(popupIsOpened)
  }
}

export function getFormByName(name) {
  return document.forms[name]
}

export function previewImage(e) {  
  modalImagePreview.querySelector('.popup__image').src = e.target.src;
  modalImagePreview.querySelector('.popup__caption').textContent = e.target.alt;
  openModal(modalImagePreview);
}