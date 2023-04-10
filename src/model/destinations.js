import Observer from "../utils/observer";

export default class DestinationModel extends Observer {

    constructor() {
        super();
        this.destinations = [];
    }

    setDestinations(updateType, destinations) {
        this.destinations = destinations
        this._notify(updateType);
    }

    getDestinations() {
        return this.destinations;
    }
}