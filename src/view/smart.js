import Abstract from "./abstract";

export default class Smart extends Abstract {
  constructor() {
    super();
    this._state = {};
  }

  updateElement() {
    const previousElement = this.getElement();
    const parentElement = previousElement.parentElement();
    this.removeElement();

    const newElement = this.getElement();
    parentElement.replaceChild(newElement, previousElement);
  }

  updateData(update) {
    if (!update) {
      return;
    }

    this._pointState = Object.assign(
      {},
      this._pointState,
      update,
    );

    this.updateElement();
    this.restoreListenners();
  }

  restoreListenners() {
    throw new Error ('Abstract methos is not implemented: restoreListenners');
  }
}