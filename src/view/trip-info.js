import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view';
import {MAX_DESTINATION_HEADER_COUNT, DateFormat} from '../const';
import {getHumanDate} from '../utils/event';

const createTripInfoTemplate = (destinationNames, dateFrom, dateTo, cost) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${destinationNames.length <= MAX_DESTINATION_HEADER_COUNT
    ? destinationNames.map((name) => name).join(' &mdash; ')
    : `${destinationNames[0]} &mdash; ... &mdash; ${destinationNames[destinationNames.length - 1]}`}
      </h1>

      <p class="trip-info__dates">${dayjs(dateFrom).diff(dateTo, 'month')
    ? `${getHumanDate(dateFrom, DateFormat.DATE_REVERSE)}&nbsp;&mdash;&nbsp;${getHumanDate(dateTo, DateFormat.DATE_REVERSE)}`
    : `${getHumanDate(dateFrom, DateFormat.DAY)}&nbsp;&mdash;&nbsp;${getHumanDate(dateTo, DateFormat.DATE_REVERSE)}`}
      </p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>
  </section>`
);

export default class TripInfo extends AbstractView {
  #destinationNames = [];
  #dateFrom = null;
  #dateTo = null;
  #totalCost = null;

  constructor({uniqueDestinationNames, points, totalCost}) {
    super();
    this.#destinationNames = uniqueDestinationNames;
    this.#dateFrom = points[0].dateFrom;
    this.#dateTo = points[points.length - 1].dateTo;
    this.#totalCost = totalCost;
  }

  get template() {
    return createTripInfoTemplate(this.#destinationNames, this.#dateFrom, this.#dateTo, this.#totalCost);
  }
}
