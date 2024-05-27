import {POINT_EMPTY} from '../const.js';
import {formatToShortDate, formatToDay} from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

const getOffersCoast = (offersIds = [], offers = []) => offersIds.reduce(
  (result, id) => result + (offers.find((offer) => offer.id === id)?.price ?? 0),
  0
);

const getTripCost = (points = [], offers = []) => points.reduce(
  (result, point) => result + point.basePrice + getOffersCoast(point.offers, offers.find((offer) => point.type === offer.type)?.offers),
  0
);

const findDestinationForPoint = (point, pointDestination) =>
  pointDestination.find((destination) => destination.id === point.destination);

const createDestinationElement = (destinations) =>
  destinations.length <= 3
    ? destinations.map((destination) => (`${destination} - `)).join('').slice(0, -2)
    : `${destinations[0]} - ... - ${destinations[destinations.length - 1]}`;

const createTripInfoTemplate = ({points, destination, isEmpty, cost}) =>
  (`${!isEmpty
    ? `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${createDestinationElement(destination)}</h1>

      <p class="trip-info__dates">${formatToShortDate(points[0].dateFrom)}&nbsp;—&nbsp;
      ${dayjs(points[points.length - 1].dateTo).month() === dayjs(points[0].dateFrom).month()
      ? formatToDay(points[points.length - 1].dateTo)
      : formatToShortDate(points[points.length - 1].dateTo)}</p>
    </div>

    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">
      ${cost}</span>
    </p>
    </section>`
    : ''
  }`);

export default class TripInfoView extends AbstractView {
  #points = 0;
  #destination = [];
  #offers = [];

  constructor({points = POINT_EMPTY, destinations, offers}) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destination = points
      .map((point) => findDestinationForPoint(point, destinations))
      .map((destination) => destination.name);
  }

  get template() {
    return createTripInfoTemplate({
      points: this.#points,
      destination: this.#destination,
      isEmpty: this.#points.length === 0,
      cost: getTripCost(this.#points, this.#offers)
    });
  }
}
