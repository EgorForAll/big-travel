import { render, RenderPosition } from "./utils/render";
import { UpdateType, DATA_TYPE } from "./mock/const";
import PointsModel from "./model/point";
import OffersModel from "./model/offers";
import DestinationModel from "./model/destinations";
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
const offersModel = new OffersModel();
const destinationsModel = new DestinationModel();

const filterModel = new FilterModel();

const siteBodyElement = document.querySelector('.page-body');
const siteTripBoardElement = siteBodyElement.querySelector('.trip-events');
const siteMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render(siteMenuElement, new MainMenuView(), RenderPosition.BEFOREEND);

const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');

const boardPresenter = new BoardPresenter(siteTripBoardElement, pointsModel, filterModel, offersModel, destinationsModel, api);
boardPresenter.init(pointsModel.getPoints());

document.querySelector('.trip-main__event-add-btn').addEventListener('click', () => {
  statsPresenter.statsComponent === null ?  null : statsPresenter.destroyChart();
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

const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
filterPresenter.init();

// Получаем точки маршрута с сервера
api.getData(DATA_TYPE.POINT)
  .then((response) => {
    pointsModel.setPoints(UpdateType.INIT_POINTS, response);
    console.log(pointsModel.getPoints())
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT_POINTS, []);
  });

  // Получаем офферы с сервера
api.getData(DATA_TYPE.OFFERS)
  .then((response) => {
    offersModel.setOffers(UpdateType.INIT_OFFERS, response);
  })
  .catch(() => {
    offersModel.setOffers((UpdateType.INIT_OFFERS, []));
  });

  // Получаем направления с сервера
api.getData(DATA_TYPE.DESTINATIONS)
  .then((response) => {
    destinationsModel.setDestinations(UpdateType.INIT_DESTINATIONS, response);
  })
  .catch(() => {
    destinationsModel.setDestinations((UpdateType.INIT_DESTINATIONS, []));
  });