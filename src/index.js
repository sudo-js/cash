// core, traversal, cca, events, is-not, style, size
import Composite from './size';

class Cash extends Composite {
  constructor() {
    super();
    this.cache = { events: {} };
    this._cid_ = 0;
  }
}

export const cash = new Cash;