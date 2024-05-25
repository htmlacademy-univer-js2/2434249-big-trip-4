import {remove, render, replace} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import {UpdateType} from '../mock/const.js';
// import {FilterType} from '../model/filter-model.js';
import {filter} from '../utils.js';

export default class FilterPresenter{
  #container = null;
  #filterComponent = null;

  #pointsModel = null;
  #filterModel = null;

  #currentFilter = null;

  constructor({container, pointsModel, filterModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get filters() {
    const points = this.#pointsModel.get();

    return Object.entries(filter)
      .map(([filterType, filterPoints]) => ({
        type: filterType,
        isChecked: filterType === this.#currentFilter,
        isDisable: filterPoints(points.length) === 0
      }));
  }

  // get filters() {
  //   const points = this.#pointsModel.points;

  //   return [
  //     {
  //       type: FilterType.EVERYTHING,
  //       name: 'EVERYTHING',
  //       count: filter[FilterType.EVERYTHING](points).length,
  //     },
  //     {
  //       type: FilterType.PAST,
  //       name: 'PAST',
  //       count: filter[FilterType.PAST](points).length,
  //     },
  //     {
  //       type: FilterType.FUTURE,
  //       name: 'FUTURE',
  //       count: filter[FilterType.FUTURE](points).length,
  //     }
  //   ];
  // }

  init(){
    this.#currentFilter = this.#filterModel.get();

    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      items: filters,
      onItemChange: this.#filterTypeChangeHandler
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #filterTypeChangeHandler = (filterType) => {
    // if (filterType === this.#filterModel.filter) {
    //   return;
    // }

    this.#filterModel.set(UpdateType.MAJOR, filterType);
  };

  #modelEventHandler = () => {
    this.init();
  };
}
