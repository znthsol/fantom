[**fantom v1.0.0**](../../../README.md)

***

[fantom](../../../README.md) / [common/utils](../README.md) / reRanker

# Function: reRanker()

> **reRanker**(`query`, `results`): `Promise`\<[`SearchResult`](../interfaces/SearchResult.md)[]\>

Defined in: [common/utils.ts:280](https://github.com/ispyhumanfly/fantom/blob/e7920176802f84bedc42f01e77d9e82bb3e8e1cb/common/utils.ts#L280)

Re-ranks search results based on a query using GPT-4o.

## Parameters

### query

`string`

The search query.

### results

[`SearchResult`](../interfaces/SearchResult.md)[]

The search results to re-rank.

## Returns

`Promise`\<[`SearchResult`](../interfaces/SearchResult.md)[]\>

- The re-ranked search results.

## Example

```ts
// Re-rank search results
const reRankedResults = await reRanker('search term', searchResults);

// Re-rank search results with different query
const reRankedResults = await reRanker('another search term', searchResults);
```
