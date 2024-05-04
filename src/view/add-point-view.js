import AbstractView from '../framework/view/abstract-view.js';
import {POINT_EMPTY, CITIES, ROUTE_TYPE} from '../mock/const.js';

const getDestinationItem = (city) => `<option value="${city}"></option>`;

const getEventTypeItem = (typeItem, type) => `<div class="event__type-item">
    <input id="event-type-${typeItem.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeItem.toLowerCase()}"
    ${typeItem === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${typeItem.toLowerCase()}" for="event-type-${typeItem.toLowerCase()}-1">${typeItem}</label>
  </div>`;

const getOfferItem = (offer) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offer.id}" type="checkbox" name="event-offer-luggage">
  <label class="event__offer-label" for="event-offer-luggage-${offer.id}">
    <span class="event__offer-title">${offer.title}</span>
    +€&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`;

const createAddPointTemplate = ({point, pointOffers}) => {
  const {basePrice, dateFrom, dateTo, destination, type, id} = point;
  const cityItemsTemplate = CITIES.map((cityItem) => getDestinationItem(cityItem)).join('');
  const typeItemsTemplate = ROUTE_TYPE.map((typeItem) => getEventTypeItem(typeItem, type)).join('');
  const offerItemsTemplate = pointOffers.map((offer) => getOfferItem(offer, point.offers)).join('');

  return (`<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="${type} icon">
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
          Flight
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${''}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${cityItemsTemplate}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
      —
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      ${pointOffers.length !== 0
      ? `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  ${offerItemsTemplate}
  </div>
  </section>`
      : ''}

      ${destination !== '' ? `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${''}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${''}
        </div>
      </div>
    </section>` : ''}
    </section>
  </form>
</li>`);};

export default class AddPointView extends AbstractView{
  #point = null;
  #pointOffers = [];

  #handleSaveClick = null;
  #handleCancelClick = null;

  constructor({point = POINT_EMPTY, pointOffers, onSaveClick, onCancelClick}) {
    super();
    this.#point = point;
    this.#pointOffers = pointOffers.getByType(point.type);

    this.#handleSaveClick = onSaveClick;
    this.#handleCancelClick = onCancelClick;

    this.element.querySelector('.event__save-btn').addEventListener('submit', this.#saveClickHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#cancelClickHandler);
  }

  get template() {
    return createAddPointTemplate({
      point: this.#point,
      pointOffers: this.#pointOffers
    });
  }

  #saveClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleSaveClick();
  };

  #cancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
  };
}
