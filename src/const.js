export const SORT_ITEMS = [
  {
    id: 'day',
    name: 'Day',
    isClickable: true,
  },
  {
    id: 'event',
    name: 'Event',
    isClickable: false,
  },
  {
    id: 'time',
    name: 'Time',
    isClickable: true,
  },
  {
    id: 'price',
    name: 'Price',
    isClickable: true,
  },
  {
    id: 'offer',
    name: 'Offers',
    isClickable: false,
  },
];
export const EVENT_TYPES = [
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

export const DEFAULT_POINT = {
  offers: [],
  type: 'flight',
  isFavorite: false,
};

export const DateFormat = {
  DATE: 'MMM D',
  DATE_WITH_YEAR: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  DATE_TIME: 'YYYY-MM-DDTHH:mm',
  CALENDAR_DATE: 'DD/MM/YY HH:mm',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const MessageEmptyList = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

export const ERROR_MESSAGE = 'Failed to load latest route information';

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offer',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
