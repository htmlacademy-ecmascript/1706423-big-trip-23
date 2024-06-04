import AbstractView from '../framework/view/abstract-view';

const createFilterItem = (filter, isChecked) => {
  const {type, count} = filter;

  return (`
    <div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${isChecked ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}
      />
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
};

const createFilterTemplate = (filterItems) => `
  <form class="trip-filters" action="#" method="get">
    ${filterItems.map((item, index) => createFilterItem(item, index === 0)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class Filter extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
