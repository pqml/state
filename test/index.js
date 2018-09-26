import 'raf/polyfill'
import test from 'tape-promise/tape'
import { createStore, Signal } from '../lib'

test('createStore', async t => {
  const store = createStore({
    a: 0,
    b: 0
  })

  t.ok(typeof store.a.listen === 'function', 'Store is correctly created')
  try { store.b = 'mutable' } catch (e) {}
  t.notOk(store.b === 'mutable', 'Store object is frozen')
  t.end()
})

test('Signal', async t => {
  const s = new Signal()

  let calls = 0
  let str = null
  function listener () { calls++; str = Array.from(arguments).reduce((p, c) => c ? p + c : p, '') }

  s.listen(listener)
  s.dispatch('a', 'b', 'c')
  t.ok(calls === 1 && str === 'abc', 'Signal correctly dispatches with multiple arguments')

  calls = 0
  s.listen(listener)
  s.dispatch()
  t.ok(calls === 2, 'Can add the same listener multiple times')

  calls = 0
  s.unlisten(listener)
  s.dispatch()
  t.ok(calls === 0, 'Unlisten all bindings linked to a specific function')

  calls = 0
  const binding = s.listenOnce(listener)
  s.dispatch()
  s.dispatch()
  t.ok(calls === 1, 'listenOnce() is only called one time')
  t.ok(!binding.owner && !binding.fn, 'Signal listener .owner and .fn are disposed after unlistening')

  class L {
    constructor () { this.binding = s.listen(this.listener) }
    listener () { calls++ }
    dispose () { s.unlisten(this.binding) }
    dumbDispose () { s.unlisten(this.listener) }
  }

  const a = new L()
  const b = new L()
  const c = new L() // eslint-disable-line

  calls = 0
  b.dispose()
  s.dispatch()
  t.ok(calls === 2, 'Unlisten directly from the signal listener object')

  calls = 0
  a.dumbDispose()
  s.dispatch()
  t.ok(calls === 0, `Unlisten all listeners methods of a class when context is not used`)

  class L2 {
    constructor (char) { s.listen(this.listener, this); this.char = char }
    listener () { calls++; str += this.char }
    dispose () { s.unlisten(this.listener, this) }
  }
  const e = new L2('e')
  const f = new L2('f') // eslint-disable-line
  const g = new L2('g')
  const h = new L2('h')

  str = ''
  calls = 0
  g.dispose()
  s.dispatch()
  t.ok(calls === 3, `Correctly dispose using context option`)
  t.ok(str === 'efh', `Conserve good function order after dispose`)

  h.dispose()
  const i = new L2('i') // eslint-disable-line
  e.dispose()
  calls = 0
  str = ''
  s.dispatch()
  t.ok(str === 'fi', `Good function order after disposing and re-adding listeners`)

  s.listen(listener)
  s.unlistenAll()
  calls = 0
  s.dispatch()
  t.ok(calls === 0, `unlistenAll unlistens all Listeners`)

  t.end()
})

test('StoreSignal', async t => {
  const { a } = createStore({ a: 0 })
  t.ok(!a.dispatch, 'value.dispatch() is removed from the prototype')

  t.ok(a.get() === 0, 'value.get() returns the current value')
  a.set(1)
  t.ok(a.get() === 1, 'value.set() sets a new one')

  let calls = 0
  function listener () { calls++ }
  a.listen(listener)

  a.set(1)
  t.ok(calls === 0, `signal.set doesn't emit when the value doesn't change`)
  a.set(2)
  t.ok(calls === 1, `signal.set emits when the value changes`)
  a.set(2, true)
  t.ok(calls === 2, `signal.set always emits when force option is set to true`)

  t.end()
})
