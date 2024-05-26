import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, isChecked) => {
  const {type} = filter;

  return (`<div class="trip-filters__filter">
  <input id="filter-${type.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type.toLowerCase()}"
  ${isChecked ? 'checked' : ''}>
  <label class="trip-filters__filter-label" for="filter-${type.toLowerCase()}">${type}</label>
</div>`);
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');

  return (`<form class="trip-filters" action="#" method="get">
  ${filterItemsTemplate}
<button class="visually-hidden" type="submit">Accept filter</button>
</form>`);
};

export default class FilterView extends AbstractView{
  #filters = null;
  #handleFilterTypeChange = null;

  constructor({filters, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.querySelectorAll('.trip-filters__filter')
      .forEach((filterElement) => filterElement.addEventListener('click', this.#filterClickHandler));
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

  #filterClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange (evt.target.innerHTML);
  };
}
