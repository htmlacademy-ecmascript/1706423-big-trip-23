import Sort from '../view/sort';
import EventsList from '../view/events-list';
import EventEditForm from '../view/event-edit-form';
import TripEvent from '../view/trip-event';
import {render} from '../render';
import {getDefaultPoint} from '../utils';

export default class GeneralPresenter {
  eventsList = new EventsList();

  constructor({mainContainer, pointsModel}) {
    this.mainContainer = mainContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.offers = [...this.pointsModel.getOffers()];
    this.destinations = [...this.pointsModel.getDestinations()];
    render(new Sort(), this.mainContainer);
    render(this.eventsList, this.mainContainer);
    render(new EventEditForm({point: getDefaultPoint(), options: this.offers, places: this.destinations}), this.eventsList.getElement());
    render(new EventEditForm({point: this.points[0], options: this.offers, places: this.destinations}), this.eventsList.getElement());

    for (const point of this.points) {
      render(new TripEvent({point, options: this.offers, places: this.destinations}), this.eventsList.getElement());
    }
  }
}
