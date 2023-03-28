import PointView from "../view/point";
import PointEditForm from "../view/edit-point";
import { RenderPosition, render, replace, remove } from "../utils/render";

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor (pointListContainer, changeData, changeMode) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._editPointComponent = null;
    this._mode = Mode.DEFAULT;

    this._handlePointClick = this._handlePointClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormClick = this._handleFormClick.bind(this);
    this._onEscDownHandler = this._onEscDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._editPointComponent;

    this._pointComponent = new PointView(point);
    this._editPoint = new PointEditForm(point);

    this._pointComponent.setShowFormHanler(this._handlePointClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._editPoint.setFormSubmitHandler(this._handleFormSubmit);
    this._editPoint.hideEditFormClickHandler(this._handleFormClick);

  if (prevPointComponent === null || prevPointEditComponent === null) {
    render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
    return;
   }

  if (this._mode === Mode.DEFAULT) {
    replace(this._pointComponent, prevPointComponent);
    }

  if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditFormToPoint();
    }
  }

  _replacePointToEditForm() {
    replace(this._editPoint, this._pointComponent);
    document.addEventListener('keydown', this._onEscDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceEditFormToPoint() {
    replace(this._pointComponent, this._editPoint);
    document.removeEventListener('keydown', this._onEscDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
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
