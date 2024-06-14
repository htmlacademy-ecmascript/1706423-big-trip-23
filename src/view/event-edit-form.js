import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {EVENT_TYPES, DEFAULT_POINT} from '../const';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createEventType = (type, currentType, isDisabled) => (`
  <div class="event__type-item">
    <input
      data-event-type="${type}"
      id="event-type-${type}-1"
      class="event__type-input visually-hidden"
      type="radio"
      name="event-type"
      value="${type}"
      ${type === currentType ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}
    />
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1"
      >${type.charAt(0).toUpperCase()}${type.slice(1)}</label
    >
  </div>`
);

const createEventOffer = (offer, isChecked, isDisabled) => (`
  <div class="event__offer-selector">
    <input
      data-offer-id="${offer.id}"
      class="event__offer-checkbox  visually-hidden"
      id="event-offer-${offer.title.toLowerCase().split(' ').join('-')}-1"
      type="checkbox"
      name="event-offer-${offer.title.toLowerCase().split(' ').join('-')}"
      ${isChecked ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}
    />
    <label class="event__offer-label" for="event-offer-${offer.title.toLowerCase().split(' ').join('-')}-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`
);

const createEventDestination = (destination) => (`
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${destination.pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
      </div>
    </div>
  </section>`
);

const createEventEditFormTemplate = (point, options, places) => {
  const {id, basePrice, destination, offers, type, isDisabled, isSaving, isDeleting} = point;
  const currentOffers = options.filter((option) => option.type === type)[0];
  const currentDestination = places.find((place) => place.id === destination);

  return (`
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${EVENT_TYPES.map((item) => createEventType(item, type, isDisabled)).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input
              class="event__input event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${currentDestination ? currentDestination.name : ''}"
              list="destination-list-1"
              ${isDisabled ? 'disabled' : ''}
            >
            <datalist id="destination-list-1">
              ${places.map((place) => `<option value="${place.name}"></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input
              class="event__input event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value=""
              ${isDisabled ? 'disabled' : ''}
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value=""
              ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input event__input--price"
              id="event-price-1"
              type="number"
              name="event-price"
              value="${basePrice ?? 0}"
              ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
            ${isSaving ? 'Saving...' : 'Save'}
          </button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
            ${id ? `${isDeleting ? 'Deleting' : 'Delete'}` : 'Cancel'}
          </button>
          ${id ? `<button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}><span class="visually-hidden">Open event</span></button>` : ''}
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${currentOffers.offers.map((offer) => createEventOffer(offer, offers.includes(offer.id), isDisabled)).join('')}
            </div>
          </section>

          ${currentDestination ? createEventDestination(currentDestination) : ''}
        </section>
      </form>
    </li>`
  );
};

export default class EventEditForm extends AbstractStatefulView {
  #options = null;
  #places = null;
  #handleFormSubmit = null;
  #handleRollupButtonClick = null;
  #handleDeleteClick = null;
  #datepicker = null;

  constructor({point = DEFAULT_POINT, options, places, onFormSubmit, onRollupButtonClick, onDeleteClick}) {
    super();
    this._setState(EventEditForm.parsePointToState(point));
    this.#options = options;
    this.#places = places;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createEventEditFormTemplate(this._state, this.#options, this.#places);
  }

  reset(point) {
    this.updateElement(
      EventEditForm.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    if (this.element.querySelector('.event__rollup-btn')) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupButtonClickHandler);
    }
    this.element.querySelector('.event__type-group').addEventListener('change', this.#handleEventTypeChange);
    this.element.querySelector('#event-destination-1').addEventListener('change', this.#handleDestinationChange);
    this.element.querySelector('#event-price-1').addEventListener('change', this.#handlePriceChange);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#handleOfferChange);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);

    this.#setDatepicker(this.element.querySelector('#event-start-time-1'), this._state.dateFrom, this.#dateFromChangeHandler);
    this.#setDatepicker(this.element.querySelector('#event-end-time-1'), this._state.dateTo, this.#dateToChangeHandler, this._state.dateFrom);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventEditForm.parsePointToState(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EventEditForm.parseStateToPoint(this._state));
  };

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };

  #handleEventTypeChange = (evt) => {
    evt.preventDefault();
    this.updateElement({type: evt.target.dataset.eventType});
  };

  #handleDestinationChange = (evt) => {
    evt.preventDefault();
    const selectedDestination = this.#places.find((place) => place.name === evt.target.value);

    if (!selectedDestination) {
      return;
    }

    this.updateElement({destination: selectedDestination.id});
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #handlePriceChange = (evt) => {
    evt.preventDefault();
    this.updateElement({basePrice: Number(evt.target.value)});
  };

  #handleOfferChange = (evt) => {
    evt.preventDefault();
    const offerId = evt.target.dataset.offerId;
    const isChecked = evt.target.checked;
    this.updateElement({
      offers: isChecked
        ? [...this._state.offers, offerId]
        : [...this._state.offers.filter((id) => id !== offerId)]
    });
  };

  #setDatepicker(element, date, cb, minDate = false) {
    this.#datepicker = flatpickr(element,
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: date,
        onChange: cb,
        minDate: minDate,
      },
    );
  }

  static parsePointToState(point) {
    return {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
