export default class OfferModel {
  #offers = null;
  #service = null;

  constructor(service){
    this.#service = service;
  }

  async init() {
    this.#offers = await this.#service.getOffers();
    return this.#offers;
  }

  get() {
    return this.#offers;
  }

  getByType(type) {
    return this.get().find((offer) => offer.type === type).offers;
  }
}
