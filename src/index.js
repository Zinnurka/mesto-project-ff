import "./pages/index.css";
import { openModal, closeModal, getFormByName } from "./components/modal.js";
import { createCard, likeCard } from "./components/card.js";
import "./components/validator.js";
import { clearValidation, config } from "./components/validator.js";
import {
  getUserData,
  getCards,
  editUserData,
  addCard,
  deleteCard,
  editAvatar
} from "./components/api.js";

const cardsContainer = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonAddNewCard = document.querySelector(".profile__add-button");
const buttonsModalClose = document.querySelectorAll(".popup__close");
const buttonAvatarEdit = document.querySelector(".profile__image")

const modalEditProfile = document.querySelector(".popup_type_edit");
const modalCreateNewCard = document.querySelector(".popup_type_new-card");
const modalImagePreview = document.querySelector(".popup_type_image");
const modalEditAvatar = document.querySelector(".popup_type_edit-avatar")

const formEditProfile = getFormByName("edit-profile");
const formAddNewCard = getFormByName("new-place");
const formEditAvatar = getFormByName("edit-avatar")

Promise.all([getUserData, getCards])
  .then(([getUserData, getCards]) => {
    getUserData()
      .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        profileImage.setAttribute(
          "style",
          `background-image: url(${data.avatar});`
        );
        console.log(data._id);
        return data._id;
      })
      .then((userID) => {
        getCards().then((data) => {
          data.forEach(function (cardData) {
            const card = createCard(
              cardData,
              userID,
              deleteCard,
              likeCard,
              previewImage
            );
            cardsContainer.append(card);
          });
        });
      });
  })
  .catch((error) => {
    console.log(error);
  });

buttonProfileEdit.addEventListener("click", () => {
  clearValidation(formEditProfile, config);
  formEditProfile.elements.name.value = profileTitle.textContent;
  formEditProfile.elements.description.value = profileDescription.textContent;
  openModal(modalEditProfile);
});

buttonAvatarEdit.addEventListener("click", ()=> {
  clearValidation(formEditAvatar, config);
  openModal(modalEditAvatar)
})

buttonsModalClose.forEach((closeButton) => {
  const closeButtonPopup = closeButton.closest(".popup");
  closeButton.addEventListener("click", () => {
    closeModal(closeButtonPopup);
  });
});

buttonAddNewCard.addEventListener("click", () => {
  clearValidation(formAddNewCard, config);
  openModal(modalCreateNewCard);
});

formEditProfile.addEventListener("submit", (e) => {
  e.preventDefault();
  const saveButton = formEditProfile.querySelector(".popup__button")
  renderLoading(true, saveButton)
  const name = formEditProfile.elements.name.value;
  const description = formEditProfile.elements.description.value;
  editUserData({
    name: name,
    about: description,
  }).then(() => {
    getUserData().then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    }).finally(()=>{
      renderLoading(false, saveButton)
    });
  });
});

formAddNewCard.addEventListener("submit", (e) => {
  e.preventDefault();
  const saveButton = formAddNewCard.querySelector(".popup__button")
  renderLoading(true, saveButton)
  const placeName = formAddNewCard.elements["place-name"].value;
  const link = formAddNewCard.elements["link"].value;
  const cardData = { name: placeName, link: link };
  addCard(cardData);
  cardsContainer.prepend(createCard(cardData, deleteCard));
  renderLoading(false, saveButton);
  closeModal(modalCreateNewCard);
  formAddNewCard.reset();
});

function previewImage(e) {
  modalImagePreview.querySelector(".popup__image").src = e.target.src;
  modalImagePreview.querySelector(".popup__image").alt = e.target.alt;
  modalImagePreview.querySelector(".popup__caption").textContent = e.target.alt;
  openModal(modalImagePreview);
}

formEditAvatar.addEventListener("submit", (e)=>{
  e.preventDefault();
  const saveButton = formEditAvatar.querySelector(".popup__button")
  renderLoading(true, saveButton)
  const link = formEditAvatar.elements["url"].value;
  console.log(link)
  editAvatar({'avatar':link}).then(()=>{
    renderLoading(false, saveButton);
    location.reload()
  })
})

function renderLoading(isLoading, buttonElement){
  if (isLoading){
    buttonElement.textContent = 'Сохранение...'
  } else {
    buttonElement.textContent = 'Сохранить'
  }
}