import {SortType} from './const.js';
import {getPointDuration} from '../utils.js';

const sort = {
  [SortType.DAY]: (points) => points.sort((point) => point.dateFrom),
  [SortType.EVENT]: (points) => points.sort((point) => point),
  [SortType.TIME]:(points) => points.sort((point) => getPointDuration(point.dateFrom, point.dateTo)),
  [SortType.PRICE]: (points) => points.sort((point) => point.basePrice),
  [SortType.OFFERS]: (points) => points.sort((point) => point),
};

export const generateSorter = (points) => (
  Object.entries(sort).map(([sortType, sortPoints]) => ({
    type: sortType,
    sortedPoints: sortPoints(points)
  }))
);
