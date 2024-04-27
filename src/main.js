import {render} from './render';
import Filter from './view/filter';
import Sort from './view/sort';
import EventsList from './view/events-list';

const filterContainer = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');

render(new Filter(), filterContainer);
render(new Sort(), mainContainer);
render(new EventsList(), mainContainer);
