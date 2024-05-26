import {formatToSlashDate} from '../utils.js';
import {CITIES, POINT_EMPTY, ROUTE_TYPE , EditType} from '../mock/const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const getPicrtureItem = (picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;

const getDestinationItem = (city) => `<option value="${city}"></option>`;

const getEventTypeItem = (typeItem, type) => `<div class="event__type-item">
    <input id="event-type-${typeItem.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeItem.toLowerCase()}"
    ${typeItem === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${typeItem.toLowerCase()}" for="event-type-${typeItem.toLowerCase()}-1">${typeItem}</label>
  </div>`;

const getOfferItem = (offer, pointOffers) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offer.id}" data-offerId=${offer.id} type="checkbox" name="event-offer-luggage"
        ${pointOffers.includes(offer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-luggage-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
    </div>`;

const createEditPointTemplate = ({state, pointDestinations, pointOffers, type}) => {
  const {basePrice, dateFrom, dateTo, id, destination, offers} = state;
  const pointDestination = typeof(pointDestinations.getById(destination)) === 'undefined'
    ? null
    : pointDestinations.getById(destination);
  const pictureItemsTemplate = pointDestinations
    .getById(destination)
    ?.pictures.map((picture) => getPicrtureItem(picture)).join('');
  const typeItemsTemplate = ROUTE_TYPE.map((typeItem) => getEventTypeItem(typeItem, type)).join('');
  const cityItemsTemplate = CITIES.map((cityItem) => getDestinationItem(cityItem)).join('');
  const offerItemsTemplate = pointOffers.map((offer) => getOfferItem(offer, offers)).join('');

  return `<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${state.type}.png" alt="${state.type} icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${typeItemsTemplate}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${state.type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
      value="${pointDestination ? pointDestination.name : ''}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${cityItemsTemplate}
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
      <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price"
      value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    ${type === 'EDITING'
    ? `<button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`
    : '<button class="event__reset-btn" type="reset">Cancel</button>'}
  </header>
  <section class="event__details">
  ${state.offers.length !== 0
    ? `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  ${offerItemsTemplate}
  </div>
  </section>`
    : ''}
    <section class="event__section  event__section--destination">
    ${pointDestination
    ? `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${pointDestination.description}</p>`
    : ''}

  ${pointDestination
    ? `<div class="event__photos-container">
     <div class="event__photos-tape">
       ${pictureItemsTemplate}
     </div>
   </div>`
    : ''}
    </section>
  </section>
</form>
</li>`;
};

export default class EditPointView extends AbstractStatefulView{
  #pointDestination = [];
  #offers = [];
  #destinations = [];
  #pointOffers = [];
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleSubmitClick = null;
  #handleDeleteClick = null;
  #handleResetClick = null;
  #handleCancelClick = null;
  #type;

  constructor({point = POINT_EMPTY, pointDestination, pointOffers,
    onSubmitClick, onDeleteClick, onResetClick, onCancelClick, type = EditType.EDITING}) {
    super();
    this.#destinations = pointDestination;
    this.#pointDestination = pointDestination.getById(point.destination);
    this.#offers = pointOffers;
    this.#pointOffers = pointOffers.getByType(point.type);

    this.#handleSubmitClick = onSubmitClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleResetClick = onResetClick;
    this.#handleCancelClick = onCancelClick;
    this.#type = type;

    this._setState(EditPointView.parsePointToState(point));

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate({
      state:  this._state,
      pointDestinations: this.#destinations,
      pointOffers: this.#pointOffers,
      type: this.#type
    });
  }

  reset = (point) => this.updateElement(point);

  _restoreHandlers() {
    if (this.#type === EditType.EDITING) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpClickHandler);
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    }

    if (this.#type === EditType.CREATING) {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetClickHandler);
    }

    this.element.querySelector('form').addEventListener('submit', this.#submitClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#routeTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);

    this.#setDatepickers();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate
    });
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate
    });
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };

  #setDatepickers = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locate: {
        firstDayOfWeek: 1,
      },
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.dateTo
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.dateFrom
      }
    );
  };

  #submitClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmitClick(this._state);
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(this._state);
  };

  #rollUpClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleResetClick();
  };

  #resetClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
  };

  #routeTypeChangeHandler = (evt) => {
    const routeType = evt.target.value.charAt(0).toUpperCase() + evt.target.value.slice(1);
    this.#pointOffers = this.#offers.getByType(routeType);

    this.updateElement({
      type: routeType,
      offers: this.#pointOffers
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations.getByName(evt.target.value);

    const destinationId = (selectedDestination)
      ? selectedDestination.id
      : null;

    this.updateElement({
      destination: destinationId,
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      basePrice: Number(evt.target.value)
    });
  };

  #offerChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      offers: checkedBoxes.map((element) => element.dataset.offerid)
    });
  };

  static parsePointToState = (point) => ({...point});

  static parseStateToPoint = (state) => state;
}
