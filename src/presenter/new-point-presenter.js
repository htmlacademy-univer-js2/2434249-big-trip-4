import EditPointView from '../view/edit-point-view';
import {RenderPosition, remove, render} from '../framework/render.js';
import {MODE, UserAction, UpdateType, EditType } from '../const.js';

export default class NewPointPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointNewComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #mode = MODE.EDITING;

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
      onCancelClick: this.#resetClickHandler,
      onSubmitClick: this.#formSubmitHandler,
      type: EditType.CREATING,
    });

    render(this.#pointNewComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving = () => {
    if (this.#mode === MODE.EDITING) {
      this.#pointNewComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  };

  // setDeleting = () => {
  //   this.#pointNewComponent.updateElement({
  //     isDeleting: true,
  //     isDisabled: true,
  //   });
  // };

  setAborting = () => {
    if (this.#mode === MODE.DEFAULT) {
      this.#pointNewComponent.shake();
    }

    if (this.#mode === MODE.EDITING) {
      const resetFormState = () => {
        this.#pointNewComponent.updateElement({
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        });
      };

      this.#pointNewComponent.shake(resetFormState);
    }
  };

  destroy = ({isCanceled = true} = {}) => {
    if (this.#pointNewComponent === null) {
      return;
    }

    remove (this.#pointNewComponent);
    this.#pointNewComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);

    this.#handleDestroy({isCanceled});
  };

  #formSubmitHandler = (point) => {
    this.#handleDataChange(
      UserAction.CREATE_POINT,
      UpdateType.MINOR,
      point,
    );

    // this.destroy({isCanceled: false});
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
