[**fantom v1.0.0**](../../../README.md)

***

[fantom](../../../README.md) / [components/Fantom.common](../README.md) / validateSearchParams

# Function: validateSearchParams()

> **validateSearchParams**(`query`, `parameters`): `boolean`

Defined in: [components/Fantom.common.ts:51](https://github.com/ispyhumanfly/fantom/blob/e7920176802f84bedc42f01e77d9e82bb3e8e1cb/components/Fantom.common.ts#L51)

Validates the search query parameters.

## Parameters

### query

`string`

The search query string.

### parameters

The search parameters object.

#### type

`string`

The type of search algorithm.

#### tags

`string`[]

The tags associated with the search.

## Returns

`boolean`

A boolean indicating if the parameters are valid.

## Example

```ts
// Validate search parameters
const isValid = validateSearchParams('example query', { type: 'fuzzy', tags: ['tag1', 'tag2'] });
```
