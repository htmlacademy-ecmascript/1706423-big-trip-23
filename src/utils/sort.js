import dayjs from 'dayjs';
import { SortType } from '../const';

function sortPointDate(pointA, pointB) {
  return dayjs(pointA.dateFrom) - dayjs(pointB.dateFrom);
}

function sortPointTime(pointA, pointB) {
  const intervalA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const intervalB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return intervalB - intervalA;
}

function sortPointPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

const sortBy = {
  [SortType.DAY]: (points) => points.sort(sortPointDate),
  [SortType.TIME]: (points) => points.sort(sortPointTime),
  [SortType.PRICE]: (points) => points.sort(sortPointPrice),
};

export {sortBy};
