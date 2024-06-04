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

export const DateFormat = {
  DATE: 'MMM D',
  DATE_WITH_YEAR: 'YYYY-MM-DD',
  TIME: 'hh:mm',
  DATE_TIME: 'YYYY-MM-DDTHH:mm',
  CALENDAR_DATE: 'DD/MM/YY hh:mm',
};

export const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future',
};

export const MessageEmptyList = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};
