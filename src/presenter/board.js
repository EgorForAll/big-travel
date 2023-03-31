import SortView from "../view/trip-sort";
import PointView from "../view/point";
import PointEditForm from "../view/edit-point";
import TripInfoView from "../view/trip-info-template";
import EmptyTripInfo from "../view/trip-info-empty";
import TripCostView from "../view/trip-cost";
import PointsListView from "../view/list";
import Point from "./point";
import NewPointPresenter from "./point-new";
import EmptyList from "../view/list-empty";
import EmptyCostView from "../view/empty-cost";
import { render,  RenderPosition, remove } from "../utils/render";
import { UserAction, UpdateType } from "../mock/const";
import { SortType } from "../mock/const";
import { sortByPrice, sortByTime } from "../utils/point";

const siteMain = document.querySelector('.trip-main');

export default class Board {
  constructor(boardContainer, pointModel) {
    this._boardContainer = boardContainer;
    this._pointModel = pointModel
    this._sortComponent = null;
    this._pointComponent = new PointView();
    this._pointEditComponent = new PointEditForm();
    this._emptyCostComponent = new EmptyCostView();
    this._emptyTripInfo = new EmptyTripInfo();
    this._pointsListComponent = new PointsListView();
    this._emptyListComponent = new EmptyList();
    this._pointNewPresenter = new NewPointPresenter(this._pointsListComponent, this._handleViewAction);

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointModel.addObserver(this._handleModelEvent);
    this._currentSortType = SortType.DAY;
    this._pointPresenter = {};
  }

  _getPoints() {

    switch (this._currentSortType) {
      case SortType.TIME:
        return this._pointModel.getPoints().slice().sort(sortByTime);
      case SortType.PRICE:
        return this._pointModel.getPoints().slice().sort(sortByPrice);
    }

    return this._pointModel.getPoints();
  }

  init() {
    render(this._boardContainer, this._pointsListComponent, RenderPosition.BEFOREEND);

    console.log(this._getPoints())
    this._renderTripInfo(this._getPoints());
    this._renderCost(this._getPoints());
    this._renderBoard();
  }

  createPoint() {
    this._currentSortType = SortType.DAY;
    this._pointNewPresenter.init();
  }

  _handleSortTypeChange(sortType) {
      if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

   _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
      switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
        switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _renderTripInfo() {
    if (this._getPoints().length === 0) {
      render(siteMain, this._emptyTripInfo, RenderPosition.AFTERBEGIN);
      return;
    }

    this._tripInfoComponent = new TripInfoView(this._getPoints());
    render(siteMain, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderCost(points) {
    if (this._getPoints().length === 0) {
      render(siteMain, this._emptyCostComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    this._tripCostComponent = new TripCostView(points);
    render(siteMain, this._tripCostComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
    this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    render(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPointsList() {
    render(this._boardContainer, this._pointsListComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
  const pointPresenter = new Point(this._pointsListComponent, this._handleViewAction, this._handleModeChange);
  pointPresenter.init(point);
  this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderEmptyList() {
    render(this._pointsListComponent, this._emptyListComponent, RenderPosition.AFTERBEGIN);
  }

  _renderBoard() {
  if (this._getPoints().length === 0) {
    this._renderEmptyList();
    return;
    }
    const points = this._getPoints();

    this._renderSort();
    this._renderPoints(points);
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _clearBoard({resetSortType = false} = {}) {

    this._pointNewPresenter.destroy();

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortComponent);
    remove(this._emptyListComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }
}
