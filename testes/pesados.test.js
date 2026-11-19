// Os casos caros: montar os 140.152 quadros de n=12 um a um.

import test from 'node:test'
import assert from 'node:assert/strict'

import { particoes, monta, ehPadrao } from '../src/young.js'
import { involucoes } from '../src/juiz.js'

test('n=12: os 140.152 quadros montados um a um, todos padrao', { timeout: 600000 }, () => {
  let total = 0
  let ruins = 0
  for (const l of particoes(12)) {
    total += monta(l, (q) => { if (!ehPadrao(q)) ruins++ })
  }
  assert.equal(total, 140152)
  assert.equal(BigInt(total), involucoes(12))
  assert.equal(ruins, 0)
})
