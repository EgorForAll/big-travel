import { createEditPointTemplate } from "./view/edit-point";
import { createFilterTemplate } from "./view/filter";
import { createMainMenu } from "./view/main-menu";
import { createTripBoardTemplate } from "./view/trip-board";
import { createNewPointTemplate } from "./view/new-point";
import { createPointTemplate } from "./view/point";
import { createTripCost } from "./view/trip-cost";
import { createEmptyListTemplate } from "./view/list-empty";
import { createTripInfoTemplate } from "./view/trip-info-template";
import { generateRandomPoint, generateRandomOffer } from "./mock/point";
import "./utils"

const POINT_COUNT = 18;

const points = new Array(POINT_COUNT).fill().map(generateRandomPoint);
console.log(points)
const offers = new Array(POINT_COUNT).fill().map(generateRandomOffer);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
}

const siteBodyElement = document.querySelector('.page-body');

const siteMainElement = siteBodyElement.querySelector('.trip-main');
render(siteMainElement, createTripInfoTemplate(), 'afterbegin');

const TripInfoElement = siteBodyElement.querySelector('.trip-info');
render(TripInfoElement, createTripCost(points), 'beforeend');

const siteMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render(siteMenuElement, createMainMenu(), 'beforeend');

const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
render(siteFilterElement, createFilterTemplate(), 'beforeend');

const siteTripBoardElement = siteBodyElement.querySelector('.trip-events');
render(siteTripBoardElement, createTripBoardTemplate(), 'beforeend');

const eventListElement = siteTripBoardElement.querySelector('.trip-events__list');

// render(eventListElement, createEditPointTemplate(), 'beforeend');
// render(eventListElement, createNewPointTemplate(), 'beforeend');

for (let i = 0; i < POINT_COUNT; i++) {
  render(eventListElement, createPointTemplate(points[i], offers[i]), 'beforeend');
}

