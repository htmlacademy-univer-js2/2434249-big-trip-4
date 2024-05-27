import AbstractView from '../framework/view/abstract-view.js';

const createFilterItems = (filter, flag) => (`<div class="trip-filters__filter">
  <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.toLowerCase()}"
  ${flag === 0 ? 'checked' : ''}>
  <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
</div>`);

const createFilterTemplate = (filters) => (`<form class="trip-filters" action="#" method="get">
      ${filters.map((filter, index) => createFilterItems(filter, index)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`);

export default class FilterView extends AbstractView{
  #filters = null;
  #handleFilterTypeChange = null;

  constructor({filters, onFilterTypeChange}) {
    super();
    this.#filters = Object.values(filters);
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.querySelectorAll('.trip-filters__filter')
      .forEach((filterElement) => filterElement.addEventListener('click', this.#filterClickHandler));
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

  #filterClickHandler = (evt) => {
    // evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.innerHTML);
  };
}
