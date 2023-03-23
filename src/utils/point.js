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