[**fantom v1.0.0**](../../../README.md)

***

[fantom](../../../README.md) / [components/Fantom.common](../README.md) / formatSearchResults

# Function: formatSearchResults()

> **formatSearchResults**(`results`, `query`): `object`

Defined in: [components/Fantom.common.ts:109](https://github.com/ispyhumanfly/fantom/blob/e7920176802f84bedc42f01e77d9e82bb3e8e1cb/components/Fantom.common.ts#L109)

Formats search results for API response.

## Parameters

### results

`any`[]

The raw search results.

### query

`string`

The original query.

## Returns

`object`

Formatted results object.

## Example

```ts
// Format search results
const formattedResults = formatSearchResults(rawResults, 'example query');
```
