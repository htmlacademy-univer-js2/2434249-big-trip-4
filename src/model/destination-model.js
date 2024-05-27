export default class DestinationModel {
  #destinations = null;
  #service = null;

  constructor(service){
    this.#service = service;
  }

  async init() {
    this.#destinations = await this.#service.getDestinations();
    return this.#destinations;
  }

  get() {
    return this.#destinations;
  }

  getById(id) {
    return this.get().find((destination) => destination.id === id);
  }

  getByName(name) {
    return this.get().find((destination) => destination.name === name);
  }
}
