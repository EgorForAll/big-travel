import SortTemplateView from "../view/trip-sort";
import PointView from "../view/point";
import PointEditForm from "../view/edit-point";
import TripInfoView from "../view/trip-info-template";
import EmptyTripInfo from "../view/trip-info-empty";
import TripCostView from "../view/trip-cost";
import PointsListView from "../view/list";
import EmptyList from "../view/list-empty";
import EmptyCostView from "../view/empty-cost";
import { render,  RenderPosition } from "../utils/render";

const siteMain = document.querySelector('.trip-main');

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._pointComponent = new PointView();
    this._sortComponent = new SortTemplateView();
    this._pointEditComponent = new PointEditForm();
    this._emptyCostComponent = new EmptyCostView();
    this._emptyTripInfo = new EmptyTripInfo();
    this._pointsListComponent = new PointsListView();
    this._emptyListComponent = new EmptyList();
  }

  init(boardPoints) {
    this._boardPoints = boardPoints.slice();
    render(this._boardContainer, this._pointsListComponent, RenderPosition.BEFOREEND);

    this._renderTripInfo(this._boardPoints);
    this._renderCost(boardPoints);
    this._renderBoard();
  }

  _renderTripInfo(points) {
    if (this._boardPoints.length === 0) {
      render(siteMain, this._emptyTripInfo, RenderPosition.AFTERBEGIN);
      return;
    }

    this._tripInfoComponent = new TripInfoView(points);
    render(siteMain, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderCost(points) {
    if (this._boardPoints.length === 0) {
      render(siteMain, this._emptyCostComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    this._tripCostComponent = new TripCostView(points);
    render(siteMain, this._tripCostComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPointsList() {
    render(this._boardContainer, this._pointsListComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointComponent = new PointView(point);
    const editForm = new PointEditForm(point);
    const editFormTemplate = editForm.getElement();
    const pointListItem = pointComponent.getElement();
    const eventDiv = pointListItem.querySelector('.event');

    const onEscButton = (evt) => {
    evt.preventDefault();
    if (evt.key === 'Escape' || evt.key === 'Esc') {
    pointListItem.replaceChild(eventDiv, editFormTemplate);
    document.removeEventListener('keydown', onEscButton)
    }
  }

  pointComponent.setShowFormHanler(() => {
    pointListItem.replaceChild(editFormTemplate, eventDiv);
    document.addEventListener('keydown', onEscButton)
  })

  editForm.hideEditFormClickHandler(() => {
    pointListItem.replaceChild(eventDiv, editFormTemplate);
    document.removeEventListener('keydown', onEscButton);
  })

  editForm.setFormSubmitHandler(() => {
      pointListItem.replaceChild(eventDiv, editFormTemplate);
      document.removeEventListener('keydown', onEscButton);
    })

  render(this._pointsListComponent, pointComponent, RenderPosition.BEFOREEND);
  }

  _renderPoints() {
    if (this._boardPoints.length === 0) {
      render(this._pointsListComponent, this._emptyListComponent, RenderPosition.BEFOREEND);
      return;
    }
    this._boardPoints.slice().forEach((point) => this._renderPoint(point));
  }

  _renderEmptyList() {
    render(siteTripBoardElement, this._emptyListComponent, RenderPosition.AFTERBEGIN);
  }

  _renderBoard() {
  if (this._boardPoints === 0) {
    this._renderEmptyList();
    return;
    }

    this._renderSort();
    this._renderPoints();
  }
}