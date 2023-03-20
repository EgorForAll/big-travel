import { getRandomArr, getRandomInteger } from "../utils";
import { TYPE, OFFER_TITLES } from "./const";

export const generateRandomOffer = () => {

    return {
      type: getRandomArr(TYPE),
      options: [
        {
          title: 'Upgrade to a business class',
          price: 100
        },
        {
          title: 'Add luggage',
          price: 50
        },
        {
          title: 'Rent a car',
          price: 150
        }
      ]
    }
}