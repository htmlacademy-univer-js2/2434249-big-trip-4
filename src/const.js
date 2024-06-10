export const DATE_FORMAT = 'MMM D';
export const TIME_FORMAT = 'HH:mm';
export const DAY_FOMAT = 'D';
export const FULL_TIME_FOMAT = 'YYYY-MM-DDTHH:mm';
export const SLASH_TIME_FOMAT = 'DD/MM/YY HH:mm';
export const MILLISECONDS_IN_DAY = 86400000;
export const MILLISECONDS_IN_HOUR = 3600000;

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
  isFavorite: false,
  offers: ['f6ddb8b3-e341-4f35-a213-0bcae36317fd',
    'ad4f8e0c-6078-4976-8d74-dccbde695ab4',
    '8420a013-28c9-47a8-85e7-1d430afc1580',
    'e6f5e9f5-381a-45cd-b15f-780ebb99ba7f',
    '7850ca85-fcd0-4aa5-aabe-ca5263bd34e2',
    '0e07a8a3-b358-4310-a9f3-a035eaf13029'
  ],
  type: 'flight'
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
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past'
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
