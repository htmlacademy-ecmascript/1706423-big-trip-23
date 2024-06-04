import {getRandomPoint} from '../mock/points';
import {offers} from '../mock/offers';
import {destinations} from '../mock/destinations';
import {generateFilter} from '../mock/filter';

const POINT_COUNT = 3;

export default class PointsModel {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #offers = offers;
  #destinations = destinations;
  #filters = generateFilter(this.#points);

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get filters() {
    return this.#filters;
  }
}
