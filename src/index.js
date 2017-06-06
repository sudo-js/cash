import CoreTravCcaEv from './events';

class Cash extends CoreTravCcaEv {
  constructor() {
    super();
    this.cache = { events: {} };
    this._cid_ = 0;
  }
  
  noop() {}
}

export const cash = new Cash;