const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardData, deleteCard) {
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

export function deleteCard(card) {
  card.remove();
}