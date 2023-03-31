import { TYPE, CITIES, DESCS, PNG, OFFER_OPTIONS } from "./const";
import { getRandomInteger, getRandomArr, generateDate, checkPng } from "../utils/common";
import dayjs from "dayjs";
import { pickElementDependOnValue } from "../utils/point";
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
      description: getRandomArr(DESCS),
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
      const absDiff = ((this.date_to.toDate().getTime()) - (this.date_from.toDate().getTime()));
      
      var msec = absDiff;
      var hh = Math.floor(msec / 1000 / 60 / 60);
      msec -= hh * 1000 * 60 * 60;
      var mm = Math.floor(msec / 1000 / 60);
      return `${hh}H ${mm}M`
    }
    }  
  }

  export const EMPTY_POINT = {
    type: TYPE[0],
    price: 0,
    date_from: dayjs(),
    date_to: dayjs(),
    is_favorite: false,
    destination: {
      description: getRandomArr(DESCS),
      name: getRandomArr(CITIES),
      pictures: []
      },
    get differenceTime() {
      const absDiff = ((this.date_to.toDate().getTime()) - (this.date_from.toDate().getTime()));
      
      var msec = absDiff;
      var hh = Math.floor(msec / 1000 / 60 / 60);
      msec -= hh * 1000 * 60 * 60;
      var mm = Math.floor(msec / 1000 / 60);
      return `${hh}H ${mm}M`
    },
    get image() {
      return PNG[7];
    },
    offer: {
      type: getRandomArr(TYPE),
      options: ['Switch to comfort', 'Order Uber']
    }
  }
