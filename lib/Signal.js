function SignalListener (owner, fn, ctx, once) {
  this.fn = fn
  this.ctx = ctx || null
  this.owner = owner
  this.once = !!once
}

function removeNode (owner, node) {
  if (node.prev) node.prev.next = node.next
  if (node.next) node.next.prev = node.prev
  node.ctx = node.fn = node.owner = null
  if (node === owner._first) owner._first = node.next
  if (node === owner._last) owner._last = node.prev
}


/**
 * Create a new Signal instance
 * @class
 * @constructor
 * @return {Signal} A new signal
 * @example
 * import { Signal } from '@internet/state'
 * const click = new Signal()
 * document.addEventListener('click', click.dispatch)
 *
 * class Component {
 *   constructor () {
 *     click.listen(this.onClick, this)
 *   }
 *
 *   onClick () {
 *     // `this` is the component instance
 *     console.log('clicked')
 *   }
 *
 *   dispose () {
 *     click.unlisten(this.onClick, this)
 *   }
 * }
 */
function Signal () {}

/**
 * Dispatches the signal to all listeners.
 * @method
 * @param {...*} [arguments] Arguments passed to each listeners (:warning: 5 maximum)
 */
Signal.prototype.dispatch = function (a0, a1, a2, a3, a4) {
  var node = this._first
  while (node) {
    node.fn.call(node.ctx, a0, a1, a2, a3, a4)
    node.once && this.unlisten(node)
    node = node.next
  }
}

/**
 * Register a new listener
 * @method
 * @param {Function} callback Callback function
 * @param {*} [context] The context to bind the callback to
 * @return {SignalListener} A SignalListener instance containing bindings to the signal.
 */
Signal.prototype.listen = function (fn, ctx, once) {
  var node = new SignalListener(this, fn, ctx, once)
  if (!this._first) {
    this._first = node
    this._last = node
  } else {
    this._last.next = node
    node.prev = this._last
    this._last = node
  }
  return node
}

/**
 * Register a new listener that will be executed only once.
 * @method
 * @param {Function} callback Callback function
 * @param {*} [context] The context to bind the callback to
 * @return {SignalListener} A SignalListener instance containing bindings to the signal.
 */
Signal.prototype.listenOnce = function (fn, ctx) {
  return this.listen(fn, ctx, true)
}

/**
 * Detach a listener from the signal
 * You can also pass
 * @method
 * @param {(Function|SignalListener)} callback The callback used when listening to the signal **OR** The SignalListener instance returned when listening the signal
 * @param {*} [context] The context used when listening to the signal (only when the 1st arg is a function)
 * @example
 * import { Signal } from '@internet/state'
 * const signal = new Signal()
 *
 * // Using the SignalListener binding (better performances)
 * const binding = signal.listen(() => {})
 * signal.unlisten(binding)
 *
 * // Using function
 * function listener () {}
 * signal.listen(listener)
 * signal.unlisten(listener)
 */
Signal.prototype.unlisten = function (fn, ctx) {
  if (fn instanceof SignalListener) return removeNode(this, fn)
  if (!ctx) ctx = null
  var node = this._first
  while (node) {
    if (node.fn === fn && node.ctx === ctx) removeNode(this, node)
    node = node.next
  }
}

/**
 * Remove all listeners attached to the signal instance
 * @method
 */
Signal.prototype.unlistenAll = function () {
  var node = this._first
  this._first = this._last = null
  while (node) {
    removeNode(this, node)
    node = node.next
  }
}

export default Signal
