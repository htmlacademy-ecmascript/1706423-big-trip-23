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
  } else {
    if (days) {
      result += '00H ';
    }
  }

  const minutes = dayjs(dateTo).diff(dayjs(dateFrom), 'm') % 60;
  if (minutes) {
    result += minutes < 10 ? `0${minutes}M` : `${minutes}M`;
  } else {
    result += '00M';
  }

  return result;
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB);
}

function isPriceEqual(priceA, priceB) {
  return (priceA === null && priceB === null) || priceA !== priceB;
}

export {getHumanDate, getTimeInterval, isDatesEqual, isPriceEqual};
