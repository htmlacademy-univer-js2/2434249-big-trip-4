import {render, replace} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import EventPointView from '../view/event-point-view.js';
import EventListView from '../view/event-list-view.js';
import TripInfoView from '../view/trip-info-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;

  constructor({boardContainer, destinationsModel, offersModel, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
  }

  #eventList = new EventListView();

  init(){
    const points = [...this.#pointsModel.get()];
    const tripControlFiltersElement = this.#boardContainer.querySelector('.trip-controls__filters');
    const tripInfoElement = this.#boardContainer.querySelector('.trip-main');
    const tripEventsElement = this.#boardContainer.querySelector('.trip-events');

    render(new TripInfoView({
      point: points,
      pointDestination: this.#destinationsModel.get().map((destination) => destination.name),
    }), tripInfoElement, 'afterbegin');
    render(new FilterView(), tripControlFiltersElement);
    render(new SortView(), tripEventsElement);
    render(this.#eventList, tripEventsElement);

    points.forEach((point) => {
      this.#renderPoints(point);
    });
  }

  #renderPoints(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventPoint = new EventPointView({
      point: point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const eventEditPoint = new EditPointView({
      point: point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onSubmitClick: () => {
        replaceFormToPoint();
        document.addEventListener('keydown', escKeyDownHandler);
      },
      onRollUpClick: () => {
        replaceFormToPoint();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(eventEditPoint, eventPoint);
    }

    function replaceFormToPoint() {
      replace(eventPoint, eventEditPoint);
    }

    render(eventPoint, this.#eventList.element);
  }
}
