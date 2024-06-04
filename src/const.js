export const FILTER_ITEMS = ['everything', 'future', 'present', 'past'];
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

export const MessageEmptyList = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};
