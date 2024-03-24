import AbstractView from '../framework/view/abstract-view.js';

const createSortItemTemplate = (sorter, isChecked) => {
  const {type} = sorter;

  return (`<div class="trip-sort__item  trip-sort__item--${type.toLowerCase()}">
  <input id="sort-${type.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type.toLowerCase()}"
  ${isChecked ? 'checked' : ''}
  ${type === 'EVENT' || type === 'OFFERS' ? 'disabled' : ''}>
  <label class="trip-sort__btn" for="sort-${type.toLowerCase()}">${type}</label>
</div>`);
};

const createSortTemplate = (sorterItems) => {
  const sorterItemsTemplate = sorterItems.map((sorter, index) => createSortItemTemplate(sorter, index === 0)).join('');

  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
${sorterItemsTemplate}
</form>`);};

export default class SortView extends AbstractView {
  #sorter = null;

  constructor({sorter}) {
    super();
    this.#sorter = sorter;
  }

  get template() {
    return createSortTemplate(this.#sorter);
  }
}
