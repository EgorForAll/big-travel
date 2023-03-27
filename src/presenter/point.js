import PointView from "../view/point";
import PointEditForm from "../view/edit-point";
import { RenderPosition, render, replace, remove } from "../utils/render";

export default class Point {
  constructor (pointListContainer) {
    this._pointListContainer = pointListContainer;

    this._pointComponent = null;
    this._editPoint = null;

    this._handlePointClick = this._handlePointClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormClick = this._handleFormClick.bind(this);
    this._onEscDownHandler = this._onEscDownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._taskComponent;
    const prevPointEditComponent = this._taskEditComponent;

    this._pointComponent = new PointView(point);
    this._editPoint = new PointEditForm(point);

    this._pointComponent.setShowFormHanler(this._handlePointClick);
    this._editPoint.setFormSubmitHandler(this._handleFormSubmit);
    this._editPoint.hideEditFormClickHandler(this._handleFormClick);

  if (prevPointComponent === null || prevPointEditComponent === null) {
    render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
    return;
   }

  if (this._pointListContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

  if (this._pointListContainer.getElement().contains(prevPointEditComponent.getElement())) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  _replacePointToEditForm() {
    replace(this._editPoint, this._pointComponent);
    document.addEventListener('keydown', this._onEscDownHandler)
  }

  _replaceEditFormToPoint() {
    replace(this._pointComponent, this._editPoint);
    document.removeEventListener('keydown', this._onEscDownHandler);
  }

  _onEscDownHandler(evt) {
   evt.preventDefault();
    if (evt.key === 'Escape' || evt.key === 'Esc') {
    this._replaceEditFormToPoint();
    }
  }

  _handlePointClick(){
    this._replacePointToEditForm();
  }

  _handleFormSubmit(){
    this._replaceEditFormToPoint();
  }

  _handleFormClick() {
    this._replaceEditFormToPoint();
  }

}