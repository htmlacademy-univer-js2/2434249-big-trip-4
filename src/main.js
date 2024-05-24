import BoardPresenter from './presenter/board-presenter.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';

import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offers-model.js';
import PointModel from './model/point-model.js';
import MockService from './service/mock-service.js';

const bodyElement = document.querySelector('body');
const tripInfoElement = bodyElement.querySelector('.trip-main');

const mockService = new MockService();
const destinationsModel = new DestinationModel(mockService);
const pointsModel = new PointModel(mockService);
const offersModel = new OfferModel(mockService);

const newPointButtonPresenter = new NewPointButtonPresenter({
  container: tripInfoElement
});

const boardPresenter = new BoardPresenter({
  tripContainer: bodyElement,
  destinationsModel,
  offersModel,
  pointsModel,
  // filterModel,
  newPointButtonPresenter: newPointButtonPresenter
});

newPointButtonPresenter.init({
  onButtonClick: boardPresenter.newPointButtonClickHandler
});

boardPresenter.init();
