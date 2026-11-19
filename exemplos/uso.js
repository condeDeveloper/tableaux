#!/usr/bin/env node
// Exemplo de uso da biblioteca pela porta de entrada do pacote.
//
//   node exemplos/uso.js 3 2 1
//
// Conta os quadros do formato pelos tres caminhos e imprime os primeiros.

import { porCantos, porGanchos, monta, ganchos } from '../src/index.js'

const formato = process.argv.slice(2).map(Number)
const lambda = formato.length ? formato : [3, 2, 1]

console.log(`formato (${lambda.join(',')})`)
console.log(`  pelos cantos: ${porCantos(lambda)}`)
console.log(`  pelos ganchos: ${porGanchos(lambda)}   ganchos: ${ganchos(lambda).map((l) => l.join(' ')).join(' / ')}`)
const exemplos = []
const total = monta(lambda, (q) => { if (exemplos.length < 3) exemplos.push(q) })
console.log(`  montando um a um: ${total}`)
for (const q of exemplos) console.log('\n' + q.map((l) => '  ' + l.map((v) => String(v).padStart(3)).join('')).join('\n'))
