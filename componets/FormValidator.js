class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._formSelector = settings.formSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorVisibleClass = settings.errorVisibleClass;
    this._errorHiddenClass = settings.errorHiddenClass;

    this._form = formElement;
  }

  toggleButtonState(inputList, submitButton, options) {
    if (hasInvalidInput(inputList)) {
      submitButton.classList.add(options.inactiveButtonClass);
      return (submitButton.disabled = true);
    }
    submitButton.classList.remove(options.inactiveButtonClass);
    submitButton.disabled = false;
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    toggleButtonState(inputList, submitButton, options);
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(this._form, input, options);
        toggleButtonState(inputList, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, options);
  }
}

/*
const settings {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button--inactive",
  inputErrorClass: "modal__form-input--error",
  errorVisibleClass: "modal__error--visible",
  errorHiddenClass: "modal__error--hidden",
}
  */

//Move to index.js
const editFormValidator = new FormValidator();
//const addFormValidator = new FormValidator(Settings, addForm);
export default FormValidator;
