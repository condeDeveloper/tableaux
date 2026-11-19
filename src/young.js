// Quadros de Young padrao.
//
// Uma PARTICAO de n e uma lista nao crescente de inteiros positivos que soma n:
// (4, 2, 1) e uma particao de 7. O DIAGRAMA dela sao linhas de caixas, 4 na
// primeira, 2 na segunda, 1 na terceira, alinhadas a esquerda.
//
// Um QUADRO DE YOUNG PADRAO desse formato e o diagrama preenchido com 1, 2, ...,
// n, cada numero uma vez, crescendo da esquerda para a direita em cada linha e
// de cima para baixo em cada coluna. f^lambda e quantos quadros o formato tem.
//
// Tres jeitos de contar, e este projeto usa os tres:
//   - montar cada quadro, numero por numero (aqui);
//   - pela recursao dos cantos: o n esta sempre num canto, e tirando ele sobra
//     um quadro de tamanho n-1 (aqui);
//   - pela formula dos ganchos, que nao monta nada (no juiz).

/** As particoes de n, da maior para a menor em ordem lexicografica. */
export function particoes (n, teto = n) {
  const saida = []
  const anda = (resto, maximo, atual) => {
    if (resto === 0) { saida.push([...atual]); return }
    for (let p = Math.min(resto, maximo); p >= 1; p--) {
      atual.push(p)
      anda(resto - p, p, atual)
      atual.pop()
    }
  }
  anda(n, teto, [])
  return saida
}

/** A particao conjugada: as colunas viram linhas. */
export function conjugada (lambda) {
  if (lambda.length === 0) return []
  const saida = []
  for (let j = 0; j < lambda[0]; j++) saida.push(lambda.filter((v) => v > j).length)
  return saida
}

export function autoconjugada (lambda) {
  const c = conjugada(lambda)
  return c.length === lambda.length && c.every((v, i) => v === lambda[i])
}

export function chave (lambda) {
  return lambda.join(',')
}

/**
 * Os CANTOS do diagrama: as caixas que podem sair deixando um diagrama valido.
 * A ultima caixa de uma linha e canto quando a linha de baixo e mais curta.
 */
export function cantos (lambda) {
  const saida = []
  for (let i = 0; i < lambda.length; i++) {
    if (i === lambda.length - 1 || lambda[i + 1] < lambda[i]) saida.push(i)
  }
  return saida
}

/** Tira a ultima caixa da linha i. */
export function tiraCanto (lambda, i) {
  const r = [...lambda]
  r[i]--
  return r[i] === 0 ? r.slice(0, i) : r
}

/**
 * f^lambda pela recursao dos cantos, com memoria.
 *
 * O maior numero n de um quadro esta sempre num canto. Entao f^lambda e a soma,
 * sobre os cantos, de f do diagrama sem aquele canto.
 */
const memoria = new Map()
export function porCantos (lambda) {
  const n = lambda.reduce((s, v) => s + v, 0)
  if (n <= 1) return 1n
  const k = chave(lambda)
  if (memoria.has(k)) return memoria.get(k)
  let total = 0n
  for (const i of cantos(lambda)) total += porCantos(tiraCanto(lambda, i))
  memoria.set(k, total)
  return total
}

/**
 * Monta cada quadro do formato de verdade, numero por numero.
 *
 * O numero k entra numa caixa que tenha a de cima e a da esquerda ja ocupadas.
 * `visita` recebe uma COPIA do quadro pronto.
 */
export function monta (lambda, visita) {
  const n = lambda.reduce((s, v) => s + v, 0)
  const preenchido = lambda.map(() => 0)   // quantas caixas da linha ja tem numero
  const quadro = lambda.map((v) => new Array(v).fill(0))
  let quantos = 0
  const anda = (k) => {
    if (k > n) {
      quantos++
      if (visita) visita(quadro.map((l) => [...l]))
      return
    }
    for (let i = 0; i < lambda.length; i++) {
      const j = preenchido[i]
      if (j >= lambda[i]) continue
      if (i > 0 && preenchido[i - 1] <= j) continue   // a caixa de cima ainda vazia
      quadro[i][j] = k
      preenchido[i]++
      anda(k + 1)
      preenchido[i]--
      quadro[i][j] = 0
    }
  }
  anda(1)
  return quantos
}

/** O quadro e mesmo padrao? Linhas e colunas crescentes, 1..n uma vez cada. */
export function ehPadrao (quadro) {
  const vistos = new Set()
  let n = 0
  for (let i = 0; i < quadro.length; i++) {
    for (let j = 0; j < quadro[i].length; j++) {
      const v = quadro[i][j]
      n++
      vistos.add(v)
      if (j > 0 && quadro[i][j - 1] >= v) return false
      if (i > 0 && (quadro[i - 1].length <= j || quadro[i - 1][j] >= v)) return false
    }
  }
  if (vistos.size !== n) return false
  for (let v = 1; v <= n; v++) if (!vistos.has(v)) return false
  return true
}
