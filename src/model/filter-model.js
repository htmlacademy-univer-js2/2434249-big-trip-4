import Odsersable from '../framework/observable.js';
import {FilterType} from '../mock/const.js';

export default class FilterModel extends Odsersable {
  #filter = FilterType.EVERYTHING;

  get() {
    return this.#filter;
  }

  set(updateType, update) {
    this.#filter = update;
    this._notify(updateType, update);
  }
}
