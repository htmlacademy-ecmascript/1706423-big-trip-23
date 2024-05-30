import {getRandomPoint} from '../mock/points';
import {offers} from '../mock/offers';
import {destinations} from '../mock/destinations';

const POINT_COUNT = 3;

export default class PointsModel {
  constructor() {
    this.points = Array.from({length: POINT_COUNT}, getRandomPoint);
    this.offers = offers;
    this.destinations = destinations;
  }

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
