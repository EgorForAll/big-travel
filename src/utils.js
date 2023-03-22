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


// Фильтры

const isFuture = (dueDate) => {
  return dueDate === null ? false : dayjs().isAfter(dueDate, 'D');
};

const isPast = (dueDate) => {
  return dueDate === null ? fasle : dayjs().isBefore(dueDate, 'D');
}

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Принцип работы прост:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstElementChild; // 3
};
// Единственный нюанс, что HTML в строке должен иметь общую обёртку,
// то есть быть чем-то вроде <nav><a>Link 1</a><a>Link 2</a></nav>,
// а не просто <a>Link 1</a><a>Link 2</a>

export const closeEditForm = (evt, parent, point, form) => {
  evt.preventDefault();
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    parent.replaceChild(point, form);
  }
}

export {getRandomInteger, getRandomArr, generateDate, checkPng, sumPrice, isFuture, isPast }