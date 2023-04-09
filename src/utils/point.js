import dayjs from "dayjs";

// Фильтры
const today = new Date();

export const isFuture = (point) => {
  return point.date_from === null ? false : dayjs(point.date_from).isAfter(dayjs(today));
};

export const isPast = (point) => {
  return point.date_from === null ? false : dayjs(point.date_from).isBefore(dayjs(today));
}

export const closeEditForm = (evt, parent, point, form) => {
  evt.preventDefault();
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    parent.replaceChild(point, form);
  }
}

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
export const compareTwoDates = (dateA, dateB) => {
  if (dateA === null || dateB === null) {
    return null;
  }
  return dayjs(dateA).diff(dateB);
};

const getSortWeightForEmptyValue = (valueA, valueB) => {
  if (valueA === null) {
    return 1;
  }

  if (valueB === null) {
    return -1;
  }

  if (valueA === null && valueB === null) {
    return 0;
  }

  return null;
}

export const sortByDay = (pointA, pointB) => {
  const firstPointTime = pointA.date_from;
  const nextPointTime = pointB.date_from; 
  const sortWeightForEmptyValue = getSortWeightForEmptyValue(firstPointTime, nextPointTime);

  if (sortWeightForEmptyValue !== null){
    return sortWeightForEmptyValue;
  }

  return dayjs(firstPointTime).isAfter(dayjs(nextPointTime)) ? 1 : -1;
}

export const sortByPrice = (pointA, pointB) => {
  const sortWeightForEmptyValue = getSortWeightForEmptyValue(pointA.price, pointB.price);

  if (sortWeightForEmptyValue !== null){
    return sortWeightForEmptyValue;
  }

  return pointB.price - pointA.price;
  }

export const sortByTime = (pointA, pointB) => {
  const durationPointA = compareTwoDates(pointA.date_to, pointA.date_from);
  const durationPointB = compareTwoDates(pointB.date_to, pointB.date_from);

  const sortWeightForEmptyValue = getSortWeightForEmptyValue(durationPointA, durationPointB);

  if (sortWeightForEmptyValue !== null) {
    return sortWeightForEmptyValue;
  }

  return durationPointB - durationPointA;
}

export const pickElementDependOnValue = (value, elementValueDependency) => 
  elementValueDependency[Object.keys(elementValueDependency).find((type) => type === value)];

  export const isDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D');
};

export const getDifferanceTime = (dateFrom, dateTo) => {

  let diff = Math.floor(dateTo.getTime() - dateFrom.getTime());

  const hh = Math.floor(diff / 1000 / 60 / 60);
  diff -= hh * 1000 * 60 * 60;
  const mm = Math.floor(diff / 1000 / 60);

  return `${hh}H ${mm}M`
}
