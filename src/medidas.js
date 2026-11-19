// As tabelas do README. Calculadas aqui, e em lugar nenhum mais.

import { particoes, porCantos, monta, autoconjugada, conjugada, chave } from './young.js'
import { porGanchos, involucoes, fatorial } from './juiz.js'

const guardadas = new Map()
function umaVez (k, fn) {
  if (!guardadas.has(k)) guardadas.set(k, fn())
  return guardadas.get(k)
}

/** As tres contagens e as duas identidades, de 1 a `ate`. */
export function conferencia (ate = 12, ateMontagem = 10) {
  return umaVez(`conf:${ate}:${ateMontagem}`, () => {
    const linhas = []
    for (let n = 1; n <= ate; n++) {
      const ps = particoes(n)
      let soma = 0n
      let somaQ = 0n
      let cantosIguaisGanchos = true
      let montados = null
      for (const l of ps) {
        const a = porCantos(l)
        if (a !== porGanchos(l)) cantosIguaisGanchos = false
        soma += a
        somaQ += a * a
      }
      if (n <= ateMontagem) { montados = 0; for (const l of ps) montados += monta(l) }
      linhas.push({
        n, formatos: ps.length, soma, involucoes: involucoes(n), somaQuadrados: somaQ,
        fatorial: fatorial(n), cantosIguaisGanchos, montados
      })
    }
    return linhas
  })
}

/** O formato de maior f, n a n. */
export function campeoes (ate = 24) {
  return umaVez(`camp:${ate}`, () => {
    const linhas = []
    for (let n = 1; n <= ate; n++) {
      let melhor = -1n
      let lista = []
      for (const l of particoes(n)) {
        const f = porGanchos(l)
        if (f > melhor) { melhor = f; lista = [l] } else if (f === melhor) lista.push(l)
      }
      const fat = fatorial(n)
      linhas.push({
        n,
        f: melhor,
        formatos: lista,
        sozinho: lista.length === 1,
        autoconjugado: lista.length === 1 && autoconjugada(lista[0]),
        parConjugado: lista.length === 2 && chave(conjugada(lista[0])) === chave(lista[1]),
        // f^2/n! em centesimos de porcento, truncado, calculado em BigInt.
        participacao: Number((melhor * melhor * 10000n) / fat) / 100
      })
    }
    return linhas
  })
}

/** A escada nos numeros triangulares: campea ou nao, e em que lugar. */
export function escadas (ateK = 8) {
  return umaVez(`esc:${ateK}`, () => {
    const linhas = []
    for (let k = 2; k <= ateK; k++) {
      const n = k * (k + 1) / 2
      const escada = []
      for (let i = k; i >= 1; i--) escada.push(i)
      const fe = porGanchos(escada)
      const ps = particoes(n)
      let melhor = -1n
      let campeao = null
      let lugar = 1
      for (const l of ps) {
        const f = porGanchos(l)
        if (f > melhor) { melhor = f; campeao = l }
        if (f > fe) lugar++
      }
      linhas.push({
        k, n, escada, fEscada: fe, campeao, fCampeao: melhor, lugar, formatos: ps.length,
        // Quanto o campeao passa a escada, em decimos de milesimo.
        razao: Number((melhor * 10000n) / fe) / 10000
      })
    }
    return linhas
  })
}
