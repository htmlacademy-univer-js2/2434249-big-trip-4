import {render, replace, remove} from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import EventPointView from '../view/event-point-view.js';
import EventListView from '../view/event-list-view.js';
import AddPointView from '../view/add-point-view.js';
import EmptyListView from '../view/empty-list-view.js';
import SortView from '../view/sort-view.js';
import {generateSorter} from '../mock/sort.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripPresenter {
  #tripContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;

  constructor({tripContainer, destinationsModel, offersModel, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
  }

  #eventList = new EventListView();
  #emptyList = new EmptyListView();

  init(){
    const points = [...this.#pointsModel.get()];
    const tripInfoElement = this.#tripContainer.querySelector('.trip-main');
    const newEventElement = document.querySelector('.trip-main__event-add-btn');
    const tripEventsElement = this.#tripContainer.querySelector('.trip-events');

    if (this.#pointsModel.get().length === 0) {
      render(new EmptyListView(), tripEventsElement);
      return;
    }

    newEventElement.addEventListener('click', () => this.#addPointHandler(newEventElement));
    const sorter = generateSorter(points);

    render(new TripInfoView({
      points: points,
      pointDestination: this.#destinationsModel.get(),
      pointOffers: this.#offersModel.get(),
    }), tripInfoElement, 'afterbegin');
    render(new SortView({sorter}), tripEventsElement);

    render(this.#eventList, tripEventsElement);

    points.forEach((point) => {
      this.#renderPoints(point);
    });
  }

  //не снимаются обработчики
  #addPointHandler(newEventElement) {
    newEventElement.setAttribute('disabled', '');
    this.#renderAddPoint(newEventElement);
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
      onDeleteClick: () => {
        if (document.querySelectorAll('.trip-events__item').length - 1 === 0) {
          render(this.#emptyList, this.#tripContainer.querySelector('.trip-events'));
        }
        remove(eventEditPoint);
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

  #renderAddPoint(newEventElement) {
    if (document.querySelectorAll('.trip-events__item').length - 1 !== 0) {
      remove(this.#emptyList);
    }
    const eventAddPoint = new AddPointView({
      pointOffers: this.#offersModel,
      onSaveClick: () => {
      },
      onCancelClick: () => {
        deleteForm(this.#emptyList);
      }
    });

    function deleteForm(emptyList) {
      newEventElement.removeAttribute('disabled');
      if (document.querySelectorAll('.trip-events__item').length - 1 === 0) {
        render(emptyList, document.querySelector('.trip-events'));
      }
      remove(eventAddPoint);
    }

    render(eventAddPoint, this.#eventList.element, 'afterbegin');
  }
}
