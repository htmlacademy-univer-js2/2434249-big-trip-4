import {getRandomArrayElement, getPicturesArray} from '../utils.js';
import {CITIES, DESCRIPTION} from './const.js';

export const generateDestination = () => {
  const city = getRandomArrayElement(CITIES);

  return {
    id: crypto.randomUUID(),
    description: getRandomArrayElement(DESCRIPTION),
    name: city,
    pictures: getPicturesArray(city)
  };
};
