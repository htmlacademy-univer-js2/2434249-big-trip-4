export default class PointModel {
  #points = null;

  constructor(service) {
    this.#points = service.getPoints();
  }

  get() {
    return this.#points;
  }

  getById(id) {
    return this.#points.find((points) => points.id === id);
  }
}
