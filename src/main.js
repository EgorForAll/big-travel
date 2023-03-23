import { generateRandomPoint} from "./mock/point";
import { generateRandomOffer } from "./mock/offer";
import { generateFilter } from "./mock/filter";
import { render, RenderPosition } from "./utils/render";
import { closeEditForm } from "./utils/point";
import EmptyTripInfo from "./view/trip-info-empty";
import MainMenuView from './view/main-menu';
import SortTemplateView from "./view/trip-sort";
import TripCostView from "./view/trip-cost";
import FitersView from "./view/filter";
import TripInfoView from "./view/trip-info-template";
import PointView from "./view/point";
import EmptyCostView from "./view/empty-cost";
import EmptyList from "./view/list-empty";
import PointsListView from "./view/list";
import PointEditForm from "./view/edit-point";
  console.log(PointEditForm)
const POINT_COUNT = 18;

const points = new Array(POINT_COUNT).fill().map(generateRandomPoint);
const offers = new Array(POINT_COUNT).fill().map(generateRandomOffer);
const filters = generateFilter(points);

const siteBodyElement = document.querySelector('.page-body');
const siteMainElement = siteBodyElement.querySelector('.trip-main');
const siteTripBoardElement = siteBodyElement.querySelector('.trip-events');

const siteMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render(siteMenuElement, new MainMenuView(), RenderPosition.BEFOREEND);

const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
render(siteFilterElement, new FitersView(filters), RenderPosition.BEFOREEND);

if (points.length === 0) {
render(siteMainElement, new EmptyTripInfo(), RenderPosition.AFTERBEGIN);
render(siteMainElement, new EmptyCostView(), RenderPosition.AFTERBEGIN);
render(siteTripBoardElement, new EmptyList(), RenderPosition.AFTERBEGIN);
} else {

render(siteMainElement, new TripInfoView(points).getElement(), RenderPosition.AFTERBEGIN);

const TripInfoElement = siteBodyElement.querySelector('.trip-info');
render(TripInfoElement, new TripCostView(points), RenderPosition.BEFOREEND);

render(siteTripBoardElement, new SortTemplateView(), RenderPosition.BEFOREEND);
render(siteTripBoardElement, new PointsListView(), RenderPosition.BEFOREEND);

const sitePointsList = siteBodyElement.querySelector('.trip-events__list');

for (let i = 0; i < POINT_COUNT; i++) {
  const pointComponent = new PointView(points[i], offers[i]);
  const editForm = new PointEditForm(points[i], offers[i]);
  const editFormTemplate = editForm.getElement();
  const pointListItem = pointComponent.getElement();
  const eventDiv = pointListItem.querySelector('.event');

  render(sitePointsList, pointListItem, RenderPosition.AFTERBEGIN);
  render(pointListItem, editFormTemplate, RenderPosition.BEFOREEND);
  pointListItem.replaceChild(eventDiv, editFormTemplate);

  const onEscButton = (evt) => {
    evt.preventDefault();
    if (evt.key === 'Escape' || evt.key === 'Esc') {
    pointListItem.replaceChild(eventDiv, editFormTemplate);
    document.removeEventListener('keydown', onEscButton)
    }
  }

  pointComponent.setShowFormHanler(() => {
    pointListItem.replaceChild(editFormTemplate, eventDiv);
    document.addEventListener('keydown', onEscButton)
  })

  editForm.hideEditFormClickHandler(() => {
    pointListItem.replaceChild(eventDiv, editFormTemplate);
    document.removeEventListener('keydown', onEscButton);
  })

  editForm.setFormSubmitHandler(() => {
      pointListItem.replaceChild(eventDiv, editFormTemplate);
      document.removeEventListener('keydown', onEscButton);
    })
}

}

