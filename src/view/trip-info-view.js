import {POINT_EMPTY} from '../mock/const.js';
import {formatToShortDate, formatToDay} from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';
import {TotalPrice} from '../view/event-point-view.js';

const findDestinationForPoint = (point, pointDestination) =>
  pointDestination.find((destination) => destination.id === point.destination);

const findOffersForPoint = (point, pointOffers) =>
  pointOffers.find((offer) => offer.type === point.type);

const createDestinationElement = (pointDestination) =>
  pointDestination.length <= 3
    ? pointDestination.map((destination) => (`${destination} - `)).join('').slice(0, -2)
    : `${pointDestination[0]} - ... - ${pointDestination[pointDestination.length - 1]}`;

const createTripInfoTemplate = ({points, pointDestination}) => (`<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${createDestinationElement(pointDestination)}</h1>

      <p class="trip-info__dates">${formatToShortDate(points[0].dateFrom)}&nbsp;—&nbsp;${formatToDay(points[points.length - 1].dateTo)}</p>
    </div>

    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">
      ${TotalPrice.PRICE}</span>
    </p>
    </section>`);

export default class TripInfoView extends AbstractView {
  #points = null;
  #pointDestination = [];
  #pointOffers = [];

  constructor({points = POINT_EMPTY, pointDestination, pointOffers}) {
    super();
    this.#points = points;
    this.#pointDestination = points
      .map((point) => findDestinationForPoint(point, pointDestination))
      .map((destination) => destination.name);
    this.#pointOffers = points
      .map((point) => findOffersForPoint(point, pointOffers))
      .map((offer) => offer.offers);
  }

  get template() {
    return createTripInfoTemplate({
      points: this.#points,
      pointDestination: this.#pointDestination,
    });
  }
}
