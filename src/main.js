import GeneralPresenter from './presenter/general-presenter';
import Filter from './view/filter';
import PointsModel from './model/points-model';
import {render} from './render';

const filterContainer = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const generalPresenter = new GeneralPresenter({mainContainer, pointsModel});

render(new Filter(), filterContainer);

generalPresenter.init();

