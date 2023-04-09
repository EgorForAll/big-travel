import { render, RenderPosition } from "./utils/render";
import { UpdateType } from "./mock/const";
import PointsModel from "./model/point";
import MainMenuView from './view/main-menu';
import BoardPresenter from "./presenter/board";
import FilterModel from "./model/filter";
import FilterPresenter from "./presenter/filter";
import StatsPresenter from "./presenter/stats";
import Api from "./api";

const AUTHORIZATION = 'Basic eo1w360ik46572a';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();

const filterModel = new FilterModel();

const siteBodyElement = document.querySelector('.page-body');
const siteTripBoardElement = siteBodyElement.querySelector('.trip-events');
const siteMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render(siteMenuElement, new MainMenuView(), RenderPosition.BEFOREEND);

const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
filterPresenter.init();

const boardPresenter = new BoardPresenter(siteTripBoardElement, pointsModel, filterModel);
boardPresenter.init(pointsModel.getPoints());

document.querySelector('.trip-main__event-add-btn').addEventListener('click', () => {
  statsPresenter.destroyChart();
  statsPresenter.hide();
  boardPresenter.show();
  tableBtn.classList.add('trip-tabs__btn--active');
  statsBtn.classList.remove('trip-tabs__btn--active');
  boardPresenter.createPoint();
})

const statsPresenter = new StatsPresenter(pointsModel);

const tableBtn = siteBodyElement.querySelector('.btn__table');
tableBtn.addEventListener('click', () => {
  statsPresenter.destroyChart();
  statsPresenter.hide();
  boardPresenter.show();
  tableBtn.classList.add('trip-tabs__btn--active');
  statsBtn.classList.remove('trip-tabs__btn--active');
})

const statsBtn = siteBodyElement.querySelector('.btn__stats');
statsBtn.addEventListener('click', () => {
  statsPresenter.init();
  statsPresenter.drawGrafics();
  statsPresenter.show();
  boardPresenter.hide();
  statsBtn.classList.add('trip-tabs__btn--active');
  tableBtn.classList.remove('trip-tabs__btn--active');
})

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });