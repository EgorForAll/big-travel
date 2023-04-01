import FiltersView from "../view/filter";
import { replace, render, RenderPosition, remove } from "../utils/render";
import { FilterType, UpdateType } from "../mock/const";
import { pointsToFilterMap } from "../mock/filter";

export default class FilterPresenter  {
  constructor(filterContainer, filterModel, pointModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._pointModel = pointModel;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._pointModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FiltersView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const points = this._pointModel.getPoints();

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'everything',
        count: pointsToFilterMap[FilterType.EVERYTHING](points).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'future',
        count: pointsToFilterMap[FilterType.FUTURE](points).length,
      },
      {
        type: FilterType.TODAY,
        name: 'past',
        count: pointsToFilterMap[FilterType.PAST](points).length,
      }
    ];
  }
}