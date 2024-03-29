import PointView from "../view/point";
import PointEditForm from "../view/edit-point";
import { RenderPosition, render, replace, remove } from "../utils/render";
import { UpdateType, UserAction } from "../mock/const";

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor (pointListContainer, changeData, changeMode, offers, destinations) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._offers = offers;
    this._destinations = destinations;

    this._pointComponent = null;
    this._editPointComponent = null;
    this._mode = Mode.DEFAULT;

    this._handlePointClick = this._handlePointClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormClick = this._handleFormClick.bind(this);
    this._onEscDownHandler = this._onEscDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._editPointComponent;

    this._pointComponent = new PointView(point);
    this._editPointComponent = new PointEditForm(point, this._offers, this._destinations);

    this._pointComponent.setShowFormHanler(this._handlePointClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._editPointComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._editPointComponent._onDateFromChange(this._handleFormSubmit);
    this._editPointComponent._onDateToChange(this._handleFormSubmit);
    this._editPointComponent.hideEditFormClickHandler(this._handleFormClick);
    this._editPointComponent.setDeleteClickHandler(this._handleDeleteClick);

  if (prevPointComponent === null || prevPointEditComponent === null) {
    render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
    return;
   }

  if (this._mode === Mode.DEFAULT) {
    replace(this._pointComponent, prevPointComponent);
    }

  if (this._mode === Mode.EDITING) {
      replace(this._editPointComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._editPointComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditFormToPoint();
    }
  }

  _replacePointToEditForm() {
    replace(this._editPointComponent, this._pointComponent);
    document.addEventListener('keydown', this._onEscDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceEditFormToPoint() {
    this._editPointComponent.resetInput(this._point);
    replace(this._pointComponent, this._editPointComponent);
    document.removeEventListener('keydown', this._onEscDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleFavoriteClick() {
    console.log('yes')
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._point,
        {
          is_favorite: !this._point.is_favorite,
        },
      ),
    );
  }

  _onEscDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
    this._editPointComponent.reset(this._point);
    this._replaceEditFormToPoint();
    }
  }

  _handlePointClick(){
    this._replacePointToEditForm();
  }

  _handleFormSubmit(update){
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      update,
    );
    this._replaceEditFormToPoint();
  }

  _handleFormClick() {
    this._replaceEditFormToPoint();
  }

  _handleDeleteClick(point) {
    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  }

}
