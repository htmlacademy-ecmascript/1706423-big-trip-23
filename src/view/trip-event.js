import {getHumanDate, getTimeInterval} from '../utils';
import {DateFormat} from '../const';
import AbstractView from '../framework/view/abstract-view';

const createEventOffer = (offer) => (`
  <li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>`
);

const createTripEventTemplate = (point, options, places) => {
  const {basePrice, dateFrom, dateTo, destination, isFavorite, offers, type} = point;
  const currentOffers = options.filter((option) => option.type === type)[0].offers;
  const currentDestination = places.find((place) => place.id === destination);

  return (`
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${getHumanDate(dateFrom, DateFormat.DATE_WITH_YEAR)}">${getHumanDate(dateFrom, DateFormat.DATE)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${currentDestination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getHumanDate(dateFrom, DateFormat.DATE_TIME)}">${getHumanDate(dateFrom, DateFormat.TIME)}</time>
            &mdash;
            <time class="event__end-time" datetime="${getHumanDate(dateTo, DateFormat.DATE_TIME)}">${getHumanDate(dateTo, DateFormat.TIME)}</time>
          </p>
          <p class="event__duration">${getTimeInterval(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${currentOffers.map((offer) => offers.includes(offer.id) ? createEventOffer(offer) : '').join('')}
        </ul>
        <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class TripEvent extends AbstractView {
  #point = null;
  #options = null;
  #places = null;
  #handleRollupButtonClick = null;

  constructor({point, options, places, onRollupButtonClick}) {
    super();
    this.#point = point;
    this.#options = options;
    this.#places = places;
    this.#handleRollupButtonClick = onRollupButtonClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupButtonClickHandler);
  }

  get template() {
    return createTripEventTemplate(this.#point, this.#options, this.#places);
  }

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };
}
