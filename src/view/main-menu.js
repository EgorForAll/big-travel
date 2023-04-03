import Abstract from "./abstract";

const createMainMenu = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn btn__table trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn btn__stats" href="#">Stats</a>
  </nav>
  `;
}

export default class MainMenuView extends Abstract {
  getTemplate() {
    return createMainMenu();
  }
}