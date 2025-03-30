[fantom - v1.0.0](../README.md) / common/utils

# Module: common/utils

## Table of contents

### Interfaces

- [CorpusStats](../interfaces/common_utils.CorpusStats.md)
- [SearchResult](../interfaces/common_utils.SearchResult.md)

### Functions

- [calculateScore](common_utils.md#calculatescore)
- [calculateFuzzyScore](common_utils.md#calculatefuzzyscore)
- [calculateBM25Score](common_utils.md#calculatebm25score)
- [calculateTFIDFScore](common_utils.md#calculatetfidfscore)
- [calculateCosineSimilarityScore](common_utils.md#calculatecosinesimilarityscore)
- [calculateJaccardSimilarityScore](common_utils.md#calculatejaccardsimilarityscore)
- [reRanker](common_utils.md#reranker)

## Functions

### calculateScore

▸ **calculateScore**(`query`, `item`, `algorithm`): `number`

Calculates a score for a given query and item using the specified algorithm.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` | The search query. |
| `item` | `any` | The item to score against the query. |
| `algorithm` | ``"fuzzy"`` \| ``"bm25"`` \| ``"tfidf"`` \| ``"cosine"`` \| ``"jaccard"`` | The algorithm to use for scoring. |

#### Returns

`number`

- The calculated score.

**`Example`**

```ts
// Calculate a fuzzy score
const score = calculateScore('search term', { name: 'example' }, 'fuzzy');

// Calculate a BM25 score
const score = calculateScore('search term', { name: 'example' }, 'bm25');
```

#### Defined in

[common/utils.ts:25](https://github.com/ispyhumanfly/fantom/blob/30ffb339eb87471c56aff9a36c00b63ecbbff2cc/common/utils.ts#L25)

___

### calculateFuzzyScore

▸ **calculateFuzzyScore**(`query`, `item`, `corpusStats`): `number`

Calculates a fuzzy score for a given query and item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` | The search query. |
| `item` | `any` | The item to score against the query. |
| `corpusStats` | [`CorpusStats`](../interfaces/common_utils.CorpusStats.md) | The corpus statistics. |

#### Returns

`number`

- The calculated fuzzy score.

**`Example`**

```ts
// Calculate a fuzzy score with default corpus stats
const score = calculateFuzzyScore('search term', { name: 'example' }, defaultCorpusStats);

// Calculate a fuzzy score with custom corpus stats
const score = calculateFuzzyScore('search term', { name: 'example', tags: ['tag1', 'tag2'] }, customCorpusStats);
```

#### Defined in

[common/utils.ts:70](https://github.com/ispyhumanfly/fantom/blob/30ffb339eb87471c56aff9a36c00b63ecbbff2cc/common/utils.ts#L70)

___

### calculateBM25Score

▸ **calculateBM25Score**(`query`, `item`, `corpusStats`): `number`

Calculates a BM25 score for a given query and item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` | The search query. |
| `item` | `any` | The item to score against the query. |
| `corpusStats` | [`CorpusStats`](../interfaces/common_utils.CorpusStats.md) | The corpus statistics. |

#### Returns

`number`

- The calculated BM25 score.

**`Example`**

```ts
// Calculate a BM25 score with default corpus stats
const score = calculateBM25Score('search term', { name: 'example' }, defaultCorpusStats);

// Calculate a BM25 score with custom corpus stats
const score = calculateBM25Score('search term', { name: 'example', tags: ['tag1', 'tag2'] }, customCorpusStats);
```

#### Defined in

[common/utils.ts:129](https://github.com/ispyhumanfly/fantom/blob/30ffb339eb87471c56aff9a36c00b63ecbbff2cc/common/utils.ts#L129)

___

### calculateTFIDFScore

▸ **calculateTFIDFScore**(`query`, `item`, `corpusStats`): `number`

Calculates a TF-IDF score for a given query and item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` | The search query. |
| `item` | `any` | The item to score against the query. |
| `corpusStats` | [`CorpusStats`](../interfaces/common_utils.CorpusStats.md) | The corpus statistics. |

#### Returns

`number`

- The calculated TF-IDF score.

**`Example`**

```ts
// Calculate a TF-IDF score with default corpus stats
const score = calculateTFIDFScore('search term', { name: 'example' }, defaultCorpusStats);

// Calculate a TF-IDF score with custom corpus stats
const score = calculateTFIDFScore('search term', { name: 'example', tags: ['tag1', 'tag2'] }, customCorpusStats);
```

#### Defined in

[common/utils.ts:200](https://github.com/ispyhumanfly/fantom/blob/30ffb339eb87471c56aff9a36c00b63ecbbff2cc/common/utils.ts#L200)

___

### calculateCosineSimilarityScore

▸ **calculateCosineSimilarityScore**(`query`, `item`, `corpusStats`): `number`

Calculates a cosine similarity score for a given query and item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` | The search query. |
| `item` | `any` | The item to score against the query. |
| `corpusStats` | [`CorpusStats`](../interfaces/common_utils.CorpusStats.md) | The corpus statistics. |

#### Returns

`number`

- The calculated cosine similarity score.

**`Example`**

```ts
// Calculate a cosine similarity score with default corpus stats
const score = calculateCosineSimilarityScore('search term', { key: 'example' }, defaultCorpusStats);

// Calculate a cosine similarity score with custom corpus stats
const score = calculateCosineSimilarityScore('search term', { key: 'example', tags: ['tag1', 'tag2'] }, customCorpusStats);
```

#### Defined in

[common/utils.ts:227](https://github.com/ispyhumanfly/fantom/blob/30ffb339eb87471c56aff9a36c00b63ecbbff2cc/common/utils.ts#L227)

___

### calculateJaccardSimilarityScore

▸ **calculateJaccardSimilarityScore**(`query`, `item`, `corpusStats`): `number`

Calculates a Jaccard similarity score for a given query and item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` | The search query. |
| `item` | `any` | The item to score against the query. |
| `corpusStats` | [`CorpusStats`](../interfaces/common_utils.CorpusStats.md) | The corpus statistics. |

#### Returns

`number`

- The calculated Jaccard similarity score.

**`Example`**

```ts
// Calculate a Jaccard similarity score with default corpus stats
const score = calculateJaccardSimilarityScore('search term', { name: 'example' }, defaultCorpusStats);

// Calculate a Jaccard similarity score with custom corpus stats
const score = calculateJaccardSimilarityScore('search term', { name: 'example', tags: ['tag1', 'tag2'] }, customCorpusStats);
```

#### Defined in

[common/utils.ts:252](https://github.com/ispyhumanfly/fantom/blob/30ffb339eb87471c56aff9a36c00b63ecbbff2cc/common/utils.ts#L252)

___

### reRanker

▸ **reRanker**(`query`, `results`): `Promise`\<[`SearchResult`](../interfaces/common_utils.SearchResult.md)[]\>

Re-ranks search results based on a query using GPT-4o.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` | The search query. |
| `results` | [`SearchResult`](../interfaces/common_utils.SearchResult.md)[] | The search results to re-rank. |

#### Returns

`Promise`\<[`SearchResult`](../interfaces/common_utils.SearchResult.md)[]\>

- The re-ranked search results.

**`Example`**

```ts
// Re-rank search results
const reRankedResults = await reRanker('search term', searchResults);

// Re-rank search results with different query
const reRankedResults = await reRanker('another search term', searchResults);
```

#### Defined in

[common/utils.ts:280](https://github.com/ispyhumanfly/fantom/blob/30ffb339eb87471c56aff9a36c00b63ecbbff2cc/common/utils.ts#L280)
