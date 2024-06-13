import {SORT_ITEMS} from '../const';
import AbstractView from '../framework/view/abstract-view';

const createSortItem = (item, currentSortType) => {
  const {id, name, isClickable} = item;

  return (`
    <div class="trip-sort__item  trip-sort__item--${id}">
      <input
        data-sort-type="${id}"
        id="sort-${id}"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${id}"
        ${id === currentSortType ? 'checked' : ''}
        ${!isClickable ? 'disabled' : ''}
      />
      <label class="trip-sort__btn" for="sort-${id}">${name}</label>
    </div>`
  );
};

const createSortTemplate = (currentSortType) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORT_ITEMS.map((item) => createSortItem(item, currentSortType)).join('')}
  </form>`;

export default class Sort extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
