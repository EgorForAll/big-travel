import { FORM_DATE_FORMAT_ONE, CITIES, DESCS, PNG} from "../mock/const";
import { compareTwoDates,pickOffersDependOnType, pickDescDependOnName, EMPTY_POINT, pickPhotosDependOnName } from "../utils/point";
import Smart from "./smart";
import { checkPng, getRandomInteger } from "../utils/common";
import flatpickr from 'flatpickr';
import dayjs from "dayjs";

const createEditEventTypeTemplate = (currentTypeImage) => {
  return    `<label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src=${currentTypeImage} alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Taxi">
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Ship">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Transport">
                  <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Flight">
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
            `;
}

const createDestinationOptionsTemplate = () => {
  return  `<option value="Chamonix"></option>
    <option value="Geneva"></option>
    <option value=""></option>
    <option value="Amseradam"></option>
    <option value="Helsinki"></option>
    <option value="Oslo"></option>
    <option value="Kopenhagen"></option>
    <option value="Den Haag"></option>
    <option value="Roterrdam"></option>
    <option value="Saint-Petersburg"></option>
    <option value="Moscow"></option>
    <option value="Sochi"></option>
    <option value="Tokio"></option>
    <option value="Kioto"></option>
    <option value="Nagasaki"></option>
    <option value="Hiroshima"></option>
    <option value="Berlin"></option>
    <option value="Munich"></option>
    <option value="Frankfurt"></option>
    <option value="Vien"></option>
    <option value="Rome"></option>
    <option value="Naples"></option>
    <option value="Venice"></option>
    <option value="Milan"></option>
    <option value="Paris"></option>
    <option value="Barcelona"></option>
    <option value="Madrid"></option>
    <option value="Valencia"></option>`
}

const createEventDestinationTemplate = (type, city, destinations) => {
  return `
          <label class="event__label  event__type-output" for="event-destination-1">${type}</label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${city} list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationOptionsTemplate(CITIES, destinations)}
          </datalist>`;
}

const createEventDateTemplate = (dateFrom, dateTo) => {
  return `<label class="visually-hidden"          for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${dayjs(dateFrom).format(FORM_DATE_FORMAT_ONE)}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${dayjs(dateTo).format(FORM_DATE_FORMAT_ONE)}>`;
}

const createEventPriceTemplate = (price) => {
  return `<label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value=${price}>`;
}

const createOfferSelectorTemplate = (item) => { 
  return `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" >
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${item.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${item.price}</span>
          </label>
        </div>
  `;
}

const createEventDescriptionTemplate = (destination) => {
  return destination.description.length > 0 || destination.pictures.length > 0 ? 
  ` <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
        <div class="event__photos-container">
        <div class="event__photos-tape">
        ${destination.pictures.map((item) => {
          return `<img class="event__photo" src=${item.src} alt=${item.description}/>`;
        }).join('')}
        </div>
      </div>
    </section> 
` : ' ';
}

const createOffersEditTemplate = (offers) => {
  return offers.length > 0 ?
    `  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">                   
      ${offers.map((element) => createOfferSelectorTemplate(element)).join('')}
    </div>
  </section>` : '';
}

const createEditPointTemplate = (point, destinations) => {
  const image = checkPng(point.type, PNG);
  const eventTypeImageField = createEditEventTypeTemplate(image);
  const eventDestinationField = createEventDestinationTemplate(point.type, point.destination.name, destinations);
  const eventDateField = createEventDateTemplate(point.date_from, point.date_to)
  const eventPriceField = createEventPriceTemplate(point.price);
  const eventDescriptionsField = createEventDescriptionTemplate(point.destination);
  const offerSelectorsField = createOffersEditTemplate(point.offer);

  return      `<form class="event event--edit" action="#" method="post" id="form">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    ${eventTypeImageField}            
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    ${eventDestinationField}
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    ${eventDateField}
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    ${eventPriceField}
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${offerSelectorsField}
                  ${eventDescriptionsField}
                </section>
              </form>`;
}

