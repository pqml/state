import BaseSignal from './BaseSignal'

function StoreSignal (value) { this.current = value }

StoreSignal.prototype = Object.create(BaseSignal.prototype)
StoreSignal.prototype.constructor = StoreSignal

StoreSignal.prototype.set = function (value, force) {
  if (!force && this.current === value) return
  this.current = value
  this.dispatch(this.current)
}

StoreSignal.prototype.get = function (value) {
  return this.current
}

function createStore (state) {
  var signals = {}
  for (var k in state) signals[k] = new StoreSignal(state[k])
  return signals
}

export default createStore
