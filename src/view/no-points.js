import AbstractView from '../framework/view/abstract-view.js';
import {MessageEmptyList} from '../const.js';

function createNoPointsTemplate(filter) {
  const {type} = filter;

  return (
    `<p class="trip-events__msg">
      ${MessageEmptyList[type]}
    </p>`
  );
}

export default class NoPoints extends AbstractView {
  #filter = null;

  constructor({filter}) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createNoPointsTemplate(this.#filter);
  }
}
