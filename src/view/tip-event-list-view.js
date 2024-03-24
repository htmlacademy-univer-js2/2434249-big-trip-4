import AbstractView from '../framework/view/abstract-view.js';

const createTipEventListViewTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TipEventListView extends AbstractView{
  get template() {
    return createTipEventListViewTemplate();
  }
}
