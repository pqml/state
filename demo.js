import { createStore, Signal } from '../lib'
import Runner from 'mini-runner'
import MiniSignal from 'mini-signals'
import EventEmitter from 'eventemitter3'

class Listener {
  constructor () { this.time = 0 }
  update () { this.time++ }
}

const EVENTCOUNT = 1000
const DISPATCHCOUNT = 2000

const a = createStore({ updateStore: 0 })
const updateStore = a.updateStore
const updateRunner = new Runner('update')
const updateMiniSignal = new MiniSignal()
const updateEvent = new EventEmitter()
const updateSignal = new Signal()
const pre = document.querySelector('pre')
let listeners = []

for (let i = 0; i < EVENTCOUNT; i++) {
  var listener = new Listener()
  updateRunner.add(listener)
  updateSignal.listen(listener.update, listener)
  updateMiniSignal.add(listener.update, listener)
  updateEvent.on('update', listener.update, listener)
  updateStore.listen(listener.update, listener)
  listeners.push(listener)
}

let i
let start
let time
let cycles = DISPATCHCOUNT

pre.innerHTML += EVENTCOUNT + ' Events \n'
pre.innerHTML += DISPATCHCOUNT + ' Dispatches \n'
pre.innerHTML += '\n---\n\n'

// SIGNAL
start = performance.now()
for (i = 0; i < cycles; i++) updateSignal.dispatch()
time = performance.now() - start
pre.innerHTML += 'Signal ' + time + 'ms \n'

// SIGNALSTORE
start = performance.now()
for (i = 0; i < cycles; i++) updateStore.set(0, true)
time = performance.now() - start
pre.innerHTML += 'StoreSignal ' + time + 'ms \n'

pre.innerHTML += '\n---\n\n'

//RUNNER
start = performance.now()
for (i = 0; i < cycles; i++) updateRunner.emit()
time = performance.now() - start;
pre.innerHTML += 'MiniRunner ' + time + 'ms \n'

// MINI-SIGNALS
start = performance.now()
for (i = 0; i < cycles; i++) updateMiniSignal.dispatch()
time = performance.now() - start
pre.innerHTML += 'mini-signals ' + time + 'ms \n'

// EVENTS
start = performance.now()
for (i = 0; i < cycles; i++) updateEvent.emit('update')
time = performance.now() - start
pre.innerHTML += 'EventEmitter3 ' + time + 'ms \n'
