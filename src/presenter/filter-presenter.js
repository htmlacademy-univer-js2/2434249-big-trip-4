import {render} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import {generateFilter} from '../mock/filters.js';
import {EmptyListMessage} from '../mock/const.js';

export default class FilterPresenter{
  #filterContainer = null;
  #pointsModel = null;

  constructor({filterContainer, pointsModel}) {
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
  }

  init(){
    const tripControlFiltersElement = this.#filterContainer.querySelector('.trip-controls__filters');
    const filters = generateFilter(this.#pointsModel);

    render(new FilterView({
      filters,
      onFilterClick: (filterType) => {
        this.#renderFilteredPoints(filters.filter((filter) => (filter.type === filterType))[0], filterType);
      }
    }), tripControlFiltersElement);
  }

  #renderFilteredPoints(points, filterType){
    if (points.filteredPoints.length !== 0) {
      points.filteredPoints.forEach((point) => {
        //Пока так
        // eslint-disable-next-line no-console
        console.log(point);
      });
    }
    else {
      // eslint-disable-next-line no-console
      console.log(EmptyListMessage[filterType]);
    }
  }
}
