class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement;
    this._inputSelector = settings.inputSelector;
    this._formSelector = settings.formSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorVisibleClass = settings.errorVisibleClass;
    this._errorHiddenClass = settings.errorHiddenClass;
  }

  _showError(input) {
    const errorElement = this.form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.add(this._errorHiddenClass);
    errorElement.classList.remove(this._errorVisibleClass);
    errorElement.textContent = input.validationMessage;
    //errorElement.classList.add(this.errorVisibleClass);
  }

  _hideError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.add(this._errorHiddenClass);
    errorElement.classList.remove(this._errorVisibleClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input);
      //this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this.toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((input) => this._hideError(input));
    this._toggleButtonState();
  }
}

//Move to index.js
//const addFormValidator = new FormValidator(Settings, addForm);
export default FormValidator;
