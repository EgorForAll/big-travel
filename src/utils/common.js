import dayjs from "dayjs";
import { FORM_DATE_FORMAT_ONE } from "../mock/const";
// Функция по генерации случайного целого числа
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArr = (arr) => arr[getRandomInteger(0, arr.length -1)];

// Генерация случайной даты
const generateDate = () => {
  const dateRandom = new Date(2023, getRandomInteger(0, 12), getRandomInteger(0, 30), getRandomInteger(0, 24), getRandomInteger(0, 60));

  const dateFrom = dateRandom;
  let dateTo = dayjs(dateFrom);

  dateTo = dateTo.add(getRandomInteger(1, 4), 'hour').add(getRandomInteger(0, 60), 'minutes');

  dateTo = dateTo.toDate();

  return {
    dateFrom,
    dateTo
  }
}

// Поиск картинки по типу
const checkPng = (type, png) => {
  for (let item of png) {
    let path = item.slice(10, -4);
    if (type === path) {
      return item;
    }
  }
}

const sumPrice = (arr) => {arr.reduce((accumulator, current) => accumulator + current.price)};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {getRandomInteger, getRandomArr, generateDate, checkPng, sumPrice, updateItem}