// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
placesList.append(cardElement)
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
