import { TYPE, NAMES, DESCS, OFFER_TITLES, PNG } from "./const";
import { getRandomInteger, getRandomArr, generateDate, checkPng } from "../utils/common";
import dayjs from "dayjs";

export const generateRandomPoint = () => {
  const getRandomDate = generateDate();

  return {
    type: getRandomArr(TYPE),
    price: getRandomInteger(0, 1500),
    date_from: getRandomDate.dateFrom,
    date_to: getRandomDate.dateTo,
    is_favorite: Boolean(getRandomInteger(0, 1)),
    destination: {
      description: getRandomArr(DESCS),
      name: getRandomArr(NAMES),
      pictures: [
            `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
            `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
            `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
            `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,      
        ]
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
    type: getRandomArr(TYPE),
    price: 0,
    date_from: dayjs(),
    date_to: dayjs(),
    is_favorite: false,
    destination: {
      description: getRandomArr(DESCS),
      name: getRandomArr(NAMES),
      pictures: []
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
