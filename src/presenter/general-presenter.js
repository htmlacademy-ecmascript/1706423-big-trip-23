import {render, RenderPosition, remove} from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import Sort from '../view/sort';
import EventsList from '../view/events-list';
import NoPoints from '../view/no-points';
import EventPresenter from './event-presenter';
import NewEventPresenter from './new-event-presenter';
import Loader from '../view/loader';
import {sortBy} from '../utils/sort';
import {FilterType, SortType, UpdateType, UserAction, TimeLimit} from '../const';
import {filter} from '../utils/filter';

export default class GeneralPresenter {
  #mainContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #eventsList = new EventsList();
  #sortComponent = null;
  #noPointsComponent = null;
  #loaderComponent = new Loader();
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  #eventPresenters = new Map();
  #newEventPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor({mainContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newEventPresenter = new NewEventPresenter({
      eventListContainer: this.#eventsList.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);
    const sortedPoints = sortBy[this.#currentSortType](filteredPoints);

    return sortedPoints;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  init() {
    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init({offers: this.offers, destinations: this.destinations});
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#eventPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#eventPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init({
          point: data,
          offers: this.offers,
          destinations: this.destinations
        });
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loaderComponent);
        this.#renderBoard();
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
    eventPresenter.init({point, offers: this.offers, destinations: this.destinations});
    this.#eventPresenters.set(point.id, eventPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderLoading() {
    render(this.#loaderComponent, this.#mainContainer, RenderPosition.BEFOREEND);
  }

  #renderNoPoints() {
    this.#noPointsComponent = new NoPoints({filterType: this.#filterType});
    render(this.#noPointsComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderErrorMessage() {
    this.#noPointsComponent = new NoPoints({});
    render(this.#noPointsComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loaderComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#pointsModel.isError) {
      this.#renderErrorMessage();
      return;
    }

    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    render(this.#eventsList, this.#mainContainer);
    this.#renderPoints(this.points);
  }
}
