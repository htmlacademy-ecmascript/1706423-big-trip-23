import EventEditForm from '../view/event-edit-form';
import TripEvent from '../view/trip-event';
import {render, replace} from '../framework/render';

export default class EventPresenter {
  #eventListContainer = null;

  #tripEventComponent = null;
  #eventEditFormComponent = null;

  #point = null;
  #offers = [];
  #destinations = [];

  constructor({eventListContainer}) {
    this.#eventListContainer = eventListContainer;
  }

  init({point, offers, destinations}) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#tripEventComponent = new TripEvent({
      point: this.#point,
      options: this.#offers,
      places: this.#destinations,
      onRollupButtonClick: () => {
        this.#replacePointToForm();
      }
    });

    this.#eventEditFormComponent = new EventEditForm({
      point: this.#point,
      options: this.#offers,
      places: this.#destinations,
      onFormSubmit: () => {
        this.#replaceFormToPoint();
      },
      onRollupButtonClick: () => {
        this.#replaceFormToPoint();
      }
    });

    render(this.#tripEventComponent, this.#eventListContainer);
  }

  #replacePointToForm() {
    replace(this.#eventEditFormComponent, this.#tripEventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    replace(this.#tripEventComponent, this.#eventEditFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };
}
