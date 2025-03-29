[**fantom v1.0.0**](../../../README.md)

***

[fantom](../../../modules.md) / [common/openai](../README.md) / GPT

# Function: GPT()

> **GPT**(`params`): `Promise`\<`string`\>

Defined in: [common/openai.ts:18](https://github.com/ispyhumanfly/fantom/blob/5e71c4810da61962efdba48a40a0ad9a0b820847/common/openai.ts#L18)

Invokes OpenAI's GPT models through their API.

## Parameters

### params

Parameters for the GPT model invocation

#### version?

`"o1"` \| `"o1-preview"` \| `"o1-mini"` \| `"gpt-4o"` \| `"gpt-4o-mini"` \| `"gpt-4-turbo"` \| `"gpt-4"` \| `"gpt-3.5-turbo"`

Optional GPT model version to use. Defaults to 'gpt-4o-mini'

#### instructions

`string`

System instructions/prompt for GPT

#### inputText

`string`

The user input text to process

## Returns

`Promise`\<`string`\>

Promise resolving to GPT's response text
