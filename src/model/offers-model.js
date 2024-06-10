export default class OfferModel {
  #offers = null;
  #service = null;

  constructor(service){
    this.#service = service;
  }

  async init() {
    try {
      this.#offers = await this.#service.getOffers();
      return this.#offers;
    }
    catch {
      throw new Error('The list of offers could not be loaded');
    }
  }

  get() {
    return this.#offers;
  }

  getByType(type) {
    return this.get().find((offer) => offer.type === type).offers;
  }
}
