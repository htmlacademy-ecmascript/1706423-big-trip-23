import AbstractView from '../framework/view/abstract-view.js';
import {MessageEmptyList, ERROR_MESSAGE} from '../const.js';

function createNoPointsTemplate(filterType) {

  return (
    `<p class="trip-events__msg">
      ${filterType ? MessageEmptyList[filterType] : ERROR_MESSAGE}
    </p>`
  );
}

export default class NoPoints extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointsTemplate(this.#filterType);
  }
}
