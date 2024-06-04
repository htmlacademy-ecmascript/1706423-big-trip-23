import {getRandomArrayElement} from '../utils/utils';

const points = [
  {
    id: '1',
    basePrice: 5159,
    dateFrom: '2024-06-18T19:13:06.679Z',
    dateTo: '2024-06-18T20:27:06.679Z',
    destination: 'd223ffca-8cb0-410e-8db9-5aab3d174863',
    isFavorite: true,
    offers: ['1', '2', '3'],
    type: 'flight'
  },
  {
    id: '2',
    basePrice: 7418,
    dateFrom: '2024-06-21T22:39:06.679Z',
    dateTo: '2024-06-23T08:37:06.679Z',
    destination: '27e1c181-ab6c-4a37-9985-3ef787f6b385',
    isFavorite: false,
    offers: [],
    type: 'ship'
  },
  {
    id: '3',
    basePrice: 5781,
    dateFrom: '2024-06-25T07:54:06.679Z',
    dateTo: '2024-06-26T15:48:06.679Z',
    destination: '5bbd083d-e0ec-451a-b146-f6343f63aa63',
    isFavorite: false,
    offers: ['2'],
    type: 'drive'
  },
];

const getRandomPoint = () => getRandomArrayElement(points);

export {getRandomPoint};
