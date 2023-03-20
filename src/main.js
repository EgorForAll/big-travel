import { createEditPointTemplate } from "./view/edit-point";
import { filterTemplate } from "./view/filter";
import { createMainMenu } from "./view/main-menu";
import { createTripBoardTemplate } from "./view/trip-board";
import { createNewPointTemplate } from "./view/new-point";
import { createPointTemplate } from "./view/point";
import { createTripCost } from "./view/trip-cost";
import { createEmptyListTemplate } from "./view/list-empty";
import { createTripInfoTemplate } from "./view/trip-info-template";
import { generateRandomPoint} from "./mock/point";
import { generateRandomOffer } from "./mock/offer";
import { generateFilter } from "./mock/filter";


const POINT_COUNT = 18;

const points = new Array(POINT_COUNT).fill().map(generateRandomPoint);
console.log(points);
const offers = new Array(POINT_COUNT).fill().map(generateRandomOffer);
console.log(offers)
const filters = generateFilter(points);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
}

const siteBodyElement = document.querySelector('.page-body');

const siteMainElement = siteBodyElement.querySelector('.trip-main');
render(siteMainElement, createTripInfoTemplate(points), 'afterbegin');

const TripInfoElement = siteBodyElement.querySelector('.trip-info');
render(TripInfoElement, createTripCost(points), 'beforeend');

const siteMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render(siteMenuElement, createMainMenu(), 'beforeend');

const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
render(siteFilterElement, filterTemplate(filters), 'beforeend');

const siteTripBoardElement = siteBodyElement.querySelector('.trip-events');
render(siteTripBoardElement, createTripBoardTemplate(), 'beforeend');

const eventListElement = siteTripBoardElement.querySelector('.trip-events__list');

// render(eventListElement, createNewPointTemplate(), 'beforeend');

for (let i = 0; i < POINT_COUNT; i++) {
  render(eventListElement, createPointTemplate(points[i], offers[i]), 'beforeend');
}

// Форма создания новой точки маршрута
const newEventBtn = siteMainElement.querySelector('.trip-main__event-add-btn');
newEventBtn.addEventListener('click', () => render(eventListElement, createNewPointTemplate(), 'beforeend'))

// Отрисовка формы редактирования
const rollupBtnArray = Array.from(siteBodyElement.querySelectorAll('.event__rollup-btn'));
const containerEvents = Array.from(eventListElement.querySelectorAll('.event'));
const listItemElements = Array.from(eventListElement.querySelectorAll('.trip-events__item'));

for (let i = 0; i < rollupBtnArray.length; i++) {
  rollupBtnArray[i].addEventListener('click', () => {
    listItemElements[i].removeChild(containerEvents[i]);
    render(listItemElements[i], createEditPointTemplate(points[i], offers[i]), 'beforeend');
    const form = listItemElements[i].querySelector('.event--edit');
    const formRollupBtn = form.querySelector('.event__rollup-btn');
    formRollupBtn.addEventListener('click', () => {
      listItemElements[i].removeChild(form);
      listItemElements[i].appendChild(containerEvents[i]);
    })
    })
}

