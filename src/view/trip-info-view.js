import {POINT_EMPTY} from '../mock/const.js';
import {formatToShortDate, formatToDay} from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';

const createDestinationElement = (pointDestination) => {
  let destinationElements = '';

  pointDestination.forEach((destination) => {
    destinationElements += `${destination} - `;
  });

  return destinationElements.slice(0, -2);
};

const createTripInfoTemplate = ({point, pointDestination}) => (`<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${createDestinationElement(pointDestination)}</h1>

      <p class="trip-info__dates">${formatToShortDate(point[0].dateFrom)}&nbsp;—&nbsp;${formatToDay(point[point.length - 1].dateTo)}</p>
    </div>

    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>
    </section>`);

export default class TripInfoView extends AbstractView {
  #point = null;
  #pointDestination = [];

  constructor({point = POINT_EMPTY, pointDestination}) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
  }

  get template() {
    return createTripInfoTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
    });
  }
}
