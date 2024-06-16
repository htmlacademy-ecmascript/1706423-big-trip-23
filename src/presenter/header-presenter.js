import TripInfo from '../view/trip-info';
import {render, replace, remove, RenderPosition} from '../framework/render';

export default class HeaderPresenter {
  #headerContainer = null;
  #pointsModel = null;

  #tripInfoComponent = null;

  #points = [];
  #offers = [];
  #destinations = [];

  constructor({headerContainer, pointsModel}) {
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#points = this.#pointsModel.points;
    this.#offers = this.#pointsModel.offers;
    this.#destinations = this.#pointsModel.destinations;

    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfo({
      uniqueDestinationNames: this.#getDestinationNames(),
      points: this.#points,
      totalCost: this.#getTotalCost(),
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  destroy() {
    remove(this.#tripInfoComponent);
  }

  #getDestinationNames() {
    const destinationNames = [];

    this.#points.forEach((point) => {
      this.#destinations.forEach((destination) => {
        if (destination.id === point.destination) {
          destinationNames.push(destination.name);
        }
      });
    });

    return destinationNames;
  }

  #getTotalCost() {
    let totalCost = 0;

    this.#points.forEach((point) => {
      totalCost += point.basePrice;
      this.#offers.forEach((offer) => {
        if (offer.type === point.type) {
          offer.offers.forEach((offerItem) => {
            if (point.offers.includes(offerItem.id)) {
              totalCost += offerItem.price;
            }
          });
        }
      });
    });

    return totalCost;
  }

  #handleModelEvent = () => {
    if (this.#points.length > 0) {
      this.init();
    }
  };
}
