import './pages/index.css';
import {initialCards} from './components/cards.js';
import {openModal, closeModal, getFormByName} from './components/modal.js';
import {createCard, deleteCard, likeCard} from './components/card.js';


const cardsContainer = document.querySelector(".places__list");
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileEditButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const modalCloseButton = document.querySelectorAll('.popup__close');

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
  openModal(modalEditProfile)
})

modalCloseButton[0].addEventListener('click', () => {
  closeModal(modalEditProfile)
})

addNewCardButton.addEventListener('click', () => {
  openModal(modalCreateNewCard)
})

modalCloseButton[1].addEventListener('click', () => {  
  closeModal(modalCreateNewCard)
})

modalCloseButton[2].addEventListener('click', () => {  
  closeModal(modalImagePreview)
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
  modalImagePreview.querySelector('.popup__caption').textContent = e.target.alt;
  openModal(modalImagePreview);
}