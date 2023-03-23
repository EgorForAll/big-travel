import Abstract from "./abstract";

const createPointListTemplate = () => {
return  `<ul class="trip-events__list"></ul>`;
}

export default class PointsListView extends Abstract {

  getTemplate() {
    return createPointListTemplate();
  }

}