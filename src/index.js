import './pages/index.css';
import {initialCards} from './components/cards.js'
import {openPopup, closePopup} from './components/modal.js'
import {createCard, deleteCard} from './components/card.js'


const cardsContainer = document.querySelector(".places__list");

const profileEditButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelectorAll('.popup__close');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupCreateNewCard = document.querySelector('.popup_type_new-card');

initialCards.forEach(function (cardData) {
  const card = createCard(cardData, deleteCard);
  cardsContainer.append(card);
});

profileEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile)
})

popupCloseButton[0].addEventListener('click', () => {
  closePopup(popupEditProfile)
})

addNewCardButton.addEventListener('click', () => {
  openPopup(popupCreateNewCard)
})

popupCloseButton[1].addEventListener('click', () => {  
  closePopup(popupCreateNewCard)
})