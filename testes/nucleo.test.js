import test from 'node:test'
import assert from 'node:assert/strict'

import { particoes, conjugada, autoconjugada, cantos, tiraCanto, porCantos, monta, ehPadrao } from '../src/young.js'

test('as particoes de 5 sao 7', () => {
  assert.deepEqual(particoes(5), [[5], [4, 1], [3, 2], [3, 1, 1], [2, 2, 1], [2, 1, 1, 1], [1, 1, 1, 1, 1]])
})

test('a conjugada troca linhas por colunas, e duas vezes volta', () => {
  assert.deepEqual(conjugada([4, 2, 1]), [3, 2, 1, 1])
  for (const l of particoes(8)) assert.deepEqual(conjugada(conjugada(l)), l)
})

test('a escada e autoconjugada; (3,1) nao e', () => {
  assert.equal(autoconjugada([3, 2, 1]), true)
  assert.equal(autoconjugada([3, 1]), false)
})

test('os cantos de (4,2,2,1) estao nas linhas 0, 2 e 3', () => {
  assert.deepEqual(cantos([4, 2, 2, 1]), [0, 2, 3])
  assert.deepEqual(tiraCanto([4, 2, 2, 1], 3), [4, 2, 2])
})

test('linha e coluna tem f = 1', () => {
  assert.equal(porCantos([6]), 1n)
  assert.equal(porCantos([1, 1, 1, 1, 1, 1]), 1n)
})

test('f(3,2,1) = 16 pelos cantos e montando', () => {
  assert.equal(porCantos([3, 2, 1]), 16n)
  assert.equal(monta([3, 2, 1]), 16)
})

test('todo quadro montado e padrao, e eles sao distintos', () => {
  const vistos = new Set()
  monta([4, 3, 1], (q) => {
    assert.equal(ehPadrao(q), true)
    vistos.add(JSON.stringify(q))
  })
  assert.equal(vistos.size, Number(porCantos([4, 3, 1])))
})

test('ehPadrao reprova linha decrescente, coluna decrescente e numero repetido', () => {
  assert.equal(ehPadrao([[1, 2], [3]]), true)
  assert.equal(ehPadrao([[2, 1], [3]]), false)
  assert.equal(ehPadrao([[1, 3], [2]]), true)
  assert.equal(ehPadrao([[2, 3], [1]]), false)
  assert.equal(ehPadrao([[1, 1], [3]]), false)
})

test('a conjugada tem o mesmo numero de quadros', () => {
  for (const l of particoes(9)) assert.equal(porCantos(l), porCantos(conjugada(l)))
})
