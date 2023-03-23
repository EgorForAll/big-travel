import Abstract from "./abstract";
const createTripCost = (points) => {
  const initialValue = 0;
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${points.reduce((acc, val) => acc + val.price, initialValue)}</span>
            </p>`;
}

export default class TripCostView extends Abstract {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripCost(this._points);
  }

}