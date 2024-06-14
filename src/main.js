import GeneralPresenter from './presenter/general-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewEventButton from './view/new-event-button';
import DataApiService from './data-api-service';
import {RenderPosition, render} from './framework/render';

const AUTHORIZATION = `Basic ${Math.random().toString(36).substring(2)}`;
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const headerContainer = document.querySelector('.trip-main');
const filterContainer = headerContainer.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel({
  dataApiService: new DataApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();
const generalPresenter = new GeneralPresenter({
  mainContainer,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});
const filterPresenter = new FilterPresenter({filterContainer, filterModel, pointsModel});
const newEventButton = new NewEventButton({
  onClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  newEventButton.element.disabled = false;
}

function handleNewPointButtonClick() {
  generalPresenter.createPoint();
  newEventButton.element.disabled = true;
}

filterPresenter.init();
generalPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newEventButton, headerContainer, RenderPosition.BEFOREEND);
  });