export default class PointEditForm extends Smart {
   constructor(pointData = EMPTY_POINT, offersModel, destinationsModel) {
    super();
    this._pickerStartDate = null;
    this._pickerEndDate = null;
    this._pointState = PointEditForm.parsePointDataToState(pointData);
    this._offersModel = offersModel;
    this._destinationModel = destinationsModel;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formClickHandler = this._formClickHandler.bind(this);
    this._onPointTypeChange = this._onPointTypeChange.bind(this);
    this._onPointInput = this._onPointInput.bind(this);
    this._onPointPriceInput = this._onPointPriceInput.bind(this);
    this._onDateFromChange = this._onDateFromChange.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._onDateToChange = this._onDateToChange.bind(this);

    this._setDatePicker(this._pickerStartDate);
    this._setDatePicker(this._pickerEndDate);
    this._setInnerListeners();
  
  }

  static parsePointDataToState(pointData) {
    return Object.assign(
      {},
      pointData
    )
  }

  static parseStateToPointData(state) {
    return Object.assign(
      {},
      state
    )
  }

  getTemplate() {
    return createEditPointTemplate(this._pointState, this._destinationModel);
  }

  removeElement() {
    super.removeElement();

    if (this._pickerStartDate || this._pickerEndDate) {
      this._pickerStartDate.destroy();
      this._pickerStartDate = null;
      this._pickerEndDate.destroy();
      this._pickerEndDate = null;
    }

  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEditForm.parseStateToPointData(this._pointState));
  }

  _formClickHandler() {
    this._callback.clickHide();
  }

  _onPointTypeChange(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.updateData({
      type: evt.target.value.toLowerCase(),
      offer: pickOffersDependOnType(evt.target.value.toLowerCase(), this._offersModel.getOffers())
    })
  }

  _onPointInput(evt) {
    evt.preventDefault()
    this.updateData({
      destination: Object.assign(
        {},
        this._pointState.destination,
        {
          name: evt.target.value,
          description:  pickDescDependOnName(evt.target.value, this._destinationModel.getDestinations()),
          pictures: pickPhotosDependOnName(evt.target.value, this._destinationModel.getDestinations())
        }
      )
    })
  }

  _onPointPriceInput(evt) {
    evt.preventDefault()

    if (evt.target.value < 0) {
      return
    }

    if (evt.target.value === '') {
      evt.target.value = 0;
    }

    this.updateData({
      price: Number(evt.target.value)
    })
  }

  _setInnerListeners() {
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._onPointInput);
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._onPointTypeChange);
    this.getElement().querySelector('#event-price-1').addEventListener('change', this._onPointPriceInput);
    this.getElement().querySelector('#event-start-time-1').addEventListener('change', this._onDateFromChange);
    this.getElement().querySelector('#event-end-time-1').addEventListener('change', this._onDateToChange);
  }

  _setDatePicker(datePicker) {
    if (datePicker) {
      datePicker.destroy();
      datePicker = null;
    }

    datePicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._pointState.date_from,
        onChange: this._onDateFromChange,
        enableTime: true,
        time_24hr: true
      },
    );

    datePicker = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._pointState.date_to,
        onChange: this._onDateToChange,
        enableTime: true,
        time_24hr: true
      },
    );
    }

  _onDateFromChange(userInput) {
    if(compareTwoDates(this._pointState.date_to, userInput) > 0) {
      this.updateData({
        date_from: new Date(userInput),
        });
    }  
  }
  

  _onDateToChange(userInput) {
    if(compareTwoDates(userInput, this._pointState.date_from) > 0) {
      this.updateData({
        date_to: userInput[userInput.length - 1],
    });
    }
  }

  restoreListenners() {
    this._setInnerListeners();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.hideEditFormClickHandler(this._callback.clickHide);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this._setDatePicker(this._pickerStartDate);
    this._setDatePicker(this._pickerEndDate);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointEditForm.parseStateToPointData(this._pointState));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  reset(pointData) {
    this.updateData(
      PointEditForm.parseStateToPointData(pointData),
    );
  }

  resetInput(pointData) {
    this.updateData(PointEditForm.parsePointDataToState(pointData))
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener('submit', this._formSubmitHandler);
  }

  hideEditFormClickHandler(callback) {
    this._callback.clickHide = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formClickHandler);
  }
}
