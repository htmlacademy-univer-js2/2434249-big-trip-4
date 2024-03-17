import {formatToSlashDate} from '../utils.js';
import {POINT_EMPTY, ROUTE_TYPE} from '../mock/const.js';
import AbstractView from '../framework/view/abstract-view.js';

const getPicrtureArrayElement = (picturesArray) => {
  let tapeElements = '';

  picturesArray.forEach((picture) => {
    tapeElements += `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
  });

  return tapeElements;
};

const getOffersArrayElement = (offersArray) => {
  if (offersArray.length !== 0) {
    let offersElements = `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>`;

    offersArray.forEach((offer, i) => {
      offersElements += `
      <div class="event__available-offers">
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${++i}" type="checkbox" name="event-offer-luggage" checked="">
        <label class="event__offer-label" for="event-offer-luggage-${i}">
          <span class="event__offer-title">${offer.offers.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${offer.offers.price}</span>
        </label>
      </div>`;
    });

    offersElements += '</section>';

    return offersElements;
  } else {
    return '';
  }
};

const getEventTypeElements = (typeArray) => {
  let typeElements = '';

  typeArray.forEach((type) => {
    typeElements += `<div class="event__type-item">
    <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
  </div>`;
  });

  return typeElements;
};

const createEditPointTemplate = ({point, pointDestination, pointOffers}) => {
  const {basePrice, dateFrom, dateTo, type} = point;

  return `<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="${type} icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${getEventTypeElements(ROUTE_TYPE)}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        Flight
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointDestination.name}" list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatToSlashDate(dateFrom)}">
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatToSlashDate(dateTo)}">
      </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        €
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
  ${getOffersArrayElement(pointOffers)}
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${pointDestination.description}</p>

      <div class="event__photos-container">
          <div class="event__photos-tape">
            ${getPicrtureArrayElement(pointDestination.pictures)}
          </div>
        </div>
    </section>
  </section>
</form>
</li>`;
};

export default class EditPointView extends AbstractView{
  #point = null;
  #pointDestination = [];
  #pointOffers = [];
  #handleSubmitClick = null;
  #handleRollUpClick = null;

  constructor({point = POINT_EMPTY, pointDestination, pointOffers, onSubmitClick, onRollUpClick}) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;

    this.#handleSubmitClick = onSubmitClick;
    this.#handleRollUpClick = onRollUpClick;

    this.element.querySelector('.event__save-btn').addEventListener('submit', this.#submitClickHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpClickHandler);
  }

  get template() {
    return createEditPointTemplate({
      point:  this.#point,
      pointDestination: this.#pointDestination,
      pointOffers: this.#pointOffers
    });
  }

  #submitClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmitClick();
  };

  #rollUpClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollUpClick();
  };
}
