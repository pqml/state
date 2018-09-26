'use strict'

import Signal from './Signal'

/**
 * StoreSignal created by [createStore](#createStore).
 * Inherits from [Signal](#Signal) - See its API for `listen` / `unlisten` methods
 *
 * :warning: `dispatch()` method from Signal is removed and replaced by a `set()` method
 * @param {*} initialValue Initial value
 * @augments Signal
 * @return {StoreSignal} StoreSignal instance
 */
function StoreSignal (value) { this.current = value }
StoreSignal.prototype = Object.create(Signal.prototype)
StoreSignal.prototype.constructor = StoreSignal
// StoreSignal.prototype.dispatch = undefined

/**
 * Change the stored value. Dispatch to all listeners the new value
 * @method
 * @param {*} newValue New value to store
 * @param {boolean} [force=false] Nothing is distpatched if the value doesn't change. Set force to true to `force` the dispatch.
 * @return {SignalListener} A SignalListener instance containing bindings to the signal.
 */
StoreSignal.prototype.set = function (value, force) {
  if (!force && this.current === value) return
  this.current = value
  var node = this._first
  while (node) {
    node.once && this.unlisten(node)
    node.fn.call(node.ctx, this.current)
    node = node.next
  }
}

/**
 * Get current stored value
 * @method
 * @return {*} Current stored value
 */
StoreSignal.prototype.get = function (value) {
  return this.current
}

/**
 * Create a new store containing [StoreSignal](#StoreSignal) instances
 * @param {Object} state Initial state
 * @return {Object} Frozen object containing [StoreSignal](#StoreSignal) instances
 * @example
 * import { createStore } from '@internet/state'
 * const store = createStore({
 *   value: 0
 * })
 *
 * store.value.listen(v => console.log(`value is now ${v}`))
 * store.value.set(3)
 */
function createStore (state) {
  var signals = {}
  for (var k in state) signals[k] = new StoreSignal(state[k])
  signals = Object.freeze(signals)
  return signals
}

export default createStore
