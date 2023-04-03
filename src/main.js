import { generateRandomPoint} from "./mock/point";
import StatsView from "./view/stats";
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
const sitePageBodyContainer = siteBodyElement.querySelector('.page-main__container');
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

const stats = new StatsView();
render(sitePageBodyContainer, stats.getElement(), RenderPosition.BEFOREEND);
stats.hide();

const tableBtn = siteBodyElement.querySelector('.btn__table');
tableBtn.addEventListener('click', () => {
  boardPresenter.show();
  stats.hide();
  tableBtn.classList.add('trip-tabs__btn--active');
  statsBtn.classList.remove('trip-tabs__btn--active');
})

const statsBtn = siteBodyElement.querySelector('.btn__stats');
statsBtn.addEventListener('click', () => {
  stats.show();
  boardPresenter.hide();
  statsBtn.classList.add('trip-tabs__btn--active');
  tableBtn.classList.remove('trip-tabs__btn--active');
})

