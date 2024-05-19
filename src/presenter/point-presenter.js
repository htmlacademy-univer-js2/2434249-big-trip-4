import {render, replace, remove} from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import EventPointView from '../view/event-point-view.js';
import {MODE} from '../mock/const.js';

export default class PointPresenter {
  #point = null;
  #eventList = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = MODE.DEFAULT;

  constructor({eventList, destinationsModel, offersModel, onDataChange, onModeChange}){
    this.#eventList = eventList;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point){
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new EventPointView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getById(this.#point.destination),
      pointOffers: this.#offersModel.getByType(this.#point.type),
      onEditClick: () => {
        this.#replacePointToForm();
      },
      onFavoriteClick: () => {
        this.#handleFavoriteClick();
      }
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      pointDestination: this.#destinationsModel,
      pointOffers: this.#offersModel,
      onSubmitClick: () => {
        this.#handleFormSubmit(this.#point);
      },
      onDeleteClick: () => {
        this.destroy();
      },
      onRollUpClick: () => {
        this.#pointEditComponent.resetPoint(this.#point);
        this.#replaceFormToPoint();
      }
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#eventList.element);
      return;
    }

    if (this.#mode === MODE.DEFAULT){
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === MODE.EDITING){
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy(){
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  resetView() {
    if (this.#mode !== MODE.DEFAULT) {
      this.#pointEditComponent.resetPoint(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.resetPoint(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleFormSubmit = (point) => {
    this.#point = point;
    this.#handleDataChange(point);
    this.#replaceFormToPoint();
  };

  #replacePointToForm() {
    document.addEventListener('keydown', this.#escKeyDownHandler);
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = MODE.EDITING;
  }

  #replaceFormToPoint() {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = MODE.DEFAULT;
  }
}
