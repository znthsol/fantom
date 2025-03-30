[fantom - v1.0.0](../README.md) / components/Fantom.common

# Module: components/Fantom.common

## Table of contents

### Functions

- [loadFantomConfig](components_Fantom_common.md#loadfantomconfig)
- [validateSearchParams](components_Fantom_common.md#validatesearchparams)
- [parseScopedTags](components_Fantom_common.md#parsescopedtags)
- [formatSearchResults](components_Fantom_common.md#formatsearchresults)
- [getErrorMessage](components_Fantom_common.md#geterrormessage)
- [searchAndSortFromRedis](components_Fantom_common.md#searchandsortfromredis)

## Functions

### loadFantomConfig

▸ **loadFantomConfig**(): `any`

Loads and parses the Fantom configuration file.

#### Returns

`any`

The parsed configuration object.

**`Throws`**

If the configuration file cannot be loaded or parsed.

**`Example`**

```ts
// Load the Fantom configuration
const config = loadFantomConfig();
```

#### Defined in

[components/Fantom.common.ts:18](https://github.com/ispyhumanfly/fantom/blob/30ffb339eb87471c56aff9a36c00b63ecbbff2cc/components/Fantom.common.ts#L18)

___

### validateSearchParams

▸ **validateSearchParams**(`query`, `parameters`): `boolean`

Validates the search query parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` | The search query string. |
| `parameters` | `Object` | The search parameters object. |
| `parameters.type` | `string` | The type of search algorithm. |
| `parameters.tags` | `string`[] | The tags associated with the search. |

#### Returns

`boolean`

A boolean indicating if the parameters are valid.

**`Example`**

```ts
// Validate search parameters
const isValid = validateSearchParams('example query', { type: 'fuzzy', tags: ['tag1', 'tag2'] });
```

#### Defined in

[components/Fantom.common.ts:51](https://github.com/ispyhumanfly/fantom/blob/30ffb339eb87471c56aff9a36c00b63ecbbff2cc/components/Fantom.common.ts#L51)

___

### parseScopedTags

▸ **parseScopedTags**(`tags`): `Record`\<`string`, `string`[]\>

Parses scoped tags from the format "scope:value".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tags` | `string`[] | Array of tags, potentially in scoped format. |

#### Returns

`Record`\<`string`, `string`[]\>

Object with scopes as keys and values as arrays.

**`Example`**

```ts
// Parse scoped tags
const scopedTags = parseScopedTags(['scope1:value1', 'scope2:value2']);
```

#### Defined in

[components/Fantom.common.ts:83](https://github.com/ispyhumanfly/fantom/blob/30ffb339eb87471c56aff9a36c00b63ecbbff2cc/components/Fantom.common.ts#L83)

___

### formatSearchResults

▸ **formatSearchResults**(`results`, `query`): `object`

Formats search results for API response.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `results` | `any`[] | The raw search results. |
| `query` | `string` | The original query. |

#### Returns

`object`

Formatted results object.

**`Example`**

```ts
// Format search results
const formattedResults = formatSearchResults(rawResults, 'example query');
```

#### Defined in

[components/Fantom.common.ts:109](https://github.com/ispyhumanfly/fantom/blob/30ffb339eb87471c56aff9a36c00b63ecbbff2cc/components/Fantom.common.ts#L109)

___

### getErrorMessage

▸ **getErrorMessage**(`error`): `string`

Extracts error message from an error object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `unknown` | The error object. |

#### Returns

`string`

A string error message.

**`Example`**

```ts
// Get error message
const errorMessage = getErrorMessage(new Error('Example error'));
```

#### Defined in

[components/Fantom.common.ts:126](https://github.com/ispyhumanfly/fantom/blob/30ffb339eb87471c56aff9a36c00b63ecbbff2cc/components/Fantom.common.ts#L126)

___

### searchAndSortFromRedis

▸ **searchAndSortFromRedis**(`query`, `userId`, `algorithm`): `Promise`\<\{ `key`: `string` ; `value`: `any` ; `score`: `number`  }[]\>

Searches and sorts data from Redis based on a query.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` | The search query string. |
| `userId` | `string` | The user ID for algorithm selection. |
| `algorithm` | `string` | - |

#### Returns

`Promise`\<\{ `key`: `string` ; `value`: `any` ; `score`: `number`  }[]\>

Array of sorted search results.

**`Example`**

```ts
// Search and sort from Redis
const results = await searchAndSortFromRedis('example query', 'user123', config);
```

#### Defined in

[components/Fantom.common.ts:143](https://github.com/ispyhumanfly/fantom/blob/30ffb339eb87471c56aff9a36c00b63ecbbff2cc/components/Fantom.common.ts#L143)
