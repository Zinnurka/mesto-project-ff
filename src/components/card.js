import { addLike, deleteLike, getCards } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardData, deleteCard, userId, likeCard, openCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  if (cardData.owner && cardData.owner._id !== userId) {
    deleteButton.remove();
  }
  cardImage.src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__like-counter").textContent =
    cardData.likes?.length;
  deleteButton.addEventListener("click", function (event) {
    deleteCard(cardData._id).then(() => {
      hideCard(event.target.closest(".card"));
    });
  });
  const likeButton = cardElement.querySelector(".card__like-button");
  if (cardData.likes?.find((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", () => {
    likeCard(likeButton, cardData, cardElement, userId);
  });

  cardImage.addEventListener("click", openCard);
  return cardElement;
}

function hideCard(card) {
  card.remove();
}

export function likeCard(likeButton, cardData, cardElement, userId) {
  if (cardData.likes?.find((like) => like._id === userId)) {
    deleteLike(cardData._id)
      .then((data) => {
        cardElement.querySelector(".card__like-counter").textContent =
          data.likes.length;
      })
      .then(() => {
        likeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((response) => {
        console.log(`Ошибка: ${response.status}`);
      });
  } else {
    addLike(cardData._id)
      .then((data) => {
        cardElement.querySelector(".card__like-counter").textContent =
          data.likes.length;
      })
      .then(() => {
        likeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((response) => {
        console.log(`Ошибка: ${response.status}`);
      });
  }
}
