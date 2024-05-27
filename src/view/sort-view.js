import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';

const createSortItemTemplate = (sorter, isChecked) => (`<div class="trip-sort__item  trip-sort__item--${sorter}">
  <input id="sort-${sorter}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sorter}"
  data-sort-type="${SortType}"
  ${isChecked ? 'checked' : ''}
  ${sorter === 'event' || sorter === 'offers' ? 'disabled' : ''}>
  <label class="trip-sort__btn" for="sort-${sorter}"
  data-sort-type="${sorter}">${sorter.toUpperCase()}</label>
</div>`);

const createSortTemplate = () => {
  const sorterItemsTemplate = Object.values(SortType).map((sorter, index) => createSortItemTemplate(sorter, index === 0)).join('');

  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${sorterItemsTemplate}</form>`);
};
export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'LABEL') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
