import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import SortPresenter from './presenter/sort-presenter.js';

import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offers-model.js';
import PointModel from './model/point-model.js';
import MockService from './service/mock-service.js';

const bodyElement = document.querySelector('body');

const mockService = new MockService();
const destinationsModel = new DestinationModel(mockService);
const pointsModel = new PointModel(mockService);
const offersModel = new OfferModel(mockService);

const tripInfoPresenterElement = new TripInfoPresenter({
  tripInfoContainer: bodyElement,
  destinationsModel,
  pointsModel
});

const filterPresenterElement = new FilterPresenter({
  filterContainer: bodyElement,
  pointsModel
});

const sortPresenterElement = new SortPresenter({
  sortContainer: bodyElement,
  pointsModel
});

const tripPresenterElement = new TripPresenter({
  tripContainer: bodyElement,
  destinationsModel,
  offersModel,
  pointsModel
});



tripInfoPresenterElement.init();
filterPresenterElement.init();
sortPresenterElement.init();
tripPresenterElement.init();
