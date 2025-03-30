[**fantom v1.0.0**](../../../README.md)

***

[fantom](../../../README.md) / [common/openai](../README.md) / GPT

# Function: GPT()

> **GPT**(`params`): `Promise`\<`string`\>

Defined in: [common/openai.ts:16](https://github.com/ispyhumanfly/fantom/blob/e7920176802f84bedc42f01e77d9e82bb3e8e1cb/common/openai.ts#L16)

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
