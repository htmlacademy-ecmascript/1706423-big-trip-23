import AbstractView from '../framework/view/abstract-view.js';

function createNoPointsTemplate(text) {
  return (
    `<p class="trip-events__msg">
      ${text}
    </p>`
  );
}

export default class NoPoints extends AbstractView {
  #text = null;

  constructor(text) {
    super();
    this.#text = text;
  }

  get template() {
    return createNoPointsTemplate(this.#text);
  }
}
