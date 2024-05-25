import EditPointView from '../view/edit-point-view';
import {RenderPosition, remove, render} from '../framework/render.js';
import { UserAction, UpdateType, EditType } from '../mock/const';

export default class NewPointPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointNewComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  constructor({container, destinationsModel, offersModel, onDataChange, onDestroy}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#pointNewComponent !== null) {
      return;
    }

    this.#pointNewComponent = new EditPointView({
      pointDestination: this.#destinationsModel,
      pointOffers: this.#offersModel,
      onResetClick: this.#resetClickHandler,
      onFormSubmit: this.#formSubmitHandler,
      type: EditType.CREATING,
    });

    render(this.#pointNewComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  // eslint-disable-next-line no-unused-vars
  destroy = ({isCanceled = true} = {}) => {
    if (this.#pointNewComponent === null) {
      return;
    }

    remove (this.#pointNewComponent);
    this.#pointNewComponent = null;
    document.removeEventListener('keydown', this.escKeyDownHandler);
  };

  #formSubmitHandler = (point) => {
    this.#handleDataChange(
      UserAction.CREATE_POINT,
      UpdateType.MINOR,
      point,
    );

    this.destroy({isCanceled: false});
  };

  #resetClickHandler = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
