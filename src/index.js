import './pages/index.css';
import {initialCards} from './components/cards.js';
import {openModal, closeModal, getFormByName} from './components/modal.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
import './components/validator.js';
import { clearValidation } from './components/validator.js';


const cardsContainer = document.querySelector(".places__list");
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileEditButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const modalCloseButtons = document.querySelectorAll('.popup__close');

const modalEditProfile = document.querySelector('.popup_type_edit');
const modalCreateNewCard = document.querySelector('.popup_type_new-card');
const modalImagePreview = document.querySelector('.popup_type_image');

const editProfileForm =  getFormByName("edit-profile");
const addNewCardForm = getFormByName("new-place");



initialCards.forEach(function (cardData) {
  const card = createCard(cardData, deleteCard, likeCard, previewImage);
  cardsContainer.append(card);
});

profileEditButton.addEventListener('click', () => {  
  clearValidation(editProfileForm)
  editProfileForm.elements.name.value = profileTitle.textContent
  editProfileForm.elements.description.value = profileDescription.textContent
  openModal(modalEditProfile)
})

modalCloseButtons.forEach(closeButton => {
  const closeButtonPopup = closeButton.closest('.popup');
  closeButton.addEventListener('click', () => { closeModal(closeButtonPopup) });
})

addNewCardButton.addEventListener('click', () => {  
  clearValidation(addNewCardForm);
  openModal(modalCreateNewCard)
})

editProfileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = editProfileForm.elements.name.value;
  const description = editProfileForm.elements.description.value;
  profileTitle.textContent = name;
  profileDescription.textContent = description
})

addNewCardForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const placeName = addNewCardForm.elements['place-name'].value;
  const link = addNewCardForm.elements['link'].value;
  const cardData = {name: placeName, link: link };
  cardsContainer.prepend(createCard(cardData, deleteCard));
  closeModal(modalCreateNewCard);
  addNewCardForm.reset()
})

function previewImage(e) {  
  modalImagePreview.querySelector('.popup__image').src = e.target.src;
  modalImagePreview.querySelector('.popup__image').alt = e.target.alt;
  modalImagePreview.querySelector('.popup__caption').textContent = e.target.alt;
  openModal(modalImagePreview);
}