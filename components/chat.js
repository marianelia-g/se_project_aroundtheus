class FormValidator {
  constructor(options) {
    this.formSelector = options.formSelector;
    this.inputSelector = options.inputSelector;
    this.submitButtonSelector = options.submitButtonSelector;
    this.inactiveButtonClass = options.inactiveButtonClass;
    this.inputErrorClass = options.inputErrorClass;
    this.errorVisibleClass = options.errorVisibleClass;
    this.errorHiddenClass = options.errorHiddenClass;
  }

  showError(input, errorMessage) {
    const errorElement = this.form.querySelector(`.${input.id}-error`);
    input.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorVisibleClass);
  }

  hideError(input) {
    const errorElement = this.form.querySelector(`.${input.id}-error`);
    input.classList.remove(this.inputErrorClass);
    errorElement.classList.add(this.errorHiddenClass);
    errorElement.classList.remove(this.errorVisibleClass);
    errorElement.textContent = "";
  }

  checkInputValidity(input) {
    if (!input.validity.valid) {
      this.showError(input, input.validationMessage);
    } else {
      this.hideError(input);
    }
  }

  hasInvalidInput() {
    return this.inputList.some((input) => !input.validity.valid);
  }

  toggleButtonState() {
    if (this.hasInvalidInput()) {
      this.submitButton.classList.add(this.inactiveButtonClass);
      this.submitButton.disabled = true;
    } else {
      this.submitButton.classList.remove(this.inactiveButtonClass);
      this.submitButton.disabled = false;
    }
  }

  setEventListeners() {
    this.inputList = Array.from(this.form.querySelectorAll(this.inputSelector));
    this.submitButton = this.form.querySelector(this.submitButtonSelector);

    this.toggleButtonState();

    this.inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this.checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this.formSelector));

    formList.forEach((form) => {
      this.form = form;
      form.addEventListener("submit", (evt) => evt.preventDefault());
      this.setEventListeners();
    });
  }
}

// Initialize the form validator
const validator = new FormValidator({
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button--inactive",
  inputErrorClass: "modal__form-input--error",
  errorVisibleClass: "modal__error--visible",
  errorHiddenClass: "modal__error--hidden",
});

validator.enableValidation();
export default chat;
