import { createElement } from "../utils";

export const createTripInfoTemplate = (points) => {

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">
              ${points[0].destination.name} &mdash; ${points[points.length % 2 === 0 ?  points.length/2 : (points.length-1)/2].destination.name} &mdash; ${points[points.length-1].destination.name}</h1>
              <p class="trip-info__dates">${points[0].date_from.format('MMM D')}&nbsp;&mdash;&nbsp;${points[points.length-1].date_to.format('MMM D')}</p>
            </div>
          </section>`;
}

export default class TripInfoView {
  constructor(points) {
    this._element = null;
    this._points = points;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
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