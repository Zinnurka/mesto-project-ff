// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = initialCards[i].link;
  cardElement.querySelector('.card__title').innerText = initialCards[i].name;
  placesList.append(cardElement)

}
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
