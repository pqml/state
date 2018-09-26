'use strict'

/**
 * @module maths
 * @example
 * import { mod, map, lerp, ... } from '@internet/maths'
 */

/**
 * Perform a modulo operation.
 * @param {number} dividend A dividend
 * @param {number} divisor A divisor
 * @return {number} Result of the modulo operation
 * @example
 * const resut = mod(-1, 5) // return 4
 */
export function mod (dividend, divisor) {
  return ((dividend % divisor) + divisor) % divisor
}

/**
 * Re-maps a number from one range to another.
 * @param {number} value The incoming value to be converted
 * @param {number} start1 Lower bound of the value's current range
 * @param {number} stop1 Upper bound of the value's current range
 * @param {number} start2 Lower bound of the value's target range
 * @param {number} stop2 Upper bound of the value's target range
 * @return {number}
 */
export function map (value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
}

/**
 * Constrains a value to not exceed a maximum and minimum value.
 * @param {number} value The value to constrain
 * @param {number} min Minimum limit
 * @param {number} max Maximum limit
 * @return {number}
 */
export function clamp (value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Normalizes a number from another range into a value between 0 and 1.
 * @param {number} value The incoming value to be converted
 * @param {number} min Lower bound of the value's current range
 * @param {number} max Upper bound of the value's current range
 * @return {number} Normalized value
 */
export function norm (value, min, max) {
  return (value - min) / (max - min)
}

/**
 * Perform a linear interpolation between two values. Equivalent of mix in GLSL.
 * @param {number} start Start of the range in which to interpolate
 * @param {number} end End of the range in which to interpolate
 * @param {number} amount Amount to lerp between the two number (from 0 to 1)
 * @return {number} Lerped value
 */
export function lerp (start, end, t) {
  return start * (1 - t) + end * t
}

/**
 * Frame-rate aware damping function
 * @param {number} source Initial value
 * @param {number} target Target value
 * @param {number} smoothing Smoothing rate (inverse of lerp: 0 will give you back the target value)
 * @param {number} dt Delta-time (in milliseconds)
 * @return {number} Damped value
 */
export function damp (a, b, smoothing, dt) {
  return lerp(a, b, 1 - Math.exp(-smoothing * dt))
}

/**
 * Calculates the distance between two points (2D)
 * @param {number} x1 x-coordinate of the first point
 * @param {number} y1 y-coordinate of the first point
 * @param {number} x2 x-coordinate of the second point
 * @param {number} y2 y-coordinate of the second point
 * @return {number} Distance
 */
export function dist (x1, y1, x2, y2) {
  return Math.sqrt(sqdist(x1, y1, x2, y2))
}

/**
 * Calculates the squared distance between two points (2D)
 * @param {number} x1 x-coordinate of the first point
 * @param {number} y1 y-coordinate of the first point
 * @param {number} x2 x-coordinate of the second point
 * @param {number} y2 y-coordinate of the second point
 * @return {number} Distance
 */
export function sqdist (x1, y1, x2, y2) {
  return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)
}

/**
 * Calculates the angle between two points (2D)
 * @param {number} x1 x-coordinate of the first point
 * @param {number} y1 y-coordinate of the first point
 * @param {number} x2 x-coordinate of the second point
 * @param {number} y2 y-coordinate of the second point
 * @return {number} Angle (in Radians)
 */
export function ang (x1, y1, x2, y2) {
  return Math.atan2((y2 - y1), (x2 - x1))
}

/**
 * Calculates the angle between two points (2D)
 * @param {number} radius Radius / Distance
 * @param {number} angle Angle
 * @return {array} Array containing the cartesian coordinates [x, y]
 */
export function polarToCart (radius, angle) {
  return [radius * Math.cos(angle), radius * Math.sin(angle)]
}

/**
 * Convert angle from radians to degrees
 * @param {number} angle Angle in radian
 * @return {number} Angle in degree
 */
export function radToDeg (angle) {
  return angle * 180.0 / Math.PI
}

/**
 * Convert angle from degrees to radians
 * @param {number} angle Angle in degree
 * @return {number} Angle in radian
 */
export function degToRad (angle) {
  return angle * Math.PI / 180.0
}

/**
 * Get the mean average of values
 * @param {array} values
 * @return {number} mean value
 */
export function mean (values = []) {
  var val = 0
  var len = values.length
  for (var i = 0; i < len; i++) val += values[i]
  return val / len
}

/**
 * Get the median average of values
 * @param {array} values
 * @return {number} median value
 */
export function median (values = []) {
  var numbers = values.slice(0).sort((a, b) => a - b)
  var middle = Math.floor(numbers.length / 2)
  var isEven = numbers.length % 2 === 0
  return isEven ? (numbers[middle] + numbers[middle - 1]) / 2 : numbers[middle]
}
