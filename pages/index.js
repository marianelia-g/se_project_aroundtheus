import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

/**------------------------------------------------------------------------
 **                           VALIDATION SETTINGS
 *------------------------------------------------------------------------**/
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button--inactive",
  inputErrorClass: "modal__form-input--error",
  errorVisibleClass: "modal__error--visible",
  errorHiddenClass: "modal__error--hidden",
};

/**------------------------------------------------------------------------
 **                            CARDS
 *------------------------------------------------------------------------**/

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

const modals = document.querySelectorAll(".modal");

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

/**------------------------------------------------------------------------
 **                           IMAGE MODAL HANDLER
 *------------------------------------------------------------------------**/
function handleImageClick(title, link) {
  imageModalPreview.src = link;
  imageModalPreview.alt = title;
  imageModalTitle.textContent = title;
  openPopup(imageModal);
}

/**------------------------------------------------------------------------
 **                           CARD FUNCTION
 *------------------------------------------------------------------------**/
function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardsListEl.prepend(cardElement);
}

/**------------------------------------------------------------------------
 **                           EVENT HANDLERS
 *------------------------------------------------------------------------**/
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const title = addCardTitleInput.value;
  const link = addCardURLInput.value;
  renderCard({ title, link });
  closePopup(addCardModal);
  e.target.reset();
  addCardFormValidator.resetValidation();
}
/**------------------------------------------------------------------------
 **                           FORM VALIDATION
 *------------------------------------------------------------------------**/
const profileFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addCardFormValidator = new FormValidator(
  validationSettings,
  addCardEditForm
);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/**------------------------------------------------------------------------
 **                           EVENT LISTENERS
 *------------------------------------------------------------------------**/
profileEditButton.addEventListener("click", () => {
  openPopup(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

addNewCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardEditForm.addEventListener("submit", handleAddCardSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

modals.forEach(closeByOverlay);
/**------------------------------------------------------------------------
 **                           INITIAL RENDERING
 *------------------------------------------------------------------------**/
initialCards.forEach(renderCard);

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");

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

modals.forEach(closeByOverlay);
