import {render, replace, remove} from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import EventPointView from '../view/event-point-view.js';
import EventListView from '../view/event-list-view.js';
import AddPointView from '../view/add-point-view.js';

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

  init(){
    const points = [...this.#pointsModel.get()];
    const tripEventsElement = this.#tripContainer.querySelector('.trip-events');
    const newEventElement = document.querySelector('.trip-main__event-add-btn');
    newEventElement.addEventListener('click', () => this.#addPointHandler(newEventElement));

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
    const eventAddPoint = new AddPointView({
      pointOffers: this.#offersModel,
      onSaveClick: () => {
      },
      onCancelClick: () => {
        deleteForm();
      }
    });

    function deleteForm() {
      newEventElement.removeAttribute('disabled');
      remove(eventAddPoint);
    }

    render(eventAddPoint, this.#eventList.element, 'afterbegin');
  }
}
