import {render} from './render';
import Filter from './view/filter';
import Sort from './view/sort';
import EventsList from './view/events-list';
import EventEditForm from './view/event-edit-form';
import TripEvent from './view/trip-event';

const filterContainer = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');

render(new Filter(), filterContainer);
render(new Sort(), mainContainer);
render(new EventsList(), mainContainer);

const eventsContainer = document.querySelector('.trip-events__list');

render(new EventEditForm(), eventsContainer);

for (let i = 0; i < 3; i++) {
  render(new TripEvent(), eventsContainer);
}
