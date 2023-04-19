import Abstract from "./abstract";

export default class ButtonNew extends Abstract {
    constructor() {
        super();
        this._button = this.getElement();
        this.setDisabledStatus()
        this._onButtonNewClick = this._onButtonNewClick.bind(this);
    }

    setEnabledStatus() {
        if (!this._button.hasAttribute('disabled')) {
            return;
        }
    }
}