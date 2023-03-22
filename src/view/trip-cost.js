import { createElement } from "../utils";
const createTripCost = (points) => {
  const initialValue = 0;
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${points.reduce((acc, val) => acc + val.price, initialValue)}</span>
            </p>`;
}

export default class TripCostView {
  constructor(points) {
    this._element = null;
    this._points = points;
  }

  getTemplate() {
    return createTripCost(this._points);
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