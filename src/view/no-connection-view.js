import AbstractView from '../framework/view/abstract-view.js';

const createNoConnectiontViewTemplate = () => '<p class="trip-events__msg">Failed to load latest route information</p>';

export default class NoConnectionView extends AbstractView{
  get template() {
    return createNoConnectiontViewTemplate();
  }
}
