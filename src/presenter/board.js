import SortView from "../view/trip-sort";
import PointView from "../view/point";
import PointEditForm from "../view/edit-point";
import TripInfoView from "../view/trip-info-template";
import TripCostView from "../view/trip-cost";
import PointsListView from "../view/list";
import Point from "./point";
import NewPointPresenter from "./point-new";
import EmptyList from "../view/list-empty";
import LoadingView from '../view/loading';
import { pointsToFilterMap } from "../mock/filter";
import { render,  RenderPosition, remove } from "../utils/render";
import { UserAction, UpdateType } from "../mock/const";
import { SortType, FilterType } from "../mock/const";
import { sortByPrice, sortByTime, sortByDay} from "../utils/point";

const siteMain = document.querySelector('.trip-main');

export default class Board {
  constructor(boardContainer, pointModel, filterModel) {
    this._boardContainer = boardContainer;
    this._pointModel = pointModel;
    this._filterModel = filterModel;
    this._isLoading = true;
    this._sortComponent = null;
    this._pointComponent = new PointView();
    this._pointEditComponent = new PointEditForm();
    this._pointsListComponent = new PointsListView();
    this._emptyListComponent = new EmptyList();
    this._loadingComponent = new LoadingView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._pointNewPresenter = new NewPointPresenter(this._pointsListComponent, this._handleViewAction);
    this._currentSortType = SortType.DAY;
    this._pointPresenter = {};
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointModel.getPoints();
    console.log(points)
    const filtredPoints = pointsToFilterMap[filterType](points);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filtredPoints.sort(sortByDay);
      case SortType.TIME:
        return filtredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filtredPoints.sort(sortByPrice);
    }

    return filtredPoints;
  }

  init() {
    render(this._boardContainer, this._pointsListComponent, RenderPosition.BEFOREEND);
    this._renderBoard();
  }

  createPoint() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
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

  _handleViewAction(actionType, UpdateType, update) {

    console.log(this._pointModel.getPoints())
    switch (actionType) {
    case UserAction.UPDATE_POINT:
      this._pointModel.updatePoint(UpdateType, update);
      break;
    case UserAction.ADD_POINT:
      this._pointModel.addPoint(UpdateType, update);
      break;
    case UserAction.DELETE_POINT:
      this._pointModel.deletePoint(UpdateType, update);
      break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  _renderTripInfo() {
    if (this._getPoints().length === 0) {
      return;
    }

    this._tripInfoComponent = new TripInfoView(this._getPoints());
    this._tripCostComponent = new TripCostView(this._getPoints());
    render(siteMain, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent.getElement(), this._tripCostComponent, RenderPosition.BEFOREEND);
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

  _renderLoading() {
    render(this._boardContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (this._getPoints().length === 0) {
      this._renderEmptyList();
      return;
      }
    
      this._renderTripInfo(this._getPoints());
      this._renderPoints(this._getPoints());
      this._renderSort();
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
    this._tripInfoComponent !== undefined ? remove(this._tripInfoComponent) : null;
    remove(this._emptyListComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

    show() {
      this._boardContainer.style.display = 'block';
      this._currentSortType = SortType.DAY;
      this._clearBoard();
      this._renderBoard();
    }

    hide() {
      this._boardContainer.style.display = 'none';
    }
  }
