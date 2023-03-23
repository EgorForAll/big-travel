import Abstract from "./abstract";

const createEmptyListTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
}

export default class EmptyList extends Abstract{
  getTemplate() {
    return createEmptyListTemplate();
  }
}