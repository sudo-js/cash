import { get, _getCid_, getUid, init, _setCache_ } from './core';
import { _all_, assign, call, collect } from './all';
import { createElement, remove } from './manipulation';
import { closest, contains, find, parent, parents } from './traversal';

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
  collect,
  createElement,
  remove,
  closest,
  contains,
  find,
  parent,
  parents
});