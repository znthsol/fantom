[**fantom v1.0.0**](../../../README.md)

***

[fantom](../../../README.md) / [common/utils](../README.md) / calculateTFIDFScore

# Function: calculateTFIDFScore()

> **calculateTFIDFScore**(`query`, `item`, `corpusStats`): `number`

Defined in: [common/utils.ts:200](https://github.com/ispyhumanfly/fantom/blob/002f113e9685876d0f3f498ccd9514f78e641ee6/common/utils.ts#L200)

Calculates a TF-IDF score for a given query and item.

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

- The calculated TF-IDF score.

## Example

```ts
// Calculate a TF-IDF score with default corpus stats
const score = calculateTFIDFScore('search term', { name: 'example' }, defaultCorpusStats);

// Calculate a TF-IDF score with custom corpus stats
const score = calculateTFIDFScore('search term', { name: 'example', tags: ['tag1', 'tag2'] }, customCorpusStats);
```
