import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../mock/const.js';

const FilterMassege = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no preset events now',
  [FilterType.PAST]: 'There are no past events now'
};

const createMessageTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class MessageView extends AbstractView {
  #filterType;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    const message = FilterMassege[this.#filterType];
    return createMessageTemplate(message);
  }
}
