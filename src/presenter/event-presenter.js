import EventEditForm from '../view/event-edit-form';
import TripEvent from '../view/trip-event';
import {render, replace, remove} from '../framework/render';

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

    const prevTripEventComponent = this.#tripEventComponent;
    const prevEventEditFormComponent = this.#eventEditFormComponent;

    this.#tripEventComponent = new TripEvent({
      point: this.#point,
      options: this.#offers,
      places: this.#destinations,
      onRollupButtonClick: this.#handleRollupButtonClick,
    });

    this.#eventEditFormComponent = new EventEditForm({
      point: this.#point,
      options: this.#offers,
      places: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onRollupButtonClick: this.#handleRollupButtonClick,
    });

    if (prevTripEventComponent === null || prevEventEditFormComponent === null) {
      render(this.#tripEventComponent, this.#eventListContainer);
      return;
    }

    if (this.#eventListContainer.contains(prevTripEventComponent.element)) {
      replace(this.#tripEventComponent, prevTripEventComponent);
    }

    if (this.#eventListContainer.contains(prevEventEditFormComponent.element)) {
      replace(this.#tripEventComponent, prevEventEditFormComponent);
    }

    remove(prevTripEventComponent);
    remove(prevEventEditFormComponent);
  }

  destroy() {
    remove(this.#tripEventComponent);
    remove(this.#eventEditFormComponent);
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

  #handleRollupButtonClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };
}
