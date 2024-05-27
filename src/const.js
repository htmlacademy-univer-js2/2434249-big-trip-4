export const DATE_FORMAT = 'MMM D';
export const TIME_FORMAT = 'HH:mm';
export const DAY_FOMAT = 'D';
export const FULL_TIME_FOMAT = 'YYYY-MM-DDTHH:mm';
export const SLASH_TIME_FOMAT = 'DD/MM/YY HH:mm';
export const MILLISECONDS_IN_DAY = 86400000;
export const MILLISECONDS_IN_HOUR = 3600000;

export const BooleanValues = [
  true,
  false
];

export const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export const POINT_EMPTY = {
  id: crypto.randomUUID(),
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  ifFavorite: false,
  offers: [],
  type: 'Flight',
};

export const ROUTE_TYPE = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

export const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST'
};

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export const EmptyListMessage = {
  EVERYTHING: '<p class="trip-events__msg">Click New Event to create your first point</p>',
  FUTURE: '<p class="trip-events__msg">There are no past events now</p>',
  PRESENT: '<p class="trip-events__msg">There are no present events now</p>',
  PAST: '<p class="trip-events__msg">There are no future events now</p>'
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  CREATE_POINT: 'CREATE_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export const EditType = {
  CREATING: 'CREATING',
  EDITING: 'EDITING'
};

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};
