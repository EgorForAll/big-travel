import { render, RenderPosition, remove } from "../utils/render";
import { UserAction, UpdateType } from "../mock/const";
import PointEditForm from "../view/edit-point";
import { nanoid } from "nanoid";

export default class NewPointPresenter {
  constructor(container, changeData) {
    this._pointListContainer = container;
    this._changeData = changeData;
    this._pointEditComponent = null;
    this._offers = null;
    this._destination = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(offers, destinations) {
    this._offers = offers;
    this._destination = destinations;

    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new PointEditForm(this._offers, this._destination);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._pointEditComponent.hideEditFormClickHandler(this._handleDeleteClick);

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,

      Object.assign({id: nanoid()}, point),
    );

    this.destroy();
  }

    _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}