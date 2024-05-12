import {render, remove} from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import AddPointView from '../view/add-point-view.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import TripInfoView from '../view/trip-info-view.js';
import {updateItem, sortPointDay, sortPointPrice, sortPointTime} from '../utils.js';
import {SortType} from '../mock/const.js';
import FilterPresenter from './filter-presenter.js';

export default class TripPresenter {
  #tripContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #tripEventsElement = null;
  #tripInfoElement = null;
  #points = [];
  #newEventElement = null;
  #pointPresenterArray = new Map();

  #currentSortType = SortType.DAY;
  #sourcedTripPoints = [];

  #sortComponent = null;
  #filterComponent = null;
  #eventList = new EventListView();
  #noPointComponent = new NoPointView();

  constructor({tripContainer, destinationsModel, offersModel, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
  }

  init(){
    this.#tripEventsElement = this.#tripContainer.querySelector('.trip-events');
    this.#tripInfoElement = this.#tripContainer.querySelector('.trip-main');
    this.#newEventElement = document.querySelector('.trip-main__event-add-btn');

    this.#sourcedTripPoints = [...this.#pointsModel.get()];
    this.#points = [...this.#pointsModel.get()];
    this.#points.sort(sortPointDay);
    this.#sourcedTripPoints.sort(sortPointDay);

    this.#newEventElement.addEventListener('click', () => this.#addPointHandler(this.#newEventElement));
    this.#renderFilter();

    if (this.#points.length === 0) {
      this.#renderNoPointComponent();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
    this.#renderTripInfo();
  }

  //не снимаются обработчики
  #addPointHandler(newEventElement) {
    newEventElement.setAttribute('disabled', '');
    this.#renderAddPoint(newEventElement);
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
    this.#pointPresenterArray.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenterArray.forEach((presenter) => presenter.resetView());
  };

  #renderFilter = () => {
    this.#filterComponent = new FilterPresenter({
      filterContainer: this.#tripContainer,
      pointsModel: this.#points,
    });

    this.#filterComponent.init();
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.PRICE:
        this.#points.sort(sortPointPrice);
        break;
      case SortType.TIME:
        this.#points.sort(sortPointTime);
        break;
      default:
        this.#points = [...this.#sourcedTripPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);

    this.#clearPointList();
    this.#renderPoints();
  };


  #renderTripInfo() {
    render(new TripInfoView({
      points: this.#points,
      pointDestination: this.#destinationsModel.get()
    }), this.#tripInfoElement, 'afterbegin');
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#tripEventsElement);
  }

  #renderNoPointComponent() {
    render(this.#noPointComponent, this.#tripEventsElement);
    remove(this.#sortComponent);
    remove(this.#eventList);
  }

  #destroyNoPointComponent() {
    remove(this.#noPointComponent);
    render(this.#sortComponent, this.#tripEventsElement);
    render(this.#eventList, this.#tripEventsElement);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      eventList: this.#eventList,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenterArray.set(point.id, pointPresenter);
  }

  #renderPoints() {
    render(this.#eventList, this.#tripEventsElement);

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #clearPointList() {
    this.#pointPresenterArray.forEach((presenter) => presenter.destroy());
    this.#pointPresenterArray.clear();
  }

  #renderAddPoint(newEventElement) {
    if (document.querySelectorAll('.trip-events__item').length - 1 !== 0) {
      this.#destroyNoPointComponent();
    }
    const eventAddPoint = new AddPointView({
      pointOffers: this.#offersModel,
      onSaveClick: () => {
      },
      onCancelClick: () => {
        deleteForm(this.#noPointComponent);
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
