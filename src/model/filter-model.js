import { FilterType } from '../const.js';
import Observable from '../framework/observable.js';

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  get = () => this.#filter;

  set(updateType, update) {
    this.#filter = update;
    this._notify(updateType, update);
  }
}
