import {getRandomInt, getRandomBulValue, getDate, getRandomArrayElement} from '../utils.js';

export const generatePoint = (offerType, destinationId, offerIds) => ({
  id: crypto.randomUUID(),
  basePrice: getRandomInt(),
  dateFrom: getDate(false),
  dateTo: getDate(true),
  destination: destinationId,
  isFavorite: getRandomBulValue(),
  offers: offerIds.map(() => (getRandomArrayElement(offerIds))),
  type: offerType
}
);
