/**------------------------------------------------------------------------
 **                             ARROW FUNCTION
 *------------------------------------------------------------------------**/

const showError = (form, input, errorMessage, options) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorVisibleClass);
  errorElement.classList.remove(options.errorHiddenClass);
};

const hideError = (form, input, options) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(options.inputErrorClass);
  errorElement.classList.add(options.errorHiddenClass);
  errorElement.classList.remove(options.errorVisibleClass);
  errorElement.textContent = "";
};

const checkInputValidity = (form, input, options) => {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, options);
  } else {
    hideError(form, input, options);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, submitButton, options) => {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(options.inactiveButtonClass);
    return (submitButton.disabled = true);
  }
  submitButton.classList.remove(options.inactiveButtonClass);
  submitButton.disabled = false;
};

const setEventListeners = (form, options) => {
  const inputList = Array.from(form.querySelectorAll(options.inputSelector));
  const submitButton = form.querySelector(options.submitButtonSelector);

  toggleButtonState(inputList, submitButton, options);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, options);
      toggleButtonState(inputList, submitButton, options);
    });
  });
};

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, options);
  });
};

/**------------------------------------------------------------------------
 **                            OBJECT
 *------------------------------------------------------------------------**/
enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button--inactive",
  inputErrorClass: "modal__form-input--error",
  errorVisibleClass: "modal__error--visible",
  errorHiddenClass: "modal__error--hidden",
});
