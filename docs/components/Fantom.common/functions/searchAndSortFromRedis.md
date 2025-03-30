[**fantom v1.0.0**](../../../README.md)

***

[fantom](../../../README.md) / [components/Fantom.common](../README.md) / searchAndSortFromRedis

# Function: searchAndSortFromRedis()

> **searchAndSortFromRedis**(`query`, `userId`, `config`): `Promise`\<`object`[]\>

Defined in: [components/Fantom.common.ts:143](https://github.com/ispyhumanfly/fantom/blob/e7920176802f84bedc42f01e77d9e82bb3e8e1cb/components/Fantom.common.ts#L143)

Searches and sorts data from Redis based on a query.

## Parameters

### query

`string`

The search query string.

### userId

`string`

The user ID for algorithm selection.

### config

`any`

The Fantom configuration object.

## Returns

`Promise`\<`object`[]\>

Array of sorted search results.

## Example

```ts
// Search and sort from Redis
const results = await searchAndSortFromRedis('example query', 'user123', config);
```
