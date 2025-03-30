[fantom - v1.0.0](../README.md) / common/openai

# Module: common/openai

## Table of contents

### Functions

- [GPT](common_openai.md#gpt)

## Functions

### GPT

▸ **GPT**(`params`): `Promise`\<`string`\>

Invokes OpenAI's GPT models through their API.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | Parameters for the GPT model invocation |
| `params.version?` | ``"o1"`` \| ``"o1-preview"`` \| ``"o1-mini"`` \| ``"gpt-4o"`` \| ``"gpt-4o-mini"`` \| ``"gpt-4-turbo"`` \| ``"gpt-4"`` \| ``"gpt-3.5-turbo"`` | Optional GPT model version to use. Defaults to 'gpt-4o-mini' |
| `params.instructions` | `string` | System instructions/prompt for GPT |
| `params.inputText` | `string` | The user input text to process |

#### Returns

`Promise`\<`string`\>

Promise resolving to GPT's response text

#### Defined in

[common/openai.ts:16](https://github.com/ispyhumanfly/fantom/blob/30ffb339eb87471c56aff9a36c00b63ecbbff2cc/common/openai.ts#L16)
