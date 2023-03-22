import { createElement } from "../utils";

const createFilterItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${name}>
    <label class="trip-filters__filter-label" for="filter-${name}"
    ${isChecked ? 'checked' : ''}
    ${count === 0 ? 'disabled' : ''}
    >${name}</label>
    </div>`
  );
};

const filterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return   `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
  </form>`
};

export default class FitersView {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return filterTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

