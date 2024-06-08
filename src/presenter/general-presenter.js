import Sort from '../view/sort';
import EventsList from '../view/events-list';
import NoPoints from '../view/no-points';
import {render, RenderPosition} from '../framework/render';
import EventPresenter from './event-presenter';
import {updateItem} from '../utils/common';
import {sortPointTime, sortPointPrice} from '../utils/event';
import {SortType} from '../const';

export default class GeneralPresenter {
  #mainContainer = null;
  #pointsModel = null;

  #eventsList = new EventsList();
  #sortComponent = null;

  #points = [];
  #offers = [];
  #destinations = [];
  #filters = [];
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];

  constructor({mainContainer, pointsModel}) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#filters = [...this.#pointsModel.filters];
    this.#sourcedPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#eventPresenters.get(updatedPoint.id).init({
      point: updatedPoint,
      offers: this.#offers,
      destinations: this.#destinations
    });
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#points.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPointPrice);
        break;
      case SortType.EVENT:
      case SortType.OFFERS:
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }

    this.#sortPoints(sortType);
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

  #renderPoints() {
    this.#points.forEach((point) => this.#renderPoint(point));
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
    this.#renderPoints();
  }

  #renderBoard() {
    if (this.#points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderEventsList();
  }
}
