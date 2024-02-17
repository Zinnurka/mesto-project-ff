function isValid(formElement, inputElement, settings) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings.popupInputTypeError,
      settings.popupInputErrorActive
    );
  } else {
    hideInputError(
      formElement,
      inputElement,
      settings.popupInputTypeError,
      settings.popupInputErrorActive
    );
  }
}

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  popupInputTypeError,
  popupInputErrorActive
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(popupInputTypeError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(popupInputErrorActive);
}

function hideInputError(
  formElement,
  inputElement,
  popupInputTypeError,
  popupInputErrorActive
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(popupInputTypeError);
  errorElement.textContent = "";
  errorElement.classList.remove(popupInputErrorActive);
}

function setEventListeners(formElement, settings) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.formInput)
  );
  toggleButtonState(
    inputList,
    settings.buttonElement,
    settings.popupButtonSubmitInactive
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(
        inputList,
        settings.buttonElement,
        settings.popupButtonSubmitInactive
      );
    });
  });
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formElement));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    console.log(!inputElement.validity.valid);
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, submitButtonClass) {
  buttonElement = document.querySelector(buttonElement);
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(submitButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(submitButtonClass);
  }
}

export function clearValidation(formElement, settings) {
  const buttonElement = document.querySelector(settings.buttonElement);
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
  buttonElement.disabled = true;
  buttonElement.classList.add(settings.popupButtonSubmitInactive);
}

export const config = {
  popupInputTypeError: "popup__input_type_error",
  popupInputErrorActive: "popup__input-error_active",
  popupButtonSubmitInactive: "popup_button__submit_inactive",
  formElement: ".popup__form",
  formInput: ".popup__input",
  buttonElement: ".popup__button",
};

enableValidation(config);
