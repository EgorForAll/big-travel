import { createElement } from "../utils";

const createEmptyTripInfo = () => {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">Add a point</h1>
              <p class="trip-info__dates"></p>
            </div>
          </section>`;
}

export default class EmptyTripInfo {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEmptyTripInfo();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element
  }

  removeElement() {
    this._element = null;
  }
}