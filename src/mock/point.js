import {getRandomInt, getRandomBulValue, getDate} from '../utils.js';

export const generatePoint = (offerType, destinationId, offerIds) => ({
  id: crypto.randomUUID(),
  basePrice: getRandomInt(),
  dateFrom: getDate(false),
  dateTo: getDate(true),
  destination: destinationId,
  isFavorite: getRandomBulValue(),
  offers: offerIds,
  type: offerType
}
);
