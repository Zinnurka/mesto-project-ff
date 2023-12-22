// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
// @todo: Вывести карточки на страницу

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = initialCards[i].link;
  cardElement.querySelector(".card__title").textContent = initialCards[i].name;
  cardElement.querySelector(".card__image").alt = initialCards[i].name;
  cardsContainer.append(cardElement);
}

// @todo: Функция удаления карточки

const deleteButtons = document.querySelectorAll(".card__delete-button");

deleteButtons.forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.target.closest('.card').remove();
  });
});
