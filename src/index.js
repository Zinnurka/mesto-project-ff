import './pages/index.css';
import {initialCards} from './components/cards.js'
import {openPopup, closePopup, getFormByName} from './components/modal.js'
import {createCard, deleteCard, likeCard} from './components/card.js'


const cardsContainer = document.querySelector(".places__list");
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileEditButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelectorAll('.popup__close');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupCreateNewCard = document.querySelector('.popup_type_new-card');

const editProfileForm =  getFormByName("edit-profile")
const addNewCardForm = getFormByName("new-place")

initialCards.forEach(function (cardData) {
  const card = createCard(cardData, deleteCard, likeCard);
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

editProfileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = editProfileForm.elements.name.value;
  const description = editProfileForm.elements.description.value;
  profileTitle.textContent = name;
  profileDescription.textContent = description;
})

addNewCardForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const placeName = addNewCardForm.elements['place-name'].value
  const link = addNewCardForm.elements['link'].value
  const cardData = {name: placeName, link: link }
  cardsContainer.prepend(createCard(cardData, deleteCard))
  closePopup(popupCreateNewCard)
  addNewCardForm.reset()
})