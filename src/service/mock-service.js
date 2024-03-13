import {generateDestination} from '../mock/destination.js';
import {generateOffer} from '../mock/offer.js';
import {generatePoint} from '../mock/point.js';
import {getRandomIntFromRange, getRandomArrayElement, getRandomBulValue} from '../utils.js';
import {DESTINATION_COUNT, ROUTE_TYPE, OFFER_COUNT, POINT_COUNT} from '../mock/const.js';

export default class MockService {
  destinations = [];
  offers = [];
  points = [];

  constructor() {
    this.destinations = this.generateDestinations();
    this.offers = this.generateOffers();
    this.points = this.generatePoints();
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getPoints() {
    return this.points;
  }

  generateDestinations() {
    return Array.from({length: DESTINATION_COUNT}, () => generateDestination());
  }

  generateOffers() {
    return ROUTE_TYPE.map((type) => ({
      type,
      offers: Array.from({length: getRandomIntFromRange(0, OFFER_COUNT)}, () => generateOffer())
    }));
  }

  generatePoints() {
    return Array.from({length: POINT_COUNT}, () => {
      const type = getRandomArrayElement(ROUTE_TYPE);
      const destination = getRandomArrayElement(this.destinations);
      const hasOffers = getRandomBulValue();
      const offersByType = this.offers.find((offerByType) => offerByType.type === type);
      const offerIds = (hasOffers)
        ? offersByType.offers.map((offer) => offer.offers.id)
        : [];

      return generatePoint(type, destination.id, offerIds);
    });
  }
}
