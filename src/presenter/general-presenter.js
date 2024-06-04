import Sort from '../view/sort';
import EventsList from '../view/events-list';
import EventEditForm from '../view/event-edit-form';
import TripEvent from '../view/trip-event';
import {render, replace} from '../framework/render';

export default class GeneralPresenter {
  #mainContainer = null;
  #pointsModel = null;

  #eventsList = new EventsList();

  #points = [];
  #offers = [];
  #destinations = [];

  constructor({mainContainer, pointsModel}) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];
    render(new Sort(), this.#mainContainer);
    render(this.#eventsList, this.#mainContainer);

    for (const point of this.#points) {
      this.#renderPoint(point);
    }
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const tripEventComponent = new TripEvent({
      point,
      options: this.#offers,
      places: this.#destinations,
      onRollupButtonClick: () => {
        replacePointToForm();
      }
    });

    const eventEditFormComponent = new EventEditForm({
      point,
      options: this.#offers,
      places: this.#destinations,
      onFormSubmit: () => {
        replaceFormToPoint();
      },
      onRollupButtonClick: () => {
        replaceFormToPoint();
      }
    });

    function replacePointToForm() {
      replace(eventEditFormComponent, tripEventComponent);
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function replaceFormToPoint() {
      replace(tripEventComponent, eventEditFormComponent);
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(tripEventComponent, this.#eventsList.element);
  }
}
