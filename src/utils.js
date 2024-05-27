import dayjs from 'dayjs';
import {DAY_FOMAT, DATE_FORMAT, TIME_FORMAT,
  FULL_TIME_FOMAT, MILLISECONDS_IN_DAY, MILLISECONDS_IN_HOUR,
  SLASH_TIME_FOMAT, FilterType} from './const';

// eslint-disable-next-line no-undef
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export const formatToDate = (dueDate) => dueDate ? dayjs(dueDate).format(FULL_TIME_FOMAT) : '';

export const formatToDay = (dueDate) => dueDate ? dayjs(dueDate).format(DAY_FOMAT) : '';

export const formatToTime = (dueDate) => dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';

export const formatToShortDate = (time) => time ? dayjs(time).format(DATE_FORMAT) : '';

export const formatToSlashDate = (time) => time ? dayjs(time).format(SLASH_TIME_FOMAT) : '';

export const ispointExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');

export const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export const getRandomInt = () => Math.floor(Math.random() * 1000);

export const getRandomIntFromRange = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const getPointDuration = (dateFrom, dateTo) => {
  const timeDifference = dayjs(dateTo).diff(dayjs(dateFrom));

  if (timeDifference >= MILLISECONDS_IN_DAY) {
    return dayjs.duration(timeDifference).format('DD[D] HH[H] mm[M]');
  } else if (timeDifference >= MILLISECONDS_IN_HOUR) {
    return dayjs.duration(timeDifference).format('HH[H] mm[M]');
  } else if (timeDifference < MILLISECONDS_IN_HOUR) {
    return dayjs.duration(timeDifference).format('mm[M]');
  }
};

export const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export const sortPointDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

export const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const sortPointTime = (pointA, pointB) => {
  const timeDifferencePointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timeDifferencePointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return timeDifferencePointB - timeDifferencePointA;
};

export const isBigDifference = (pointA, pointB) =>
  pointA.dateFrom !== pointA.dateFrom
  || pointA.basePrice !== pointB.basePrice
  || dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom)) !== dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]:(points) => points.filter((point) => !ispointExpired(point.dateFrom) && !ispointExpired(point.dateTo)),
  [FilterType.PRESENT]:(points) => points.filter((point) => ispointExpired(point.dateFrom) && !ispointExpired(point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => ispointExpired(point.dateFrom) && ispointExpired(point.dateTo))
};

export const adaptToClient = (point) => {
  const adaptedPoint = {
    ...point,
    basePrice: point['base_price'],
    dateFrom: point['date_from'],
    dateTo: point['date_to'],
    isFavorite: point['is_favorite']
  };

  delete adaptedPoint['base_price'];
  delete adaptedPoint['date_from'];
  delete adaptedPoint['date_to'];
  delete adaptedPoint['is_favorite'];

  return adaptedPoint;
};

export const adaptToServer = (point) => {
  const adaptedPoint = {
    ...point,
    ['base_price']: point.basePrice,
    ['date_from']: new Date(point.dateFrom).toISOString(),
    ['date_to']: new Date(point.dateTo).toISOString(),
    ['is_favorite']: point.isFavorite
  };

  delete adaptedPoint.basePrice;
  delete adaptedPoint.dateFrom;
  delete adaptedPoint.dateTo;
  delete adaptedPoint.isFavorite;

  return adaptedPoint;
};
