import Abstract from "./abstract";

export const createTripInfoTemplate = (points) => {

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">
              ${points[0].destination.name} &mdash; ${points[points.length % 2 === 0 ?  points.length/2 : (points.length-1)/2].destination.name} &mdash; ${points[points.length-1].destination.name}</h1>
              <p class="trip-info__dates"></p>
            </div>
          </section>`;
}

export default class TripInfoView extends Abstract {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
  }
}