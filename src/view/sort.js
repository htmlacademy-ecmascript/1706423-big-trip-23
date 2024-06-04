import {SORT_ITEMS} from '../const';
import AbstractView from '../framework/view/abstract-view';

const createSortItem = (item) => {
  const {id, name, isClickable} = item;
  const defaultCheckedSortId = SORT_ITEMS[0].id;
  return (`
    <div class="trip-sort__item  trip-sort__item--${id}">
      <input
        id="sort-${id}"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${id}"
        ${id === defaultCheckedSortId && 'checked'}
        ${!isClickable && 'disabled'}
      />
      <label class="trip-sort__btn" for="sort-${id}">${name}</label>
    </div>`
  );
};

const createSortTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORT_ITEMS.map((item) => createSortItem(item)).join('')}
  </form>`;

export default class Sort extends AbstractView {
  get template() {
    return createSortTemplate();
  }
}
