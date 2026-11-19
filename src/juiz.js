// O juiz. Caminhos que nao passam pela recursao dos cantos.
//
// 1. `porGanchos` — a formula dos ganchos: f^lambda = n! dividido pelo produto
//    dos ganchos. O gancho de uma caixa e ela mesma mais as caixas a direita na
//    linha e abaixo na coluna. Nenhuma busca, nenhuma recursao.
//
// 2. `involucoes` — a soma de f^lambda sobre todos os formatos de n e o numero
//    de involucoes de n (permutacoes que sao a propria inversa), que tem
//    recorrencia propria: I(n) = I(n-1) + (n-1) I(n-2).
//
// 3. `fatorial` — a soma de (f^lambda)^2 sobre todos os formatos e n!, pela
//    correspondencia de Robinson-Schensted.

export function fatorial (n) {
  let r = 1n
  for (let i = 2n; i <= BigInt(n); i++) r *= i
  return r
}

/** Os ganchos de cada caixa do diagrama. */
export function ganchos (lambda) {
  const colunas = []
  for (let j = 0; j < (lambda[0] || 0); j++) colunas.push(lambda.filter((v) => v > j).length)
  return lambda.map((linha, i) => {
    const g = []
    for (let j = 0; j < linha; j++) g.push((linha - j - 1) + (colunas[j] - i - 1) + 1)
    return g
  })
}

/** f^lambda pela formula dos ganchos. */
export function porGanchos (lambda) {
  const n = lambda.reduce((s, v) => s + v, 0)
  let produto = 1n
  for (const linha of ganchos(lambda)) for (const h of linha) produto *= BigInt(h)
  const f = fatorial(n)
  if (f % produto !== 0n) throw new Error(`os ganchos nao dividem n! em ${lambda}`)
  return f / produto
}

/** O numero de involucoes de n, pela recorrencia. */
export function involucoes (n) {
  let a = 1n
  let b = 1n
  if (n === 0) return 1n
  for (let k = 2; k <= n; k++) {
    const c = b + BigInt(k - 1) * a
    a = b
    b = c
  }
  return b
}

/** Uma involucao e uma permutacao que e a propria inversa: confere no braco. */
export function contaInvolucoesNoBraco (n) {
  const a = []
  for (let i = 0; i < n; i++) a.push(i)
  let total = 0
  const permuta = (k) => {
    if (k === n) {
      let ok = true
      for (let i = 0; i < n; i++) if (a[a[i]] !== i) { ok = false; break }
      if (ok) total++
      return
    }
    for (let i = k; i < n; i++) {
      let t = a[k]; a[k] = a[i]; a[i] = t
      permuta(k + 1)
      t = a[k]; a[k] = a[i]; a[i] = t
    }
  }
  permuta(0)
  return total
}
