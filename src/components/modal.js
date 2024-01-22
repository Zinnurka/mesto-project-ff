import { modalImagePreview } from "../index.js";

export function openModal(modalName) {
  modalName.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeClose);
  document.addEventListener('click', overlayClose)
}

export function closeModal(modalName) {
  modalName.classList.remove('popup_is-opened');
}

function escapeClose(e) {
  const modalIsOpened = document.querySelector('.popup_is-opened');
  if (e.key === 'Escape') {
    closeModal(modalIsOpened)
  }
}

function overlayClose(e) {
    e.target.classList.remove('popup_is-opened')
}

export function getFormByName(name) {
  return document.forms[name]
}

export function previewImage(e) {  
  modalImagePreview.querySelector('.popup__image').src = e.target.src;
  modalImagePreview.querySelector('.popup__caption').textContent = e.target.alt;
  openModal(modalImagePreview);
}