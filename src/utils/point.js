import dayjs from "dayjs";

// Фильтры
export const isFuture = (dueDate) => {
  return dueDate === null ? false : dayjs().isAfter(dueDate, 'D');
};

export const isPast = (dueDate) => {
  return dueDate === null ? fasle : dayjs().isBefore(dueDate, 'D');
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