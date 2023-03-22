import { generateRandomPoint} from "./mock/point";
import { generateRandomOffer } from "./mock/offer";
import { generateFilter } from "./mock/filter";
import { renderElement, RenderPosition } from "./utils";
import MainMenuView from './view/main-menu';
import SortTemplateView from "./view/trip-sort";
import TripCostView from "./view/trip-cost";
import FitersView from "./view/filter";
import TripInfoView from "./view/trip-info-template";
import PointView from "./view/point";
import PointsListView from "./view/list";
import PointEditForm from "./view/edit-point";

const POINT_COUNT = 18;

const points = new Array(POINT_COUNT).fill().map(generateRandomPoint);
const offers = new Array(POINT_COUNT).fill().map(generateRandomOffer);
const filters = generateFilter(points);

const siteBodyElement = document.querySelector('.page-body');

const siteMainElement = siteBodyElement.querySelector('.trip-main');
renderElement(siteMainElement, new TripInfoView(points).getElement(), RenderPosition.AFTERBEGIN);

const TripInfoElement = siteBodyElement.querySelector('.trip-info');
renderElement(TripInfoElement, new TripCostView(points).getElement(), RenderPosition.BEFOREEND);

const siteMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
renderElement(siteMenuElement, new MainMenuView().getElement(), RenderPosition.BEFOREEND);

const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
renderElement(siteFilterElement, new FitersView(filters).getElement(), RenderPosition.BEFOREEND);

const siteTripBoardElement = siteBodyElement.querySelector('.trip-events');
renderElement(siteTripBoardElement, new SortTemplateView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteTripBoardElement, new PointsListView().getElement(), RenderPosition.BEFOREEND);

const sitePointsList = siteBodyElement.querySelector('.trip-events__list');

for (let i = 0; i < POINT_COUNT; i++) {
  const pointComponent = new PointView(points[i], offers[i]);
  const editForm = new PointEditForm(points[i], offers[i]);
  const editFormTemplate = editForm.getElement();
  const pointListItem = pointComponent.getElement();
  const eventDiv = pointListItem.querySelector('.event');

  renderElement(sitePointsList, pointListItem, RenderPosition.AFTERBEGIN);
  renderElement(pointListItem, editFormTemplate, RenderPosition.BEFOREEND);

  const showEditFormButton = pointListItem.querySelector('.event__rollup-btn');
  showEditFormButton.addEventListener('click', () =>  pointListItem.replaceChild(editFormTemplate, eventDiv));

  const hideEditFormButton = editFormTemplate.querySelector('.event__rollup-btn');
  hideEditFormButton.addEventListener('click', () => pointListItem.replaceChild(eventDiv, editFormTemplate));

  const editPointButton = editFormTemplate.querySelector('.event__save-btn');
  editPointButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    pointListItem.replaceChild(eventDiv, editFormTemplate);
  });
}


