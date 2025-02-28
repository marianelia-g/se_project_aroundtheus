export default class Card {
  constructor({ title, link }, cardSelector, handleImageClick) {
    this._title = title;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );
    this._image.addEventListener("click", () =>
      this._handleImageClick(this._title, this._link)
    );
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button--active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._titleElement = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__trash-button");

    this._image.src = this._link;
    this._image.alt = this._title;
    this._titleElement.textContent = this._title;

    this._setEventListeners();

    return this._element;
  }
}
