import {render} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import {generateFilter} from '../mock/filters.js';

export default class FilterPresenter {
  #filterContainer = null;
  #pointsModel = null;

  constructor({filterContainer, pointsModel}) {
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
  }

  init(){
    const points = [...this.#pointsModel.get()];
    const tripControlFiltersElement = this.#filterContainer.querySelector('.trip-controls__filters');
    const filters = generateFilter(points);

    render(new FilterView({filters}), tripControlFiltersElement);
  }
}
