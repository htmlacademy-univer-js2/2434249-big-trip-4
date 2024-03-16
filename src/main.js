import BoardPresenter from './presenter/board-presenter.js';

import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offers-model.js';
import PointModel from './model/point-model.js';
import MockService from './service/mock-service.js';

const bodyElement = document.querySelector('body');

const mockService = new MockService();
const destinationsModel = new DestinationModel(mockService);
const pointsModel = new PointModel(mockService);
const offersModel = new OfferModel(mockService);

const boardPresenterElement = new BoardPresenter({
  boardContainer: bodyElement,
  destinationsModel,
  offersModel,
  pointsModel
});

boardPresenterElement.init();
