const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/**------------------------------------------------------------------------
 **                            ELEMENTS
 *------------------------------------------------------------------------**/
const profileEditButton = document.querySelector("#profile-edit-button");
const profileAddButton = document.querySelector("#profile-add-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const AddCardModal = document.querySelector("#add-card-modal");
const profileCloseModal = document.querySelector("#profile-close-modal");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-descr");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = profileEditModal.querySelector("#modal-edit-form");
const AddCardEditForm = AddCardModal.querySelector("#modal-add-form");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardsListEl = document.querySelector(".cards__list");
/**------------------------------------------------------------------------
 **                           FUNCTION
 *------------------------------------------------------------------------**/
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
  AddCardModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;
  cardImageEl.src = cardData.link;
  return cardElement;
}
/**------------------------------------------------------------------------
 **                            EVENT HANDLERS
 *------------------------------------------------------------------------**/
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  console.log("form submitted");
  closePopup();
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  console.log("card added");
  closePopup();
}

/**------------------------------------------------------------------------
 **                            EVENT lISTENERS
 *------------------------------------------------------------------------**/
profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileAddButton.addEventListener("click", () => {
  AddCardModal.classList.add("modal_opened");
});

profileCloseModal.addEventListener("click", closePopup);
AddCardModal.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
//AddCardEditForm.addEventListener("submit", handleAddCardSubmit);

/**------------------------------------------------------------------------
 **                            LOOPS
 *------------------------------------------------------------------------**/
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsListEl.append(cardElement);
});
