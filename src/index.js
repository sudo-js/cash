// core, traversal, cca, events, is-not
import Composite from './is-not';

class Cash extends Composite {
  constructor() {
    super();
    this.cache = { events: {} };
    this._cid_ = 0;
  }
  
  noop() {}
}

export const cash = new Cash;