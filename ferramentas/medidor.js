#!/usr/bin/env node
// O medidor. Roda as tabelas e cospe os numeros que vao para o README.
//
//   node ferramentas/medidor.js              todas
//   node ferramentas/medidor.js conferencia  cantos, ganchos, montagem, involucoes, n!
//   node ferramentas/medidor.js campeoes     o formato de maior f, n a n
//   node ferramentas/medidor.js escadas      a escada nos numeros triangulares

import { conferencia, campeoes, escadas } from '../src/medidas.js'

const n = (x) => (typeof x === 'bigint' ? x : BigInt(x)).toLocaleString('pt-BR')
const pad = (s, w) => String(s).padStart(w)
const forma = (l) => '(' + l.join(',') + ')'

function tConferencia () {
  console.log('\n== tres contagens e duas identidades ==')
  for (const l of conferencia(12, 10)) {
    console.log(`   n=${pad(l.n, 2)}  ${pad(l.formatos, 3)} formatos   cantos=ganchos ${l.cantosIguaisGanchos}   soma f ${pad(n(l.soma), 8)} = involucoes ${l.soma === l.involucoes}   soma f^2 = n! ${l.somaQuadrados === l.fatorial}${l.montados !== null ? '   montados um a um: ' + n(l.montados) : ''}`)
  }
}

function tCampeoes () {
  console.log('\n== o formato de maior f ==')
  for (const l of campeoes(24)) {
    const tipo = l.sozinho ? (l.autoconjugado ? 'sozinho, autoconjugado' : 'SOZINHO E NAO AUTOCONJUGADO') : (l.parConjugado ? 'par conjugado' : 'outro empate')
    console.log(`   n=${pad(l.n, 2)}  f ${pad(n(l.f), 17)}   ${l.formatos.map(forma).join(' ')}   ${tipo}   f^2/n! ${l.participacao.toFixed(2)}%`)
  }
}

function tEscadas () {
  console.log('\n== a escada nos numeros triangulares ==')
  for (const l of escadas(8)) {
    const s = l.lugar === 1 ? 'a escada e a campea' : `a escada fica em ${l.lugar}o de ${n(l.formatos)}, o campeao ${forma(l.campeao)} passa ela ${l.razao.toFixed(4)}x`
    console.log(`   n=${pad(l.n, 2)}  ${forma(l.escada)}   ${s}`)
  }
}

const partes = { conferencia: tConferencia, campeoes: tCampeoes, escadas: tEscadas }
const pedido = process.argv[2]
if (!pedido) for (const f of Object.values(partes)) f()
else if (partes[pedido]) partes[pedido]()
else { console.error(`nao conheco "${pedido}". conheco: ${Object.keys(partes).join(', ')}`); process.exit(1) }
