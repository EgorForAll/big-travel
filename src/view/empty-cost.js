import { createElement } from "../utils";
const createTripCost = () => {
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
            </p>`;
}

export default class EmptyCostView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripCost();
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