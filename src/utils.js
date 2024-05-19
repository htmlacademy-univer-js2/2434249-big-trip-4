import dayjs from 'dayjs';
import {DAY_FOMAT, DATE_FORMAT, TIME_FORMAT, FULL_TIME_FOMAT, MILLISECONDS_IN_DAY, MILLISECONDS_IN_HOUR, BooleanValues, SLASH_TIME_FOMAT} from './mock/const';

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

export const getRandomBulValue = () => getRandomArrayElement(BooleanValues);

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

export const getRandomPictureElement = (city) => ({
  src: `https://loremflickr.com/320/240/dog?random=${getRandomInt()}`,
  description: `${city} description`
});

export const Duration = {
  MIN: 59,
  HOUR: 5,
  DAY: 5
};

export const getDate = (add) => {
  let date = dayjs().subtract(getRandomIntFromRange(0, Duration.DAY), 'day').toDate();

  const mins = getRandomIntFromRange(0, Duration.MIN);
  const hours = getRandomIntFromRange(0, Duration.HOUR);
  const days = getRandomIntFromRange(0, Duration.DAY);

  if (add) {
    date = dayjs(date)
      .add(mins, 'minute')
      .add(hours, 'hour')
      .add(days, 'days')
      .toDate();
  }

  return date;
};

export const getPicturesArray = (city) => Array.from({length: getRandomIntFromRange(0, 5)}, () => getRandomPictureElement(city));

export const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export const sortPointDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

export const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const sortPointTime = (pointA, pointB) => {
  const timeDifferencePointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timeDifferencePointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return timeDifferencePointB - timeDifferencePointA;
};
