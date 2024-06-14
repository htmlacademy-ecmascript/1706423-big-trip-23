import EventEditForm from '../view/event-edit-form';
import {render, remove, RenderPosition} from '../framework/render';
import {UpdateType, UserAction} from '../const';
import {nanoid} from 'nanoid';

export default class NewEventPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #eventEditFormComponent = null;

  #offers = [];
  #destinations = [];

  constructor({eventListContainer, onDataChange, onDestroy}) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init({offers, destinations}) {
    this.#offers = offers;
    this.#destinations = destinations;

    if (this.#eventEditFormComponent !== null) {
      return;
    }

    this.#eventEditFormComponent = new EventEditForm({
      options: this.#offers,
      places: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    render(this.#eventEditFormComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventEditFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#eventEditFormComponent);
    this.#eventEditFormComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point}
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}