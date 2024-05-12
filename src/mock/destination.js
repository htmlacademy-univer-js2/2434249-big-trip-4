import {getRandomArrayElement, getPicturesArray} from '../utils.js';
import {CITIES, DESCRIPTION} from './const.js';

export const generateDestination = (index) => {
  const city = CITIES[index];

  return {
    id: crypto.randomUUID(),
    description: getRandomArrayElement(DESCRIPTION),
    name: city,
    pictures: getPicturesArray(city)
  };
};
