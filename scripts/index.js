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
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileCloseModal = profileEditModal.querySelector(
  "#profile-close-modal"
);
const addCloseModal = document.querySelector("#add-close-modal");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-descr");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardTitleInput = document.querySelector("#add-card-title-input");
const addCardURLInput = document.querySelector("#add-card-url-input");
const profileEditForm = profileEditModal.querySelector("#edit-form-modal");
const addCardEditForm = addCardModal.querySelector("#add-form-modal");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardsListEl = document.querySelector(".cards__list");
/**------------------------------------------------------------------------
 **                           FUNCTION
 *------------------------------------------------------------------------**/
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
  addCardModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.title;
  cardImageEl.alt = cardData.title;
  cardImageEl.src = cardData.link;
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
  closePopup();
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  title = addCardTitleInput.value;
  link = addCardURLInput.value;
  rendercard({ title, link }, cardsListEl);
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

addNewCardButton.addEventListener("click", () => {
  addCardModal.classList.add("modal_opened");
});

profileCloseModal.addEventListener("click", closePopup);
addCloseModal.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardEditForm.addEventListener("submit", handleAddCardSubmit);

/**------------------------------------------------------------------------
 **                            LOOPS
 *------------------------------------------------------------------------**/
initialCards.forEach((cardData) => rendercard(cardData));

const likeButtons = document.querySelectorAll("#card-like-button");
console.log(likeButtons);
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle(".card__like-button_active");
  });
});
