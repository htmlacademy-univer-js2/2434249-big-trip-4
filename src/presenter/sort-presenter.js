import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import {generateSorter} from '../mock/sort.js';

export default class SortPresenter {
  #sortContainer = null;
  #pointsModel = null;

  constructor({sortContainer, pointsModel}) {
    this.#sortContainer = sortContainer;
    this.#pointsModel = pointsModel;
  }

  init(){
    const points = [...this.#pointsModel.get()];
    const tripEventsElement = this.#sortContainer.querySelector('.trip-events');
    const sorter = generateSorter(points);

    render(new SortView({sorter}), tripEventsElement);
  }
}
