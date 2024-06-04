import dayjs from 'dayjs';
import {FilterType} from '../const';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) => dayjs(point.dateTo) < dayjs()),
  [FilterType.PRESENT]: (points) => points.filter((point) => dayjs(point.dateTo) <= dayjs() && dayjs(point.dateFrom) >= dayjs()),
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs(point.dateFrom) > dayjs()),
};

export {filter};
