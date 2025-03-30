[**fantom v1.0.0**](../../../README.md)

***

[fantom](../../../README.md) / [common/utils](../README.md) / calculateJaccardSimilarityScore

# Function: calculateJaccardSimilarityScore()

> **calculateJaccardSimilarityScore**(`query`, `item`, `corpusStats`): `number`

Defined in: [common/utils.ts:252](https://github.com/ispyhumanfly/fantom/blob/002f113e9685876d0f3f498ccd9514f78e641ee6/common/utils.ts#L252)

Calculates a Jaccard similarity score for a given query and item.

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

- The calculated Jaccard similarity score.

## Example

```ts
// Calculate a Jaccard similarity score with default corpus stats
const score = calculateJaccardSimilarityScore('search term', { name: 'example' }, defaultCorpusStats);

// Calculate a Jaccard similarity score with custom corpus stats
const score = calculateJaccardSimilarityScore('search term', { name: 'example', tags: ['tag1', 'tag2'] }, customCorpusStats);
```
