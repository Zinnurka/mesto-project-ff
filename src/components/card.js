const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardData, deleteCard, likeCard, openCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").alt = cardData.name;  
  cardElement.querySelector(".card__like-counter").textContent = cardData.likes.length
  deleteButton.addEventListener("click", function (event) {
    deleteCard(event.target.closest(".card"));
  });
  const likeButton = cardElement.querySelector('.card__like-button');  
  likeButton.addEventListener('click', likeCard);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', openCard);
  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(e) {
  e.target.classList.toggle('card__like-button_is-active');
}

