import * as m from '../lib'
import test from 'tape-promise/tape'

test('mod', t => {
  t.equal(m.mod(79, 33), 13)
  t.equal(m.mod(-13, 32), 19)
  t.end()
})

test('clamp', t => {
  t.equal(m.clamp(3, -30, 40), 3)
  t.equal(m.clamp(-3.333, -1.44, 3), -1.44)
  t.equal(m.clamp(34, -3, -1), -1)
  t.end()
})

test('norm', t => {
  t.equal(m.norm(20, 0, 40), 0.5)
  t.end()
})
