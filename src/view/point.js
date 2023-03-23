import { createOfferTemplate } from "./offer";
import { EMPTY_POINT } from "../mock/point";
import Abstract from "./abstract";

const createPointTemplate = (point = EMPTY_POINT, offer) => {

  return    `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime=${point.date_from.format('YYYY-MM-DD')}>${point.date_from.format("MMM D")}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src=${point.image} alt="Event type icon">
                </div>
                <h3 class="event__title">${point.type} ${point.destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime=${point.date_from.format('YYYY-MM-DDTHH:mm')}>${point.date_from.format('HH:mm')}</time>
                    &mdash;
                    <time class="event__end-time" datetime=${point.date_to.format('YYYY-MM-DDTHH:mm')}>${point.date_to.format('HH:mm')}</time>
                  </p>
                  <p class="event__duration">${point.differenceTime}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${point.price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offer.options.map((item) => createOfferTemplate(item)).join('')}
                </ul>
                <button class="event__favorite-btn ${point.is_favorite ? 'event__favorite-btn--active' : null}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export default class PointView extends Abstract {
 constructor(point = EMPTY_POINT, offer) {
  super()
  this._point = point;
  this._offer = offer;
 }
 
 getTemplate() {
  return createPointTemplate(this._point, this._offer)
 }

}