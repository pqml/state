function Listener (owner, fn, ctx, once) {
  this.fn = fn
  this.ctx = ctx || null
  this.owner = owner
  this.once = !!once
}

function removeNode (owner, node) {
  if (node.prev) node.prev.next = node.next
  if (node.next) node.next.prev = node.prev
  node.ctx = node.fn = node.owner = null
  if (node === owner.first) owner.first = node.next
  if (node === owner.last) owner.last = node.prev
}

function BaseEmitter () {}

BaseEmitter.prototype.dispatch = function () {
  var node = this._first
  while (node) {
    node.once && this.unlisten(node)
    node.fn.apply(node._thisArg, arguments)
    node = node.next
  }
}

BaseEmitter.prototype.listen = function (fn, ctx, once) {
  var node = new Listener(this, fn, ctx, once)
  if (!this._first) {
    this._first = node
    this._last = node
  } else {
    this._last.next = node
    this._first = this._last
    this._last = node
  }
  return node
}

BaseEmitter.prototype.listenOnce = function (fn, ctx) {
  return this.listen(fn, ctx, true)
}

BaseEmitter.prototype.unlisten = function (fn, ctx) {
  if (fn instanceof Listener) return removeNode(this, fn)
  if (!ctx) ctx = null
  var node = this._first
  while (node) {
    if (node.fn === fn && node.ctx === ctx) removeNode(this, node)
    node = node.next
  }
}

BaseEmitter.prototype.unlistenAll = function () {
  var node = this._first
  this._first = this._last = null
  while (node) {
    removeNode(this, node)
    node = node.next
  }
}
