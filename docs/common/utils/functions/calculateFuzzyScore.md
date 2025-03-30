[**fantom v1.0.0**](../../../README.md)

***

[fantom](../../../README.md) / [common/utils](../README.md) / calculateFuzzyScore

# Function: calculateFuzzyScore()

> **calculateFuzzyScore**(`query`, `item`, `corpusStats`): `number`

Defined in: [common/utils.ts:70](https://github.com/ispyhumanfly/fantom/blob/e7920176802f84bedc42f01e77d9e82bb3e8e1cb/common/utils.ts#L70)

Calculates a fuzzy score for a given query and item.

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

- The calculated fuzzy score.

## Example

```ts
// Calculate a fuzzy score with default corpus stats
const score = calculateFuzzyScore('search term', { name: 'example' }, defaultCorpusStats);

// Calculate a fuzzy score with custom corpus stats
const score = calculateFuzzyScore('search term', { name: 'example', tags: ['tag1', 'tag2'] }, customCorpusStats);
```
