import { getRandomArr, getRandomInteger } from "../utils";
import { TYPE, OFFER_TITLES } from "./const";

const generateOptions = () => {
  return {
    title: getRandomArr(OFFER_TITLES),
    price: getRandomInteger(0, 200)
  }
}

export const generateRandomOffer = () => {

    return {
      type: getRandomArr(TYPE),
      options_number: getRandomInteger(1, 3),
      get options() {
        const optionsArr = new Array(this.options_number).fill().map(generateOptions);
        return optionsArr;
      }

    }
}