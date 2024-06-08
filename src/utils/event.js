import dayjs from 'dayjs';

function getHumanDate(date, format) {
  return dayjs(date).format(format);
}

function getTimeInterval(dateFrom, dateTo) {
  let result = '';

  const days = dayjs(dateTo).diff(dayjs(dateFrom), 'd');
  if (days) {
    result += days < 10 ? `0${days}D ` : `${days}D `;
  }

  const hours = dayjs(dateTo).diff(dayjs(dateFrom), 'h') % 24;
  if (hours) {
    result += hours < 10 ? `0${hours}H ` : `${hours}H `;
  }

  const minutes = dayjs(dateTo).diff(dayjs(dateFrom), 'm') % 60;
  if (minutes) {
    result += minutes < 10 ? `0${minutes}M` : `${minutes}M`;
  }

  return result;
}

function getDefaultPoint() {
  return {
    destination: '5bbd083d-e0ec-451a-b146-f6343f63aa63',
    offers: [],
    type: 'flight'
  };
}

function sortPointTime(pointA, pointB) {
  const intervalA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const intervalB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return intervalB - intervalA;
}

function sortPointPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

export {getHumanDate, getTimeInterval, getDefaultPoint, sortPointTime, sortPointPrice};
