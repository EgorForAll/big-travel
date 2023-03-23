import { createElement } from "../utils/utils";
import Abstract from "./abstract";
const createTripCost = () => {
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
            </p>`;
}

export default class EmptyCostView extends Abstract {
  getTemplate() {
    return createTripCost();
  }
}