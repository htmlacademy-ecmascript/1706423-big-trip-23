import GeneralPresenter from './presenter/general-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const filterContainer = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const generalPresenter = new GeneralPresenter({mainContainer, pointsModel, filterModel});
const filterPresenter = new FilterPresenter({filterContainer, filterModel, pointsModel});

filterPresenter.init();
generalPresenter.init();

