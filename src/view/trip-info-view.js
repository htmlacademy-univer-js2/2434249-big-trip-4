import {POINT_EMPTY} from '../mock/const.js';
import {formatToShortDate, formatToDay} from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

const findDestinationForPoint = (point, pointDestination) =>
  pointDestination.find((destination) => destination.id === point.destination);

const createDestinationElement = (pointDestination) =>
  pointDestination.length <= 3
    ? pointDestination.map((destination) => (`${destination} - `)).join('').slice(0, -2)
    : `${pointDestination[0]} - ... - ${pointDestination[pointDestination.length - 1]}`;

const createTripInfoTemplate = ({points, pointDestination}) => (`<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${createDestinationElement(pointDestination)}</h1>

      <p class="trip-info__dates">${formatToShortDate(points[0].dateFrom)}&nbsp;—&nbsp;
      ${dayjs(points[points.length - 1].dateTo).month() === dayjs(points[0].dateFrom).month()
    ? formatToDay(points[points.length - 1].dateTo)
    : formatToShortDate(points[points.length - 1].dateTo)}</p>
    </div>

    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">
      ${points.reduce((x, point) => (x + point.basePrice), 0)}</span>
    </p>
    </section>`);

export default class TripInfoView extends AbstractView {
  #points = null;
  #pointDestination = [];

  constructor({points = POINT_EMPTY, pointDestination}) {
    super();
    this.#points = points;
    this.#pointDestination = points
      .map((point) => findDestinationForPoint(point, pointDestination))
      .map((destination) => destination.name);
  }

  get template() {
    return createTripInfoTemplate({
      points: this.#points,
      pointDestination: this.#pointDestination,
    });
  }
}
