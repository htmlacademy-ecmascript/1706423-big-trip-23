import GeneralPresenter from './presenter/general-presenter';
import Filter from './view/filter';
import {render} from './render';

const filterContainer = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');
const generalPresenter = new GeneralPresenter(mainContainer);

render(new Filter(), filterContainer);

generalPresenter.init();

