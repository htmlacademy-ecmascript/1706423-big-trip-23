import Observable from '../framework/observable';
import {getRandomPoint} from '../mock/points';
import {offers} from '../mock/offers';
import {destinations} from '../mock/destinations';

const POINT_COUNT = 3;

export default class PointsModel extends Observable {
  #dataApiService = null;
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #offers = offers;
  #destinations = destinations;

  constructor({dataApiService}) {
    super();
    this.#dataApiService = dataApiService;

    this.#dataApiService.points.then((points) => {
      console.log(points);
    });
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

  updatePoint(updateType, updatePoint) {
    const index = this.#points.findIndex((point) => point.id === updatePoint.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      updatePoint,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, updatePoint);
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
}
