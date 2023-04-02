import { TYPE, CITIES, DESCS, PNG, OFFER_OPTIONS } from "./const";
import { getRandomInteger, getRandomArr, generateDate, checkPng } from "../utils/common";
import dayjs from "dayjs";
import { pickElementDependOnValue, getDifferanceTime } from "../utils/point";
import {nanoid} from 'nanoid';

export const generateRandomPoint = () => {
  const getRandomDate = generateDate();

  return {
    id: nanoid(),
    type: getRandomArr(TYPE),
    price: getRandomInteger(0, 1500),
    date_from: getRandomDate.dateFrom,
    date_to: getRandomDate.dateTo,
    is_favorite: Boolean(getRandomInteger(0, 1)),
    destination: {
      get description() {
        return DESCS[CITIES.indexOf(this.name)];
      },
      name: getRandomArr(CITIES),
      pictures: [
            `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
            `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
            `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
            `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,      
        ]
      },
    get offer() {
      return pickElementDependOnValue(this.type, OFFER_OPTIONS)
    },
    get image() {
      return checkPng(this.type.toLowerCase(), PNG)
    },
    get differenceTime() {
      return getDifferanceTime(this.date_from, this.date_to);
    }
    }  
  }

  const dateForEmptyPoint = generateDate();

  export const EMPTY_POINT = {
    type: TYPE[0],
    price: 0,
    date_from: dateForEmptyPoint.dateFrom,
    date_to: dateForEmptyPoint.dateTo,
    is_favorite: false,
    destination: {
      description: getRandomArr(DESCS),
      name: getRandomArr(CITIES),
      pictures: [
            `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
            `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
            `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
            `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,      
        ]
      },
    get differenceTime() {
      return getDifferanceTime(this.date_from, this.date_to);
    },
    get image() {
      return PNG[7];
    },
    get offer() {
      return pickElementDependOnValue(this.type, OFFER_OPTIONS)
    }
  }
