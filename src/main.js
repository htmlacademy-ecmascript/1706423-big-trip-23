import GeneralPresenter from './presenter/general-presenter';
import Filter from './view/filter';
import PointsModel from './model/points-model';
import {render} from './framework/render';
import {FILTER_ITEMS, FilterType} from './const';

const filterContainer = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const generalPresenter = new GeneralPresenter({mainContainer, pointsModel});

render(new Filter({
  filters: FILTER_ITEMS,
  currentFilterType: FilterType.EVERYTHING,
  onFilterTypeChange: () => {}
}), filterContainer);

generalPresenter.init();

