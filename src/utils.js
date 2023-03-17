import dayjs from "dayjs";

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

  const dateFrom = dayjs(dateRandom);
  const dateTo = dateFrom.add(getRandomInteger(1, 4), 'hour').add(getRandomInteger(0, 60), 'minutes');
  
  return {
    dateFrom: dateFrom,
    dateTo: dateTo
  }
}

// Поиск картинки по типу
const checkPng = (type, png) => {
  for (let item of png) {
    let path = item.slice(10, -4);
    if (type == path) {
      return item;
    }
  }
}

const sumPrice = (arr) => {arr.reduce((accumulator, current) => accumulator + current.price)};


export {getRandomInteger, getRandomArr, generateDate, checkPng, sumPrice }