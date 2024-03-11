import {createElement} from '../render.js';

const createTipEventListViewTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TipEventList {
  getTemplate() {
    return createTipEventListViewTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
