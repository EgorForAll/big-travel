export const createOfferTemplate = (element) => {
  return `<li class="event__offer">
                    <span class="event__offer-title">${element.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${element.price}</span>
                  </li>`
}