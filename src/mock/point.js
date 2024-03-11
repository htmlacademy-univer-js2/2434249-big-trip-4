import {getRandomInt, getRandomBulValue} from '../utils.js';

export const generatePoint = (offerType, destinationId, offerIds) => ({
  id: crypto.randomUUID(),
  basePrice: getRandomInt(),
  dateFrom: '2019-01-10T20:55:56.845Z',
  dateTo: '2019-01-12T22:55:56.845Z',
  destination: destinationId,
  isFavorite: getRandomBulValue(),
  offers: offerIds,
  type: offerType
});
