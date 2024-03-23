import {render} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #pointsModel = null;
  #destinationsModel = null;

  constructor({tripInfoContainer, destinationsModel, pointsModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
  }

  init(){
    const points = [...this.#pointsModel.get()];
    const tripInfoElement = this.#tripInfoContainer.querySelector('.trip-main');

    render(new TripInfoView({
      points: points,
      pointDestination: this.#destinationsModel.get(),
    }), tripInfoElement, 'afterbegin');
  }
}
