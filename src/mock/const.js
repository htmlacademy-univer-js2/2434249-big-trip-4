export const DATE_FORMAT = 'MMM D';
export const TIME_FORMAT = 'HH:mm';
export const DAY_FOMAT = 'D';
export const FULL_TIME_FOMAT = 'YYYY-MM-DDTHH:mm';
export const SLASH_TIME_FOMAT = 'DD/MM/YY HH:mm';
export const MILLISECONDS_IN_DAY = 86400000;
export const MILLISECONDS_IN_HOUR = 3600000;
export const POINT_COUNT = 10;
export const DESTINATION_COUNT = POINT_COUNT;
export const OFFER_COUNT = 10;

export const BooleanValues = [
  true,
  false
];

export const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export const POINT_EMPTY = {
  id: 1,
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  ifFavorite: false,
  offers: [],
  type: 'Flight',
};

export const EMPTY_WARNINGS = {
  EVERYTHING: 'Click New Event to create your first',
  FUTURE: 'There are no past events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no future events now'
};

export const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
  'Aenean commodo ligula eget dolor. Aenean mass.',
  'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
  'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.',
  'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. '
];

export const OFFERS = [
  'Close But No Cigar',
  'On the Same Page',
  'Jaws of Death',
  'Every Cloud Has a Silver',
  'Jig Is Up',
  'In a Pickle',
  'What Goes Up Must Come',
  'Break The Ice',
  'In the Red',
];

export const ROUTE_TYPE = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

export const CITIES = [
  'Salisbury',
  'Kingston',
  'Ripon',
  'Liverpool',
  'Carlisle',
  'Oxford',
  'Manchester',
  'Chelmsford',
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
