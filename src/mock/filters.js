import {FilterType} from './const.js';
import {ispointExpired} from '../utils.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]:(points) => points.filter((point) => !ispointExpired(point.dateFrom) && !ispointExpired(point.dateTo)),
  [FilterType.PRESENT]:(points) => points.filter((point) => ispointExpired(point.dateFrom) && !ispointExpired(point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => ispointExpired(point.dateFrom) && ispointExpired(point.dateTo))
};

export const generateFilter = (points) => (
  Object.entries(filter).map(([filterType, filterPoints]) => ({
    type: filterType,
    filteredPoints: filterPoints(points)
  }))
);
