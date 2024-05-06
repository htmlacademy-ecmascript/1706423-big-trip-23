import Sort from '../view/sort';
import EventsList from '../view/events-list';
import EventEditForm from '../view/event-edit-form';
import TripEvent from '../view/trip-event';
import {render} from '../render';

export default class GeneralPresenter {
  eventsList = new EventsList();

  constructor(container) {
    this.container = container;
  }

  init() {
    render(new Sort(), this.container);
    render(this.eventsList, this.container);
    render(new EventEditForm(), this.eventsList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TripEvent(), this.eventsList.getElement());
    }
  }
}
