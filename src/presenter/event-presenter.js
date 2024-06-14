import EventEditForm from '../view/event-edit-form';
import TripEvent from '../view/trip-event';
import {render, replace, remove} from '../framework/render';
import {Mode, UpdateType, UserAction} from '../const';
import {isDatesEqual} from '../utils/event';

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
      onRollupButtonClick: this.#handleEditFormOpen,
    });

    this.#eventEditFormComponent = new EventEditForm({
      point: this.#point,
      options: this.#offers,
      places: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onRollupButtonClick: this.#handleEditFormClose,
      onDeleteClick: this.#handleDeleteClick,
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
      this.#mode = Mode.DEFAULT;
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
      this.#eventEditFormComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#eventEditFormComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#eventEditFormComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
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
      this.#eventEditFormComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #handleEditFormOpen = () => {
    this.#replacePointToForm();
  };

  #handleEditFormClose = () => {
    this.#eventEditFormComponent.reset(this.#point);
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !isDatesEqual(this.#point.dateFrom, update.dateFrom) || !isDatesEqual(this.#point.dateTo, update.dateTo);

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
