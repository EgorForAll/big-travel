import SortView from "../view/trip-sort";
import PointView from "../view/point";
import PointEditForm from "../view/edit-point";
import TripInfoView from "../view/trip-info-template";
import EmptyTripInfo from "../view/trip-info-empty";
import TripCostView from "../view/trip-cost";
import PointsListView from "../view/list";
import Point from "./point";
import EmptyList from "../view/list-empty";
import EmptyCostView from "../view/empty-cost";
import { render,  RenderPosition } from "../utils/render";
import { updateItem } from "../utils/common";
import { SortType } from "../mock/const";
import { sortByPrice, sortByTime } from "../utils/point";

const siteMain = document.querySelector('.trip-main');

export default class Board {
  constructor(boardContainer, pointModel) {
    this._boardContainer = boardContainer;
    this._pointModel = pointModel
    this._pointComponent = new PointView();
    this._sortComponent = new SortView();
    this._pointEditComponent = new PointEditForm();
    this._emptyCostComponent = new EmptyCostView();
    this._emptyTripInfo = new EmptyTripInfo();
    this._pointsListComponent = new PointsListView();
    this._emptyListComponent = new EmptyList();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._currentSortType = SortType.DAY;
    this._pointPresenter = {};
  }

  _getPoints() {
    return this._pointModel.getPoints();
  }

  init(boardPoints) {
    this._boardPoints = boardPoints.slice();
    this._sourcedBoardPoints = boardPoints.slice();
    render(this._boardContainer, this._pointsListComponent, RenderPosition.BEFOREEND);

    this._renderTripInfo(this._boardPoints);
    this._renderCost(boardPoints);
    this._renderBoard();
  }

  _sortPoints(sortType) {

    switch (sortType) {
      case SortType.DAY:
        this._boardPoints = this._sourcedBoardPoints.slice();
        break;
      case SortType.PRICE:
        this._boardPoints.sort(sortByPrice);
        break;
      case SortType.TIME:
        this._boardPoints.sort(sortByTime);
        break;
      default:
        throw new Error('Unknown sort type');
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
      if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointList();
    this._renderPoints();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._boardPoints = updateItem(this._boardPoints, updatedPoint);
    this._sourcedBoardPoints = updateItem(this._sourcedBoardPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
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
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPointsList() {
    render(this._boardContainer, this._pointsListComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
  const pointPresenter = new Point(this._pointsListComponent, this._handlePointChange, this._handleModeChange);
  pointPresenter.init(point);
  this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._boardPoints.slice().forEach((point) => this._renderPoint(point));
  }

  _renderEmptyList() {
    render(this._pointsListComponent, this._emptyListComponent, RenderPosition.AFTERBEGIN);
  }

  _renderBoard() {
  if (this._boardPoints.length === 0) {
    this._renderEmptyList();
    return;
    }

    this._renderSort();
    this._renderPoints();
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }
}
