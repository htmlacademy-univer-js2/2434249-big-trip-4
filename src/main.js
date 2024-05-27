import BoardPresenter from './presenter/board-presenter.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';

import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offers-model.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
// import FilterPresenter from './presenter/filter-presenter.js';

import PointApiService from '../src/service/point-api-service.js';

const AUTHORIZATION = 'Basic 09SVykjhUhHbMdig';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

const bodyElement = document.querySelector('body');
const tripInfoElement = bodyElement.querySelector('.trip-main');

const filterModel = new FilterModel();


const pointApiService = new PointApiService(END_POINT, AUTHORIZATION);
const destinationsModel = new DestinationModel(pointApiService);
const offersModel = new OfferModel(pointApiService);
const pointsModel = new PointModel({
  service: pointApiService,
  destinationsModel,
  offersModel
});

const newPointButtonPresenter = new NewPointButtonPresenter({
  container: tripInfoElement
});

// const filterPresenter = new FilterPresenter({
//   container: bodyElement.querySelector('.trip-control__filters'),
//   pointsModel,
//   filterModel
// });

const boardPresenter = new BoardPresenter({
  tripContainer: bodyElement,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
  newPointButtonPresenter: newPointButtonPresenter
});

newPointButtonPresenter.init({
  onButtonClick: boardPresenter.newPointButtonClickHandler
});

pointsModel.init();
boardPresenter.init();


