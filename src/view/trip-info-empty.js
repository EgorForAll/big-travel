import Abstract from "./abstract";

const createEmptyTripInfo = () => {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">Add a point</h1>
              <p class="trip-info__dates"></p>
            </div>
          </section>`;
}

export default class EmptyTripInfo extends Abstract {
  getTemplate() {
    return createEmptyTripInfo();
  }
}