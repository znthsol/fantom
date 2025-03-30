[**fantom v1.0.0**](../../../README.md)

***

[fantom](../../../README.md) / [common/utils](../README.md) / calculateScore

# Function: calculateScore()

> **calculateScore**(`query`, `item`, `algorithm`): `number`

Defined in: [common/utils.ts:25](https://github.com/ispyhumanfly/fantom/blob/002f113e9685876d0f3f498ccd9514f78e641ee6/common/utils.ts#L25)

Calculates a score for a given query and item using the specified algorithm.

## Parameters

### query

`string`

The search query.

### item

`any`

The item to score against the query.

### algorithm

The algorithm to use for scoring.

`"fuzzy"` | `"bm25"` | `"tfidf"` | `"cosine"` | `"jaccard"`

## Returns

`number`

- The calculated score.

## Example

```ts
// Calculate a fuzzy score
const score = calculateScore('search term', { name: 'example' }, 'fuzzy');

// Calculate a BM25 score
const score = calculateScore('search term', { name: 'example' }, 'bm25');
```
