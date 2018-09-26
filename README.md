# State
[:books: **Documentation**](#api)  |  [:bar_chart: **Benchmarks**](https://pqml.github.io/state)  |  [:globe_with_meridians: **Internet modules**](https://www.npmjs.com/org/internet)

- Create tiny signal-based stores
- `Signal` class to create your own signals

<br>

# Requirements

- ES6 Modules support
  - Using a module bundler like Webpack, Rollup or Parcel
  - [Native support from browser](https://caniuse.com/#feat=es6-module)
  - From NodeJS with something like [esm](https://github.com/standard-things/esm)

<br>

# Module Installation

```sh
# using npm
$ npm install --save @internet/state

# or using yarn
$ yarn add @internet/state
```

<br>

<a name="api"></a>
# API

```js
import { createStore, Signal } from '@internet/state'
```

- [:mailbox_with_mail: **createStore**](#createStore): _Create a new store: a collection of [StoreSignal](#StoreSignal) instances_
- [:satellite: **Signal**](#Signal): _Signal class_

<br>

<a name="createStore"></a>
## :mailbox_with_mail: createStore()
Create a new store containing [StoreSignal](#StoreSignal) instances

**Kind**: global function  
**Returns**: <code>Object</code> - Frozen object containing [StoreSignal](#StoreSignal) instances  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> | Initial state |

**Example**  
```js
import { createStore } from '@internet/state'
const store = createStore({
  value: 0
})

store.value.listen(v => console.log(`value is now ${v}`))
store.value.set(3)
```

<br>

<a name="StoreSignal"></a>
## :mailbox_with_mail: StoreSignal
StoreSignal created by [createStore](#createStore).
Inherits from [Signal](#Signal) - See its API for `listen` / `unlisten` methods

:warning: `dispatch()` method from Signal is removed and replaced by a `set()` method

**Kind**: global function  
**Extends**: [<code>Signal</code>](#Signal)  
**Returns**: [<code>StoreSignal</code>](#StoreSignal) - StoreSignal instance  

| Param | Type | Description |
| --- | --- | --- |
| initialValue | <code>\*</code> | Initial value |

#### API

* [StoreSignal(initialValue)](#StoreSignal) ⇒ [<code>StoreSignal</code>](#StoreSignal)
    * [.set(newValue, [force])](#StoreSignal+set) ⇒ <code>SignalListener</code>
    * [.get()](#StoreSignal+get) ⇒ <code>\*</code>

<br>
<a name="StoreSignal+set"></a>

#### storeSignal.set(newValue, [force]) ⇒ <code>SignalListener</code>
Change the stored value. Dispatch to all listeners the new value

**Kind**: instance method of [<code>StoreSignal</code>](#StoreSignal)  
**Returns**: <code>SignalListener</code> - A SignalListener instance containing bindings to the signal.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| newValue | <code>\*</code> |  | New value to store |
| [force] | <code>boolean</code> | <code>false</code> | Nothing is distpatched if the value doesn't change. Set force to true to `force` the dispatch. |


* * *

<a name="StoreSignal+get"></a>

#### storeSignal.get() ⇒ <code>\*</code>
Get current stored value

**Kind**: instance method of [<code>StoreSignal</code>](#StoreSignal)  
**Returns**: <code>\*</code> - Current stored value  

* * *


<br>

<a name="Signal"></a>
## :satellite: Signal
**Kind**: global class  
#### API

* [Signal](#Signal)
    * [new Signal()](#new_Signal_new)
    * [.dispatch([...arguments])](#Signal+dispatch)
    * [.listen(callback, [context])](#Signal+listen) ⇒ <code>SignalListener</code>
    * [.listenOnce(callback, [context])](#Signal+listenOnce) ⇒ <code>SignalListener</code>
    * [.unlisten(callback, [context])](#Signal+unlisten)
    * [.unlistenAll()](#Signal+unlistenAll)

<br>
<a name="new_Signal_new"></a>

#### new Signal()
Create a new Signal instance

**Returns**: [<code>Signal</code>](#Signal) - A new signal  
**Example**  
```js
import { Signal } from '@internet/state'
const click = new Signal()
document.addEventListener('click', click.dispatch)

class Component {
  constructor () {
    click.listen(this.onClick, this)
  }

  onClick () {
    // `this` is the component instance
    console.log('clicked')
  }

  dispose () {
    click.unlisten(this.onClick, this)
  }
}
```

* * *

<a name="Signal+dispatch"></a>

#### signal.dispatch([...arguments])
Dispatches the signal to all listeners.

**Kind**: instance method of [<code>Signal</code>](#Signal)  

| Param | Type | Description |
| --- | --- | --- |
| [...arguments] | <code>\*</code> | Arguments passed to each listeners (:warning: 5 maximum) |


* * *

<a name="Signal+listen"></a>

#### signal.listen(callback, [context]) ⇒ <code>SignalListener</code>
Register a new listener

**Kind**: instance method of [<code>Signal</code>](#Signal)  
**Returns**: <code>SignalListener</code> - A SignalListener instance containing bindings to the signal.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Callback function |
| [context] | <code>\*</code> | The context to bind the callback to |


* * *

<a name="Signal+listenOnce"></a>

#### signal.listenOnce(callback, [context]) ⇒ <code>SignalListener</code>
Register a new listener that will be executed only once.

**Kind**: instance method of [<code>Signal</code>](#Signal)  
**Returns**: <code>SignalListener</code> - A SignalListener instance containing bindings to the signal.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Callback function |
| [context] | <code>\*</code> | The context to bind the callback to |


* * *

<a name="Signal+unlisten"></a>

#### signal.unlisten(callback, [context])
Detach a listener from the signal
You can also pass

**Kind**: instance method of [<code>Signal</code>](#Signal)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> \| <code>SignalListener</code> | The callback used when listening to the signal **OR** The SignalListener instance returned when listening the signal |
| [context] | <code>\*</code> | The context used when listening to the signal (only when the 1st arg is a function) |

**Example**  
```js
import { Signal } from '@internet/state'
const signal = new Signal()

// Using the SignalListener binding (better performances)
const binding = signal.listen(() => {})
signal.unlisten(binding)

// Using function
function listener () {}
signal.listen(listener)
signal.unlisten(listener)
```

* * *

<a name="Signal+unlistenAll"></a>

#### signal.unlistenAll()
Remove all listeners attached to the signal instance

**Kind**: instance method of [<code>Signal</code>](#Signal)  

* * *

