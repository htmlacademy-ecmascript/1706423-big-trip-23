import Sort from '../view/sort';
import EventsList from '../view/events-list';
import NoPoints from '../view/no-points';
import {render, RenderPosition} from '../framework/render';
import EventPresenter from './event-presenter';
import {sortPointTime, sortPointPrice} from '../utils/event';
import {SortType} from '../const';

export default class GeneralPresenter {
  #mainContainer = null;
  #pointsModel = null;

  #eventsList = new EventsList();
  #sortComponent = null;

  #offers = [];
  #destinations = [];
  #filters = [];
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({mainContainer, pointsModel}) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortPointTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointPrice);
    }

    return this.#pointsModel.points;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  init() {
    this.#offers = this.offers;
    this.#destinations = this.destinations;
    this.#filters = [...this.#pointsModel.filters];

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#eventPresenters.get(updatedPoint.id).init({
      point: updatedPoint,
      offers: this.#offers,
      destinations: this.#destinations
    });
  };

  #handleSortTypeChange = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEventsList();
    this.#renderEventsList();
  };

  #renderSort() {
    this.#sortComponent = new Sort({
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventsList.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init({point, offers: this.#offers, destinations: this.#destinations});
    this.#eventPresenters.set(point.id, eventPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints() {
    render(new NoPoints({filter: this.#filters[0]}), this.#mainContainer, RenderPosition.AFTERBEGIN);
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderEventsList() {
    render(this.#eventsList, this.#mainContainer);
    this.#renderPoints(this.points);
  }

  #renderBoard() {
    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderEventsList();
  }
}
