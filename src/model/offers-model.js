export default class OfferModel {
  constructor(service){
    this.offers = service.getOffers();
  }

  get() {
    return this.offers;
  }

  getByType(type) {
    return this.offers.find((offers) => offers.type === type).offers;
  }
}
