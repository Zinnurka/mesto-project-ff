import "./pages/index.css";
import { openModal, closeModal, getFormByName } from "./components/modal.js";
import { createCard, likeCard } from "./components/card.js";
import "./components/validator.js";
import { clearValidation } from "./components/validator.js";
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

const profileEditButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const modalCloseButtons = document.querySelectorAll(".popup__close");
const avatarEditButton = document.querySelector(".profile__image")

const modalEditProfile = document.querySelector(".popup_type_edit");
const modalCreateNewCard = document.querySelector(".popup_type_new-card");
const modalImagePreview = document.querySelector(".popup_type_image");
const modalEditAvatar = document.querySelector(".popup_type_edit-avatar")

const editProfileForm = getFormByName("edit-profile");
const addNewCardForm = getFormByName("new-place");
const editAvatarForm = getFormByName("edit-avatar")

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

profileEditButton.addEventListener("click", () => {
  clearValidation(editProfileForm);
  editProfileForm.elements.name.value = profileTitle.textContent;
  editProfileForm.elements.description.value = profileDescription.textContent;
  openModal(modalEditProfile);
});

avatarEditButton.addEventListener("click", ()=> {
  clearValidation(editAvatarForm);
  openModal(modalEditAvatar)
})

modalCloseButtons.forEach((closeButton) => {
  const closeButtonPopup = closeButton.closest(".popup");
  closeButton.addEventListener("click", () => {
    closeModal(closeButtonPopup);
  });
});

addNewCardButton.addEventListener("click", () => {
  clearValidation(addNewCardForm);
  openModal(modalCreateNewCard);
});

editProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = editProfileForm.elements.name.value;
  const description = editProfileForm.elements.description.value;
  editUserData({
    name: name,
    about: description,
  }).then(() => {
    getUserData().then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    });
  });
});

addNewCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const placeName = addNewCardForm.elements["place-name"].value;
  const link = addNewCardForm.elements["link"].value;
  const cardData = { name: placeName, link: link };
  addCard(cardData);
  cardsContainer.prepend(createCard(cardData, deleteCard));
  closeModal(modalCreateNewCard);
  addNewCardForm.reset();
});

function previewImage(e) {
  modalImagePreview.querySelector(".popup__image").src = e.target.src;
  modalImagePreview.querySelector(".popup__image").alt = e.target.alt;
  modalImagePreview.querySelector(".popup__caption").textContent = e.target.alt;
  openModal(modalImagePreview);
}

editAvatarForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const link = editAvatarForm.elements["url"].value;
  console.log(link)
  editAvatar({'avatar':link}).then(()=>{
    location.reload()
  })
})