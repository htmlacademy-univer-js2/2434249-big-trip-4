import {render, remove, RenderPosition} from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import TripInfoView from '../view/trip-info-view.js';
import {sortPointDay, sortPointPrice, sortPointTime, filter, sort} from '../utils.js';
import {FilterType, SortType, UpdateType, UserAction, TimeLimit} from '../const.js';
import FilterPresenter from '../presenter/filter-presenter.js';
import NewPointPresenter from '../presenter/new-point-presenter.js';
import MessageView from '../view/message-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import LoadingView from '../view/loading-view.js';
import NoConnectionView from '../view/no-connection-view.js';

export default class BoardPresenter {
  #tripContainer = null;

  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #filterModel = null;

  #tripEventsElement = null;
  #tripInfoElement = null;
  #tripFliterElement = null;

  #pointPresenterArray = new Map();
  #newPointPresenter = null;
  #newPointButtonPresenter = null;

  #currentSortType = SortType.DAY;

  #sortComponent = null;
  #tripInfoComponent = null;
  #filterPresenter = null;
  #loadingComponent = new LoadingView();
  #noConnectionComponent = new NoConnectionView();
  #pointsListComponent = new EventListView();
  #messageComponent = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #isCreating = false;
  #isLoading = false;

  constructor({tripContainer, destinationsModel,
    offersModel, pointsModel, filterModel,
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
    const filteredPoints = filter[this.#filterModel.get()](this.#pointsModel.points);
    return sort[this.#currentSortType](filteredPoints);
  }

  init(){
    this.#tripEventsElement = this.#tripContainer.querySelector('.trip-events');
    this.#tripInfoElement = this.#tripContainer.querySelector('.trip-main');
    this.#tripFliterElement = this.#tripContainer.querySelector('.trip-controls__filters');
    this.#renderFilters();
    this.#renderLoading();
  }

  newPointButtonClickHandler = () => {
    this.#isCreating = true;
    this.#currentSortType = SortType.DAY;
    this.#filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointButtonPresenter.disableButton();

    if (this.#messageComponent) {
      remove(this.#messageComponent);
    }
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

  #renderFilters = () => {
    this.#filterPresenter = new FilterPresenter(
      this.#tripFliterElement,
      this.#filterModel,
    );

    this.#filterPresenter.init();
  };

  #renderMessage = () => {
    this.#messageComponent = new MessageView({
      filterType: this.#filterModel.get()
    });

    render(this.#messageComponent, this.#tripEventsElement);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#tripEventsElement);
  };

  #renderPointsList = () => {
    render(this.#pointsListComponent, this.#tripEventsElement, RenderPosition.AFTEREND);
  };

  #renderTripInfo = () => {
    const points = this.points;
    this.#tripInfoComponent = new TripInfoView({
      points: points,
      destinations: [...this.#destinationsModel.get()],
      offers: [...this.#offersModel.get()]
    });

    if (this.#tripInfoComponent.element !== null)
    {
      render(this.#tripInfoComponent, this.#tripInfoElement, RenderPosition.AFTERBEGIN);
    }
  };

  #renderBoard = () => {
    if (this.points.length === 0 && !this.#isCreating) {
      this.#renderMessage();
      return;
    }
    else {
      this.#renderPointsList();
    }

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if (this.points.length) {
      this.#renderTripInfo();
    }
    this.#renderSort();
    this.#renderPoints();
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#clearPoints();
    remove(this.#messageComponent);
    remove(this.#sortComponent);
    remove(this.#tripInfoComponent);

    this.#sortComponent = null;

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #viewActionHandler = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenterArray.get(update.id).setSaving();
        try {
          await this.#pointsModel.update(updateType, update);
        }
        catch {
          this.#pointPresenterArray.get(update.id).setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenterArray.get(update.id).setDeleting();
        try {
          await this.#pointsModel.delete(updateType, update);
        }
        catch {
          this.#pointPresenterArray.get(update.id).setAborting();
        }
        break;
      case UserAction.CREATE_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.add(updateType, update);
        }
        catch {
          this.#newPointPresenter.setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #modelEventHandler = async (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointPresenterArray?.get(data.id)?.init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#sortPoints(this.#currentSortType);
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        if (data.isError) {
          remove(this.#loadingComponent);
          render(this.#noConnectionComponent, this.#tripEventsElement);
        }
        else {
          this.#isLoading = false;
          remove(this.#loadingComponent);
          this.#renderBoard();
        }
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
    this.#currentSortType = sortType;
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
  };

  #newPointDestroyHandler = ({isCanceled}) => {
    this.#isCreating = false;
    this.#newPointButtonPresenter.enableButton();
    if (this.points.length === 0 && isCanceled) {
      this.#clearBoard();
      this.#renderBoard();
    }
  };
}
