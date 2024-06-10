export default class DestinationModel {
  #destinations = null;
  #service = null;

  constructor(service){
    this.#service = service;
  }

  async init() {
    try {
      this.#destinations = await this.#service.getDestinations();
      return this.#destinations;
    }
    catch {
      throw new Error('The list of destinations could not be loaded');
    }
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
