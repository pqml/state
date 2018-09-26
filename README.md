# Maths utilities
[:books: **Documentation**](#api)  |  [:globe_with_meridians: **Internet modules**](https://www.npmjs.com/org/internet)

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
$ npm install --save @internet/maths

# or using yarn
$ yarn add @internet/maths
```

<br>

<a name="api"></a>
# API

<a name="module_maths"></a>
**Example**  
```js
import { mod, map, lerp, ... } from '@internet/maths'
```
#### API

* [maths](#module_maths)
    * [.mod(dividend, divisor)](#module_maths.mod) ⇒ <code>number</code>
    * [.map(value, start1, stop1, start2, stop2)](#module_maths.map) ⇒ <code>number</code>
    * [.clamp(value, min, max)](#module_maths.clamp) ⇒ <code>number</code>
    * [.norm(value, min, max)](#module_maths.norm) ⇒ <code>number</code>
    * [.lerp(start, end, amount)](#module_maths.lerp) ⇒ <code>number</code>
    * [.damp(source, target, smoothing, dt)](#module_maths.damp) ⇒ <code>number</code>
    * [.dist(x1, y1, x2, y2)](#module_maths.dist) ⇒ <code>number</code>
    * [.sqdist(x1, y1, x2, y2)](#module_maths.sqdist) ⇒ <code>number</code>
    * [.ang(x1, y1, x2, y2)](#module_maths.ang) ⇒ <code>number</code>
    * [.polarToCart(radius, angle)](#module_maths.polarToCart) ⇒ <code>array</code>
    * [.radToDeg(angle)](#module_maths.radToDeg) ⇒ <code>number</code>
    * [.degToRad(angle)](#module_maths.degToRad) ⇒ <code>number</code>
    * [.mean(values)](#module_maths.mean) ⇒ <code>number</code>
    * [.median(values)](#module_maths.median) ⇒ <code>number</code>

<br>
<a name="module_maths.mod"></a>

#### maths.mod(dividend, divisor) ⇒ <code>number</code>
Perform a modulo operation.

**Kind**: static method of [<code>maths</code>](#module_maths)  
**Returns**: <code>number</code> - Result of the modulo operation  

| Param | Type | Description |
| --- | --- | --- |
| dividend | <code>number</code> | A dividend |
| divisor | <code>number</code> | A divisor |

**Example**  
```js
const resut = mod(-1, 5) // return 4
```

* * *

<a name="module_maths.map"></a>

#### maths.map(value, start1, stop1, start2, stop2) ⇒ <code>number</code>
Re-maps a number from one range to another.

**Kind**: static method of [<code>maths</code>](#module_maths)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The incoming value to be converted |
| start1 | <code>number</code> | Lower bound of the value's current range |
| stop1 | <code>number</code> | Upper bound of the value's current range |
| start2 | <code>number</code> | Lower bound of the value's target range |
| stop2 | <code>number</code> | Upper bound of the value's target range |


* * *

<a name="module_maths.clamp"></a>

#### maths.clamp(value, min, max) ⇒ <code>number</code>
Constrains a value to not exceed a maximum and minimum value.

**Kind**: static method of [<code>maths</code>](#module_maths)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value to constrain |
| min | <code>number</code> | Minimum limit |
| max | <code>number</code> | Maximum limit |


* * *

<a name="module_maths.norm"></a>

#### maths.norm(value, min, max) ⇒ <code>number</code>
Normalizes a number from another range into a value between 0 and 1.

**Kind**: static method of [<code>maths</code>](#module_maths)  
**Returns**: <code>number</code> - Normalized value  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The incoming value to be converted |
| min | <code>number</code> | Lower bound of the value's current range |
| max | <code>number</code> | Upper bound of the value's current range |


* * *

<a name="module_maths.lerp"></a>

#### maths.lerp(start, end, amount) ⇒ <code>number</code>
Perform a linear interpolation between two values. Equivalent of mix in GLSL.

**Kind**: static method of [<code>maths</code>](#module_maths)  
**Returns**: <code>number</code> - Lerped value  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>number</code> | Start of the range in which to interpolate |
| end | <code>number</code> | End of the range in which to interpolate |
| amount | <code>number</code> | Amount to lerp between the two number (from 0 to 1) |


* * *

<a name="module_maths.damp"></a>

#### maths.damp(source, target, smoothing, dt) ⇒ <code>number</code>
Frame-rate aware damping function

**Kind**: static method of [<code>maths</code>](#module_maths)  
**Returns**: <code>number</code> - Damped value  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>number</code> | Initial value |
| target | <code>number</code> | Target value |
| smoothing | <code>number</code> | Smoothing rate (inverse of lerp: 0 will give you back the target value) |
| dt | <code>number</code> | Delta-time (in milliseconds) |


* * *

<a name="module_maths.dist"></a>

#### maths.dist(x1, y1, x2, y2) ⇒ <code>number</code>
Calculates the distance between two points (2D)

**Kind**: static method of [<code>maths</code>](#module_maths)  
**Returns**: <code>number</code> - Distance  

| Param | Type | Description |
| --- | --- | --- |
| x1 | <code>number</code> | x-coordinate of the first point |
| y1 | <code>number</code> | y-coordinate of the first point |
| x2 | <code>number</code> | x-coordinate of the second point |
| y2 | <code>number</code> | y-coordinate of the second point |


* * *

<a name="module_maths.sqdist"></a>

#### maths.sqdist(x1, y1, x2, y2) ⇒ <code>number</code>
Calculates the squared distance between two points (2D)

**Kind**: static method of [<code>maths</code>](#module_maths)  
**Returns**: <code>number</code> - Distance  

| Param | Type | Description |
| --- | --- | --- |
| x1 | <code>number</code> | x-coordinate of the first point |
| y1 | <code>number</code> | y-coordinate of the first point |
| x2 | <code>number</code> | x-coordinate of the second point |
| y2 | <code>number</code> | y-coordinate of the second point |


* * *

<a name="module_maths.ang"></a>

#### maths.ang(x1, y1, x2, y2) ⇒ <code>number</code>
Calculates the angle between two points (2D)

**Kind**: static method of [<code>maths</code>](#module_maths)  
**Returns**: <code>number</code> - Angle (in Radians)  

| Param | Type | Description |
| --- | --- | --- |
| x1 | <code>number</code> | x-coordinate of the first point |
| y1 | <code>number</code> | y-coordinate of the first point |
| x2 | <code>number</code> | x-coordinate of the second point |
| y2 | <code>number</code> | y-coordinate of the second point |


* * *

<a name="module_maths.polarToCart"></a>

#### maths.polarToCart(radius, angle) ⇒ <code>array</code>
Calculates the angle between two points (2D)

**Kind**: static method of [<code>maths</code>](#module_maths)  
**Returns**: <code>array</code> - Array containing the cartesian coordinates [x, y]  

| Param | Type | Description |
| --- | --- | --- |
| radius | <code>number</code> | Radius / Distance |
| angle | <code>number</code> | Angle |


* * *

<a name="module_maths.radToDeg"></a>

#### maths.radToDeg(angle) ⇒ <code>number</code>
Convert angle from radians to degrees

**Kind**: static method of [<code>maths</code>](#module_maths)  
**Returns**: <code>number</code> - Angle in degree  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | Angle in radian |


* * *

<a name="module_maths.degToRad"></a>

#### maths.degToRad(angle) ⇒ <code>number</code>
Convert angle from degrees to radians

**Kind**: static method of [<code>maths</code>](#module_maths)  
**Returns**: <code>number</code> - Angle in radian  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | Angle in degree |


* * *

<a name="module_maths.mean"></a>

#### maths.mean(values) ⇒ <code>number</code>
Get the mean average of values

**Kind**: static method of [<code>maths</code>](#module_maths)  
**Returns**: <code>number</code> - mean value  

| Param | Type |
| --- | --- |
| values | <code>array</code> | 


* * *

<a name="module_maths.median"></a>

#### maths.median(values) ⇒ <code>number</code>
Get the median average of values

**Kind**: static method of [<code>maths</code>](#module_maths)  
**Returns**: <code>number</code> - median value  

| Param | Type |
| --- | --- |
| values | <code>array</code> | 


* * *

