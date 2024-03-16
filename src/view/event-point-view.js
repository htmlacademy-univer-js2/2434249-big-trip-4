import {createElement} from '../render.js';
import {formatToTime, formatToDate, formatToShortDate, getPointDuration} from '../utils.js';
import {POINT_EMPTY} from '../mock/const.js';

const offerShow = (offersArray) => {
  if (offersArray.length !== 0) {
    let offerElements = '';

    offersArray.forEach((offer) => {
      offerElements += `<li class="event__offer">
    <span class="event__offer-title">${offer.offers.title}</span>
    +€&nbsp;
    <span class="event__offer-price">${offer.offers.price}</span>
  </li>`;
    });

    return offerElements;
  }
  return '';
};

const createEventPointTemplate = ({point, pointDestination, pointOffers}) => {
  const {basePrice, dateFrom, dateTo, isFavorite, type} = point;

  return (`<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${formatToDate(dateFrom)}">${formatToShortDate(dateFrom)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="${type} icon">
    </div>
    <h3 class="event__title">${type} ${pointDestination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${formatToDate(dateFrom)}">${formatToTime(dateFrom)}</time>
        —
        <time class="event__end-time" datetime="${formatToDate(dateTo)}">${formatToTime(dateTo)}</time>
      </p>
      <p class="event__duration">${getPointDuration(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      €&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offerShow(pointOffers)}
    </ul>
    <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`);
};

export default class EventPointView {
  constructor({point = POINT_EMPTY, pointDestination, pointOffers}) {
    this.point = point;
    this.pointDestination = pointDestination;
    this.pointOffers = pointOffers;
  }

  getTemplate() {
    return createEventPointTemplate({
      point: this.point,
      pointDestination: this.pointDestination,
      pointOffers: this.pointOffers
    });
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
