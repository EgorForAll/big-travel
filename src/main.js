import { generateRandomPoint} from "./mock/point";
import { generateFilter } from "./mock/filter";
import { render, RenderPosition } from "./utils/render";
import PointsModel from "./model/point";
import MainMenuView from './view/main-menu';
import BoardPresenter from "./presenter/board";
import FilterModel from "./model/filter";
import FilterPresenter from "./presenter/filter";

const POINT_COUNT = 18;

const points = new Array(POINT_COUNT).fill().map(generateRandomPoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);
const filterModel = new FilterModel();

const siteBodyElement = document.querySelector('.page-body');
const siteTripBoardElement = siteBodyElement.querySelector('.trip-events');
const siteMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render(siteMenuElement, new MainMenuView(), RenderPosition.BEFOREEND);

const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
filterPresenter.init();

const boardPresenter = new BoardPresenter(siteTripBoardElement, pointsModel, filterModel);
boardPresenter.init(points);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', () => {
  boardPresenter.createPoint();
})
