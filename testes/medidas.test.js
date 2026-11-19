// Os numeros do README, presos.

import test from 'node:test'
import assert from 'node:assert/strict'

import { conferencia, campeoes, escadas } from '../src/medidas.js'

test('as tres contagens e as duas identidades batem de 1 a 12', () => {
  for (const l of conferencia(12, 10)) {
    assert.equal(l.cantosIguaisGanchos, true, `n=${l.n}`)
    assert.equal(l.soma, l.involucoes, `n=${l.n}`)
    assert.equal(l.somaQuadrados, l.fatorial, `n=${l.n}`)
    if (l.montados !== null) assert.equal(BigInt(l.montados), l.soma, `n=${l.n}`)
  }
  assert.equal(conferencia(12, 10)[9].montados, 9496)
  assert.equal(conferencia(12, 10)[11].soma, 140152n)
})

test('o campeao e sempre um autoconjugado sozinho ou um par conjugado', () => {
  const c = campeoes(24)
  assert.equal(c.filter((l) => l.sozinho && !l.autoconjugado).length, 0)
  assert.equal(c.filter((l) => !l.sozinho && !l.parConjugado).length, 0)
  assert.deepEqual(c.filter((l) => l.sozinho).map((l) => l.n), [1, 3, 5, 6, 8, 10, 12, 15, 17, 21, 23])
})

test('o maior f, n a n, em alguns pontos', () => {
  const c = campeoes(24)
  assert.equal(c[5].f, 16n)
  assert.equal(c[9].f, 768n)
  assert.equal(c[14].f, 292864n)
  assert.equal(c[20].f, 1118939184n)
  assert.deepEqual(c[20].formatos, [[7, 5, 3, 2, 2, 1, 1]])
})

test('a participacao do campeao em n! cai, mas nao sempre', () => {
  const p = campeoes(24).map((l) => l.participacao)
  assert.equal(p[2], 66.66)
  assert.equal(p[23], 2.22)
  // De n=5 para n=6 ela SOBE: 30% para 35,55%.
  assert.equal(p[4], 30)
  assert.equal(p[5], 35.55)
  assert.ok(p[5] > p[4])
})

test('a escada e campea em 3, 6, 10 e 15, e perde no 21', () => {
  const e = escadas(8)
  assert.deepEqual(e.slice(0, 4).map((l) => l.lugar), [1, 1, 1, 1])
  const n21 = e.find((l) => l.n === 21)
  assert.equal(n21.lugar, 2)
  assert.equal(n21.formatos, 792)
  assert.deepEqual(n21.campeao, [7, 5, 3, 2, 2, 1, 1])
  assert.equal(n21.fEscada, 1100742656n)
  assert.equal(n21.razao, 1.0165)
})

test('depois do 21 a escada desaba: 5a no 28, 37a no 36', () => {
  const e = escadas(8)
  const n28 = e.find((l) => l.n === 28)
  const n36 = e.find((l) => l.n === 36)
  assert.equal(n28.lugar, 5)
  assert.equal(n28.formatos, 3718)
  assert.equal(n36.lugar, 37)
  assert.equal(n36.formatos, 17977)
  assert.equal(n36.razao, 1.4003)
})
