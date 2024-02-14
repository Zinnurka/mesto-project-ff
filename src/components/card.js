const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardData, userId, deleteCard, likeCard, openCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (cardData.owner && cardData.owner._id !== userId) {
    deleteButton.remove();
  }
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__like-counter").textContent =
    cardData.likes?.length;
  deleteButton.addEventListener("click", function (event) {
    hideCard(event.target.closest(".card"));
    deleteCard(cardData._id);
  });
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", openCard);
  return cardElement;
}

function hideCard(card) {
  card.remove();
}

export function likeCard(e) {
  e.target.classList.toggle("card__like-button_is-active");
}
