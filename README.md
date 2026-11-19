# Quadros de Young

Quadros de Young padrão montados um a um e contados por três caminhos, em Node puro, sem dependência nenhuma.

Uma **partição** de n é uma lista não crescente de inteiros que soma n — (4, 2, 1) é uma partição de 7. O **diagrama** dela são linhas de caixas alinhadas à esquerda: 4, depois 2, depois 1. Um **quadro de Young padrão** é o diagrama preenchido com 1, 2, …, n, crescendo nas linhas e nas colunas. `f^λ` é quantos quadros o formato tem.

```
 1  2  3      1  2  4      1  3  5
 4  5         3  5         2  4
 6            6            6          ... são 16 quadros de formato (3,2,1)
```

---

## Os quatro achados

**1. A escada é a campeã nos triangulares — até o 21.** Entre todos os formatos de n, o de maior `f` é a escada (2,1), (3,2,1), (4,3,2,1), (5,4,3,2,1) em n = 3, 6, 10 e 15. Em **n=21** a escada (6,5,4,3,2,1) cai para **segundo lugar entre 792 formatos**: o campeão é (7,5,3,2,2,1,1), que a passa por 1,65%. Daí ela desaba: 5ª de 3.718 em n=28, **37ª de 17.977 em n=36**, com o campeão 40% acima.

**2. O campeão é sempre um formato autoconjugado sozinho ou um par conjugado.** Em todas as 24 ordens medidas. Um formato e o seu conjugado (linhas viram colunas) têm o mesmo `f`, então um campeão que não fosse autoconjugado teria de vir em par — e a medida confirma que não existe nenhum terceiro caso. Sozinho em n = 1, 3, 5, 6, 8, 10, 12, 15, 17, 21 e 23; em par nas outras treze.

**3. O campeão leva uma fatia cada vez menor de n!, mas não sempre.** Pela correspondência de Robinson-Schensted, `f²/n!` é a fração das permutações cujo par de quadros tem aquele formato. Ela vai de 66,66% em n=3 a 2,22% em n=24 — e **sobe** em alguns degraus: de 30% em n=5 para 35,55% em n=6.

**4. Três caminhos, nenhum desacordo.** A recursão dos cantos, a fórmula dos ganchos e a montagem quadro a quadro dão o mesmo `f` em todo formato de 1 a 12, e as somas fecham nas duas identidades: `Σf = involuções de n` e `Σf² = n!`. A montagem constrói os **140.152** quadros de n=12 um por um.

---

## Os três caminhos

**Pelos cantos.** O maior número de um quadro está sempre num canto do diagrama. Tirando ele, sobra um quadro de tamanho n−1. Então `f^λ` é a soma de `f` dos diagramas sem cada canto — com memória.

**Montando.** O número k entra numa caixa cuja vizinha de cima e da esquerda já estão ocupadas. Cada quadro é construído e conferido pela definição.

**Pelos ganchos.** O gancho de uma caixa é ela mais as caixas à direita na linha e abaixo na coluna. `f^λ = n! / ∏ ganchos`. Nenhuma busca.

---

## As tabelas

Todos os números saem de `node ferramentas/medidor.js` e estão presos em `testes/`.

### A escada nos triangulares

| n | escada | lugar | campeão | campeão ÷ escada |
| --- | --- | --- | --- | --- |
| 3 | (2,1) | **1º** | a escada | 1 |
| 6 | (3,2,1) | **1º** | a escada | 1 |
| 10 | (4,3,2,1) | **1º** | a escada | 1 |
| 15 | (5,4,3,2,1) | **1º** | a escada | 1 |
| 21 | (6,5,4,3,2,1) | 2º de 792 | (7,5,3,2,2,1,1) | 1,0165 |
| 28 | (7,6,5,4,3,2,1) | 5º de 3.718 | (8,6,5,3,2,2,1,1) | 1,1813 |
| 36 | (8,7,6,5,4,3,2,1) | 37º de 17.977 | (9,7,6,4,3,3,2,1,1) | 1,4003 |

### O campeão, n a n

| n | maior f | formato(s) | f²/n! |
| --- | --- | --- | --- |
| 3 | 2 | (2,1) | 66,66% |
| 5 | 6 | (3,1,1) | 30,00% |
| 6 | 16 | (3,2,1) | 35,55% |
| 10 | 768 | (4,3,2,1) | 16,25% |
| 12 | 7.700 | (5,3,2,1,1) | 12,37% |
| 15 | 292.864 | (5,4,3,2,1) | 6,55% |
| 21 | 1.118.939.184 | (7,5,3,2,2,1,1) | 2,45% |
| 24 | 117.487.079.424 | (8,5,4,3,2,1,1) e (7,5,4,3,2,1,1,1) | 2,22% |

As porcentagens são truncadas na segunda casa, calculadas em `BigInt`.

### As identidades

| n | formatos | Σf (= involuções) | montados um a um |
| --- | --- | --- | --- |
| 6 | 11 | 76 | 76 |
| 8 | 22 | 764 | 764 |
| 10 | 42 | 9.496 | 9.496 |
| 12 | 77 | 140.152 | 140.152 |

E `Σf² = n!` em todas as ordens de 1 a 12.

---

## Os juízes

**A fórmula dos ganchos** não busca nada e concorda com a recursão dos cantos em todo formato de 1 a 12.

**As involuções** — permutações que são a própria inversa — têm recorrência própria, `I(n) = I(n−1) + (n−1)·I(n−2)`, e essa recorrência é conferida contra a contagem no braço, permutação por permutação, até n=8. A soma de `f` tem de bater com ela, e bate.

**`Σf² = n!`** confere a distribuição inteira e não só o total. Com controle negativo: somar `f` em vez de `f²` não dá n!, e o teste exige que não dê.

---

## O que as medidas me corrigiram

Nada quebrou neste projeto: os três caminhos e as duas identidades concordaram de primeira, e não vou inventar um erro para preencher a seção.

O achado da escada não veio de uma aposta. Montei a tabela dos campeões para conferir que eles eram sempre autoconjugados ou pares, vi a escada nos triangulares até o 15, e o n=21 apareceu com outro formato. Fui conferir em separado — lugar, razão, os triangulares seguintes — e é daí que sai a tabela. Não escrevi previsão antes, então não conto como acerto nem como erro.

---

## Como usar

Node 20 ou mais novo. Sem dependência.

```bash
npm test
npm run medir
node ferramentas/medidor.js escadas
node exemplos/uso.js 3 2 1
```

```js
import { porGanchos, porCantos, monta } from 'tableaux'

porGanchos([6, 5, 4, 3, 2, 1])   // 1100742656n
porGanchos([7, 5, 3, 2, 2, 1, 1])   // 1118939184n
```

## Os arquivos

- `src/young.js` — partições, conjugada, cantos, a recursão e a montagem.
- `src/juiz.js` — a fórmula dos ganchos, as involuções e n!.
- `src/medidas.js` — as tabelas do README, cada uma calculada uma vez só.
- `src/index.js` — a porta de entrada do pacote.
- `exemplos/uso.js` — o pacote em uso.
- `ferramentas/medidor.js` — imprime as tabelas.
- `testes/` — 22 testes, com os números do README presos.

## Licença

MIT.
