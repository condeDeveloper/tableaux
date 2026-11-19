import test from 'node:test'
import assert from 'node:assert/strict'

import { particoes, porCantos } from '../src/young.js'
import { ganchos, porGanchos, involucoes, contaInvolucoesNoBraco, fatorial } from '../src/juiz.js'

test('os ganchos de (3,2): 4 3 1 / 2 1', () => {
  assert.deepEqual(ganchos([3, 2]), [[4, 3, 1], [2, 1]])
  assert.equal(porGanchos([3, 2]), 5n)
})

test('ganchos e cantos concordam em todo formato ate n=12', () => {
  for (let n = 1; n <= 12; n++) for (const l of particoes(n)) assert.equal(porGanchos(l), porCantos(l), `${l}`)
})

test('a recorrencia das involucoes bate com a contagem no braco ate n=8', () => {
  for (let n = 1; n <= 8; n++) assert.equal(involucoes(n), BigInt(contaInvolucoesNoBraco(n)), `n=${n}`)
})

test('involucoes: 1, 2, 4, 10, 26, 76, 232, 764, 2620, 9496', () => {
  assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(involucoes), [1n, 2n, 4n, 10n, 26n, 76n, 232n, 764n, 2620n, 9496n])
})

test('a soma de f e as involucoes; a soma de f^2 e n!', () => {
  for (let n = 1; n <= 12; n++) {
    let s = 0n
    let s2 = 0n
    for (const l of particoes(n)) { const f = porGanchos(l); s += f; s2 += f * f }
    assert.equal(s, involucoes(n), `soma n=${n}`)
    assert.equal(s2, fatorial(n), `quadrados n=${n}`)
  }
})

test('a soma de f^2 reprova uma conta torta', () => {
  // Juiz que aprova tudo nao e juiz: somando f em vez de f^2 nao da n!.
  let s = 0n
  for (const l of particoes(6)) s += porGanchos(l)
  assert.notEqual(s, fatorial(6))
})
