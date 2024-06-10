import Sort from '../view/sort';
import EventsList from '../view/events-list';
import NoPoints from '../view/no-points';
import {render, RenderPosition, remove} from '../framework/render';
import EventPresenter from './event-presenter';
import {sortPointTime, sortPointPrice} from '../utils/event';
import {SortType, UpdateType, UserAction} from '../const';

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

    this.#pointsModel.addObserver(this.#handleModelEvent);
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

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init({
          point: data,
          offers: this.#offers,
          destinations: this.#destinations
        });
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard({resetSortType: true});
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new Sort({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventsList.element,
      onDataChange: this.#handleViewAction,
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

  #clearBoard({resetSortType = false} = {}) {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    render(this.#eventsList, this.#mainContainer);
    this.#renderPoints(this.points);
  }
}
