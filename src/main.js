import {render} from './render';
import Filter from './view/filter';
import Sort from './view/sort';

const filterContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');

render(new Filter(), filterContainer);
render(new Sort(), sortContainer);
