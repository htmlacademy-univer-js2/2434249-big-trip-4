import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { UpdateType } from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filterComponent = null;

  constructor(filterContainer, filterModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
  }

  init() {
    this.#renderFilters();
  }

  remove() {
    remove(this.#filterComponent);
  }

  #renderFilters = () => {
    const previousFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(
      this.#filterModel.get(),
      this.#filterChangeHandler
    );

    if (!previousFilterComponent) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, previousFilterComponent);
  };

  #filterChangeHandler = (filterType) => this.#filterModel.set(UpdateType.MAJOR, filterType);
}
