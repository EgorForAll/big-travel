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
import { UserAction, UpdateType } from "../mock/const";
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
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
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

    this._renderTripInfo(this._getPoints());
    this._renderCost(this._getPoints());
    this._renderBoard();
  }

  _handleSortTypeChange(sortType) {
      if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearPointList();
    this._renderPoints();
  }

  _handleModeChange() {
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
      case UserAction.UPDATE_TASK:
        this._pointModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this._pointModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this._pointModel.deleteTask(updateType, update);
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
        this._taskPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
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

  _renderPoints() {
    this._getPoints().forEach((point) => this._renderPoint(point));
  }

  _renderEmptyList() {
    render(this._pointsListComponent, this._emptyListComponent, RenderPosition.AFTERBEGIN);
  }

  _renderBoard() {
  if (this._getPoints().length === 0) {
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
