import Observable from '../framework/observable';
import {UpdateType} from '../const';

export default class PointsModel extends Observable {
  #dataApiService = null;
  #points = [];
  #offers = [];
  #destinations = [];

  constructor({dataApiService}) {
    super();
    this.#dataApiService = dataApiService;
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      const points = await this.#dataApiService.points;
      this.#points = points.map(this.#adaptPointToClient);
      this.#offers = await this.#dataApiService.offers;
      this.#destinations = await this.#dataApiService.destinations;
    } catch(err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#dataApiService.updatePoint(update);
      const updatedPoint = this.#adaptPointToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  addPoint(updateType, updatePoint) {
    this.#points = [
      updatePoint,
      ...this.#points,
    ];

    this._notify(updateType, updatePoint);
  }

  deletePoint(updateType, updatePoint) {
    const index = this.#points.findIndex((point) => point.id === updatePoint.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptPointToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
