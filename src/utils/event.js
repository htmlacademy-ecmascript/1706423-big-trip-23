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

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB);
}

export {getHumanDate, getTimeInterval, isDatesEqual};
