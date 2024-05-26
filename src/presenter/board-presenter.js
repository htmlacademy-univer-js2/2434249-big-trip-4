import {render, remove} from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
// import TripInfoView from '../view/trip-info-view.js';
import {sortPointDay, sortPointPrice, sortPointTime} from '../utils.js';
import {SortType, UpdateType, UserAction} from '../mock/const.js';
import {FilterType} from '../model/filter-model.js';
// import NewPointButtonPresenter from '../presenter/new-point-button-presenter.js';
import NewPointPresenter from '../presenter/new-point-presenter.js';
import MessageView from '../view/message-view.js';

export default class BoardPresenter {
  #tripContainer = null;

  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #filterModel = null;

  #tripEventsElement = null;
  #tripInfoElement = null;

  #pointPresenterArray = new Map();
  #newPointPresenter = null;
  #newPointButtonPresenter = null;

  #currentSortType = SortType.DAY;
  #sourcedTripPoints = [];
  #isCreating = false;

  #sortComponent = null;
  #filterComponent = null;
  #pointsListComponent = new EventListView();
  #messageComponent = null;

  constructor({tripContainer, destinationsModel, offersModel, pointsModel, filterModel,
    newPointButtonPresenter
  }) {
    this.#tripContainer = tripContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newPointButtonPresenter = newPointButtonPresenter;

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#pointsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#viewActionHandler,
      onDestroy: this.#newPointDestroyHandler
    });

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get points() {
    // const filterType = this.#filterModel.get();
    // const filteredPoints = filter[filterType](this.#pointsModel.get());

    // return sort[this.#currentSortType](filteredPoints);
    return this.#pointsModel.get();
    // return filteredPoints;
  }

  init(){
    this.#tripEventsElement = this.#tripContainer.querySelector('.trip-events');
    this.#tripInfoElement = this.#tripContainer.querySelector('.trip-main');

    this.#sourcedTripPoints = [...this.#pointsModel.get()];
    this.points.sort(sortPointDay);
    this.#sourcedTripPoints.sort(sortPointDay);

    // this.#renderFilter();

    // this.#renderTripInfo();

    this.#renderBoard();
  }

  newPointButtonClickHandler = () => {
    this.#isCreating = true;
    this.#currentSortType = SortType.DAY;
    this.#filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointButtonPresenter.disableButton();
    this.#newPointPresenter.init();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      eventList: this.#pointsListComponent,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#viewActionHandler,
      onModeChange: this.#modeChangeHandler
    });

    pointPresenter.init(point);
    this.#pointPresenterArray.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    render(this.#pointsListComponent, this.#tripEventsElement);

    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #clearPoints = () => {
    this.#pointPresenterArray.forEach((presenter) => presenter.destroy());
    this.#pointPresenterArray.clear();
    this.#newPointPresenter.destroy();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#sortTypeChangeHandler
    });

    render(this.#sortComponent, this.#tripEventsElement);
  };

  #renderMessage = () => {
    this.#messageComponent = new MessageView({
      filterType: this.#filterModel.get()
    });

    render(this.#messageComponent, this.#tripEventsElement);
  };

  #renderPointsList = () => {
    render(this.#pointsListComponent, this.#tripEventsElement);
  };

  #renderBoard = () => {
    if (this.points.length === 0 && !this.isCreating) {
      this.#renderMessage();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
    this.#renderPoints();
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#clearPoints();
    remove(this.#messageComponent);
    remove(this.#sortComponent);
    this.#sortComponent = null;

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #viewActionHandler = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.update(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.delete(updateType, update);
        break;
      case UserAction.CREATE_POINT:
        this.#pointsModel.add(updateType, update);
        break;
    }
  };

  #modelEventHandler = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointPresenterArray?.get(data.id)?.init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  };

  #modeChangeHandler = () => {
    this.#pointPresenterArray.forEach((presenter) => presenter.resetView());
    this.#newPointPresenter.destroy();
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.PRICE:
        this.points.sort(sortPointPrice);
        break;
      case SortType.TIME:
        this.points.sort(sortPointTime);
        break;
      default:
        this.points.sort(sortPointDay);
    }

    this.#currentSortType = sortType;
  };

  // #renderTripInfo() {
  //   render(new TripInfoView({
  //     points: this.points,
  //     pointDestination: this.#destinationsModel.get()
  //   }), this.#tripInfoElement, 'afterbegin');
  // }

  #newPointDestroyHandler = ({isCanceled}) => {
    this.#isCreating = false;
    this.#newPointButtonPresenter.enableButton();
    if (this.points.length === 0 && isCanceled) {
      this.#clearBoard();
      this.#renderBoard();
    }
  };
}
