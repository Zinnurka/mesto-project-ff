import './pages/index.css';
import {initialCards} from './scripts/cards.js'

const cardTemplate = document.querySelector("#card-template").content;

const cardsContainer = document.querySelector(".places__list");

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
