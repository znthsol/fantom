[**fantom v1.0.0**](../../../README.md)

***

[fantom](../../../README.md) / [common/utils](../README.md) / calculateCosineSimilarityScore

# Function: calculateCosineSimilarityScore()

> **calculateCosineSimilarityScore**(`query`, `item`, `corpusStats`): `number`

Defined in: [common/utils.ts:227](https://github.com/ispyhumanfly/fantom/blob/e7920176802f84bedc42f01e77d9e82bb3e8e1cb/common/utils.ts#L227)

Calculates a cosine similarity score for a given query and item.

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

- The calculated cosine similarity score.

## Example

```ts
// Calculate a cosine similarity score with default corpus stats
const score = calculateCosineSimilarityScore('search term', { key: 'example' }, defaultCorpusStats);

// Calculate a cosine similarity score with custom corpus stats
const score = calculateCosineSimilarityScore('search term', { key: 'example', tags: ['tag1', 'tag2'] }, customCorpusStats);
```
