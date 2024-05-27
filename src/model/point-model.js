import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
import {updateItem, adaptToClient, adaptToServer} from '../utils.js';

export default class PointModel extends Observable {
  #points = [];
  #destinationsModel = [];
  #offersModel = [];
  #service = null;

  constructor({service, destinationsModel, offersModel}) {
    super();
    this.#service = service;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  async init() {
    try {
      await Promise.all([
        this.#destinationsModel.init(),
        this.#offersModel.init()
      ]);

      const points = await this.#service.getPoints();
      this.#points = points.map(adaptToClient);
      this._notify(UpdateType.INIT, {isError: false});
    }
    catch {
      this.#points = null;
      this._notify(UpdateType.INIT, {isError: true});
    }
  }

  get points() {
    return this.#points;
  }

  getById(id) {
    return this.#points.find((points) => points.id === id);
  }

  async update(updateType, point) {
    try {
      const updatedPoint = await this.#service.updatePoint(adaptToServer(point));
      const adaptedPoint = adaptToClient(updatedPoint);
      this.#points = updateItem(this.#points, adaptedPoint);
      this._notify(updateType, adaptedPoint);
    }
    catch {
      throw new Error('Cant`t upadte point');
    }
  }

  async add(updateType, point) {
    try {
      const addedPoint = await this.#service.addPoint(adaptToServer(point));
      const adaptedPoint = adaptToClient(addedPoint);
      this.points.push(adaptedPoint);
      this._notify(updateType, adaptedPoint);
    }
    catch {
      throw new Error('Cant`t add point');
    }
  }

  async delete(updateType, point) {
    try {
      await this.#service.deletePoint(point);
      this.#points = this.#points.filter((pointItem) => pointItem.id !== point.id);
      this._notify(updateType);
    }
    catch {
      throw new Error('Cant`t delete point');
    }
  }
}
