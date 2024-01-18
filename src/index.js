import './pages/index.css';
import {initialCards} from './components/cards.js'


const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");
const addCardBottom = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupCloseButton = document.querySelector('.popup__close')

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

function openPopup(popupName){
  popupName.classList.add('popup_is-opened');
}

function closePopup(popupName) {
  popupName.classList.remove('popup_is-opened');
}

addCardBottom.addEventListener('click', () => {
  openPopup(popupEdit)
})

popupCloseButton.addEventListener('click', ()=> {
  closePopup(popupEdit)
})