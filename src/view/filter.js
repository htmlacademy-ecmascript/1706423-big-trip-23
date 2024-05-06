import {FILTER_ITEMS} from '../const';
import {createElement} from '../render';

const createFilterItem = (item) => {
  const defaultCheckedFilter = FILTER_ITEMS[0];
  return (`
    <div class="trip-filters__filter">
      <input
        id="filter-${item}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${item}"
        ${item === defaultCheckedFilter && 'checked'}
      />
      <label class="trip-filters__filter-label" for="filter-${item}">${item}</label>
    </div>`
  );
};

const createFilterTemplate = () => `
  <form class="trip-filters" action="#" method="get">
    ${FILTER_ITEMS.map((item) => createFilterItem(item)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class Filter {
  getTemplate() {
    return createFilterTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
