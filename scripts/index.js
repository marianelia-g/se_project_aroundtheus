const initialCards = [
  {
    title: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    title: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    title: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    title: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    title: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/**------------------------------------------------------------------------
 **                            ELEMENTS
 *------------------------------------------------------------------------**/

const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector("#add-new-card-button");
const closeButtons = document.querySelectorAll(".modal__close-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-descr");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const modal = document.querySelectorAll(".modal");
const formInput = document.querySelector(".modal__form-input");
const addCardTitleInput = document.querySelector("#add-card-title-input");
const addCardURLInput = document.querySelector("#add-card-url-input");
const profileEditForm = document.forms["edit-form-modal"];
const addCardEditForm = document.forms["add-form-modal"];

const imageModal = document.querySelector("#image-modal");
const imageModalOverlay = document.querySelector("#image-modal-overlay");
const imageModalPreview = document.querySelector("#image-modal-preview");
const imageModalTitle = document.querySelector("#image-modal-title");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardsListEl = document.querySelector(".cards__list");

const modalForm = document.querySelector(".modal__form");

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

enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button--inactive",
  inputErrorClass: "modal__form-input--error",
  errorVisibleClass: "modal__error--visible",
  errorHiddenClass: "modal__error--hidden",
});

/**------------------------------------------------------------------------
 **                           FUNCTION
 *------------------------------------------------------------------------**/

function closePopup(popup) {
  popup.classList.remove("modal--opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function openPopup(popup) {
  popup.classList.add("modal--opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeByOverlay(popup) {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  });
}

function handleEscapeKey(e) {
  if (e.key === "Escape") {
    const openPopup = document.querySelector(".modal--opened");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");
  const imageModal = document.querySelector("#image-modal");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button--active");
  });
  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    openPopup(imageModal);
    imageModalPreview.src = cardData.link;
    imageModalPreview.alt = cardData.title;
    imageModalTitle.textContent = cardData.title;
  });

  cardTitle.textContent = cardData.title;
  cardImage.alt = cardData.title;
  cardImage.src = cardData.link;

  return cardElement;
}

function rendercard(cardData) {
  const cardElement = getCardElement(cardData);
  cardsListEl.prepend(cardElement);
}

/**------------------------------------------------------------------------
 **                            EVENT HANDLERS
 *------------------------------------------------------------------------**/
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  console.log("form submitted");
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const title = addCardTitleInput.value;
  const link = addCardURLInput.value;
  rendercard({ title, link }, cardsListEl);
  closePopup(addCardModal);
  e.target.reset();
}

/**------------------------------------------------------------------------
 **                            EVENT lISTENERS
 *------------------------------------------------------------------------**/
profileEditButton.addEventListener("click", () => {
  openPopup(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

addNewCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

formInput.addEventListener("input", checkInputValidity);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardEditForm.addEventListener("submit", handleAddCardSubmit);

/**------------------------------------------------------------------------
 **                            LOOPS
 *------------------------------------------------------------------------**/
initialCards.forEach((cardData) => rendercard(cardData));

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

modal.forEach((popup) => {
  closeByOverlay(popup);
});

/**------------------------------------------------------------------------
 **                           Console Log
 *------------------------------------------------------------------------**/
