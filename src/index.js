import { get, _getCid_, getUid, init, _setCache_ } from './core';
import { _all_, assign, call, collect } from './all';

export default ({
  cache: { events: {}, display: {} },
  _cid_: 0,
  noop: function() {},
  get,
  _getCid_,
  getUid,
  init,
  _setCache_,
  _all_,
  assign,
  call,
  collect
});