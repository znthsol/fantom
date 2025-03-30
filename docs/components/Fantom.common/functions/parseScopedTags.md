[**fantom v1.0.0**](../../../README.md)

***

[fantom](../../../README.md) / [components/Fantom.common](../README.md) / parseScopedTags

# Function: parseScopedTags()

> **parseScopedTags**(`tags`): `Record`\<`string`, `string`[]\>

Defined in: [components/Fantom.common.ts:83](https://github.com/ispyhumanfly/fantom/blob/e7920176802f84bedc42f01e77d9e82bb3e8e1cb/components/Fantom.common.ts#L83)

Parses scoped tags from the format "scope:value".

## Parameters

### tags

`string`[]

Array of tags, potentially in scoped format.

## Returns

`Record`\<`string`, `string`[]\>

Object with scopes as keys and values as arrays.

## Example

```ts
// Parse scoped tags
const scopedTags = parseScopedTags(['scope1:value1', 'scope2:value2']);
```
