[**fantom v1.0.0**](../../../README.md)

***

[fantom](../../../README.md) / [common/utils](../README.md) / calculateBM25Score

# Function: calculateBM25Score()

> **calculateBM25Score**(`query`, `item`, `corpusStats`): `number`

Defined in: [common/utils.ts:129](https://github.com/ispyhumanfly/fantom/blob/002f113e9685876d0f3f498ccd9514f78e641ee6/common/utils.ts#L129)

Calculates a BM25 score for a given query and item.

## Parameters

### query

`string`

The search query.

### item

`any`

The item to score against the query.

### corpusStats

[`CorpusStats`](../interfaces/CorpusStats.md)

The corpus statistics.

## Returns

`number`

- The calculated BM25 score.

## Example

```ts
// Calculate a BM25 score with default corpus stats
const score = calculateBM25Score('search term', { name: 'example' }, defaultCorpusStats);

// Calculate a BM25 score with custom corpus stats
const score = calculateBM25Score('search term', { name: 'example', tags: ['tag1', 'tag2'] }, customCorpusStats);
```
