import EventEditForm from '../view/event-edit-form';
import TripEvent from '../view/trip-event';
import {render, replace, remove} from '../framework/render';
import {Mode} from '../const';

export default class EventPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #tripEventComponent = null;
  #eventEditFormComponent = null;

  #point = null;
  #offers = [];
  #destinations = [];
  #mode = Mode.DEFAULT;

  constructor({eventListContainer, onDataChange, onModeChange}) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
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
      onFavoriteClick: this.#handleFavoriteClick,
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

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripEventComponent, prevTripEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripEventComponent, prevEventEditFormComponent);
    }

    remove(prevTripEventComponent);
    remove(prevEventEditFormComponent);
  }

  destroy() {
    remove(this.#tripEventComponent);
    remove(this.#eventEditFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    replace(this.#eventEditFormComponent, this.#tripEventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#tripEventComponent, this.#eventEditFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToPoint();
  };
}
