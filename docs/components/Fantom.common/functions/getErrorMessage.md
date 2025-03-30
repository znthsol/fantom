[**fantom v1.0.0**](../../../README.md)

***

[fantom](../../../README.md) / [components/Fantom.common](../README.md) / getErrorMessage

# Function: getErrorMessage()

> **getErrorMessage**(`error`): `string`

Defined in: [components/Fantom.common.ts:126](https://github.com/ispyhumanfly/fantom/blob/e7920176802f84bedc42f01e77d9e82bb3e8e1cb/components/Fantom.common.ts#L126)

Extracts error message from an error object.

## Parameters

### error

`unknown`

The error object.

## Returns

`string`

A string error message.

## Example

```ts
// Get error message
const errorMessage = getErrorMessage(new Error('Example error'));
```
