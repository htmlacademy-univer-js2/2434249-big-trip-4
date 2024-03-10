import {render} from '../render';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import NewPointView from '../view/new-point-view';
import PointListView from '../view/event-point-view';
import EventListView from '../view/event-list-view';

const POINT_COUNT = 3;

export default class BoardPresenter {
  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  eventList = new EventListView();

  init(){
    const tripControlFiltersElement = this.boardContainer.querySelector('.trip-controls__filters');
    const tripEventsElement = this.boardContainer.querySelector('.trip-events');

    render(new FilterView(), tripControlFiltersElement);
    render(new SortView(), tripEventsElement);
    render(this.eventList, tripEventsElement);
    render(new NewPointView(), this.eventList.getElement());

    for (let i = 0; i < POINT_COUNT; i++) {
      render(new PointListView(), this.eventList.getElement());
    }
  }
}
