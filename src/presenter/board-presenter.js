import {render} from '../render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import NewPointView from '../view/new-point-view.js';
import EventPointView from '../view/event-point-view.js';
import EventListView from '../view/event-list-view.js';
import TripInfoView from '../view/trip-info-view.js';

export default class BoardPresenter {
  constructor({boardContainer, destinationsModel, offersModel, pointsModel}) {
    this.boardContainer = boardContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;

    this.points = [...pointsModel.get()];
  }

  eventList = new EventListView();

  init(){
    const tripControlFiltersElement = this.boardContainer.querySelector('.trip-controls__filters');
    const tripInfoElement = this.boardContainer.querySelector('.trip-main');
    const tripEventsElement = this.boardContainer.querySelector('.trip-events');

    render(new TripInfoView({
      point: this.points,
      pointDestination: this.destinationsModel.get().map((destination) => destination.name),
    }), tripInfoElement, 'afterbegin');
    render(new FilterView(), tripControlFiltersElement);
    render(new SortView(), tripEventsElement);
    render(this.eventList, tripEventsElement);

    render(new NewPointView({
      point: this.points[0],
      pointDestination: this.destinationsModel.getById(this.points[0].destination),
      pointOffers: this.offersModel.getByType(this.points[0].type)
    }),
    this.eventList.getElement());

    this.points.slice(1, this.points.length).forEach((point) => {
      render(new EventPointView({
        point: point,
        pointDestination: this.destinationsModel.getById(point.destination),
        pointOffers: this.offersModel.getByType(point.type)
      }), this.eventList.getElement());
    }
    );
  }
}
