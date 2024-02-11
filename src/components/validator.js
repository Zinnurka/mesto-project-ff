const popupInputTypeError = 'popup__input_type_error'
const popupInputErrorActive = 'popup__input-error_active'
const popupButtonSubmitInactive = 'popup_button__submit_inactive'
const formElement = '.popup__form';
const formInput = '.popup__input';
const buttonElement = document.querySelector('.popup__button');


function isValid(formElement, inputElement){
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(popupInputTypeError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(popupInputErrorActive)
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(popupInputTypeError);
  errorElement.textContent = '';
  errorElement.classList.remove(popupInputErrorActive)
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(formInput));
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(formElement));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    console.log(!inputElement.validity.valid)
    return !inputElement.validity.valid;
  })
};

function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    buttonElement.classList.add(popupButtonSubmitInactive);
  } else {
        buttonElement.disabled = false;
    buttonElement.classList.remove(popupButtonSubmitInactive);
  }
};

export function clearValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    console.log(inputElement)
    hideInputError(formElement,inputElement);
  });
}

enableValidation();