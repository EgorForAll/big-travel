import PointsModel from "./model/point";
import { DATA_TYPE } from "./mock/const";
import ErrorView from "./view/error";
import PointEditForm from "./view/edit-point";

const Method = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
  };
  
  const SuccessHTTPStatusRange = {
    MIN: 200,
    MAX: 299,
  };
  
  export default class Api {
    constructor(endPoint, authorization) {
      this._endPoint = endPoint;
      this._authorization = authorization;
      this._errorComponent = new ErrorView();
      this._pointEditForm = new PointEditForm();
    }
  
    getData(dataType) {
      if (dataType === DATA_TYPE.POINT) {
        return this._load({url: dataType})
          .then(Api.toJSON)
          .then((points) => points.map(PointsModel.adaptToClient));
      }

      return this._load({url: dataType}).then((response) => response.json());
    }
  
    createPoint(point) {
      return this._load({
        url: `${DATA_TYPE.POINT}`,
        method: Method.POST,
        body: JSON.stringify(PointsModel.adaptToServer(point)),
        headers: new Headers({'Content-Type': 'application/json'}),
      })
        .then(Api.toJSON)
        .then(PointsModel.adaptToClient(point))
    }

    updatePoint(point) {
      return this._load({
        url: `${DATA_TYPE.POINT}/${point.id}`,
        method: Method.PUT,
        body: JSON.stringify(PointsModel.adaptToServer(point)),
        headers: new Headers({'Content-Type': 'application/json'}),
      })
        .then(Api.toJSON)
        .then(PointsModel.adaptToClient(point))
    }

    deletePoint(point) {
      return this._load({
        url: `${DATA_TYPE.POINT}/${point.id}`,
        method: Method.DELETE,
      })
    }
  
    _load({
      url,
      method = Method.GET,
      body = null,
      headers = new Headers(),
    }) {
      headers.append('Authorization', this._authorization);
  
      return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers},
      )
        .then(Api.checkStatus)
        .catch(Api.catchError);
    }
  
    static checkStatus(response) {
      if (
        response.status < SuccessHTTPStatusRange.MIN ||
        response.status > SuccessHTTPStatusRange.MAX
      ) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
  
      return response;
    }
  
    static toJSON(response) {
      return response.json();
    }
  
    static catchError(err) {
      // render(siteTripBoardElement, this._errorComponent, RenderPosition.AFTERBEGIN)
      throw err;
    }
  }