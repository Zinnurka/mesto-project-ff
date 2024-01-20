import './pages/index.css';
import {initialCards} from './components/cards.js'
import {openPopup, closePopup} from './components/modal.js'


const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

const profileEditButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelectorAll('.popup__close');


const popupEditProfile = document.querySelector('.popup_type_edit');
const popupCreateNewCard = document.querySelector('.popup_type_new-card');


function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").alt = cardData.name;
  deleteButton.addEventListener("click", function (event) {
    deleteCard(event.target.closest(".card"));
  });
  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

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