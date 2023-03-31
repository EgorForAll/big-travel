import { generateRandomPoint} from "./mock/point";
import { generateFilter } from "./mock/filter";
import { render, RenderPosition } from "./utils/render";
import PointsModel from "./model/point";
import MainMenuView from './view/main-menu';
import FitersView from "./view/filter";
import BoardPresenter from "./presenter/board";

const POINT_COUNT = 6;

const points = new Array(POINT_COUNT).fill().map(generateRandomPoint);
const filters = generateFilter(points);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const siteBodyElement = document.querySelector('.page-body');
const siteTripBoardElement = siteBodyElement.querySelector('.trip-events');
const siteMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render(siteMenuElement, new MainMenuView(), RenderPosition.BEFOREEND);

const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
render(siteFilterElement, new FitersView(filters), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteTripBoardElement, pointsModel);
boardPresenter.init(points);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  boardPresenter.createPoint();
})
