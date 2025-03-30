import * as dotenv from 'dotenv'
import OpenAI from 'openai'

dotenv.config()

const client = new OpenAI()

/**
 * Invokes OpenAI's GPT models through their API.
 * @param {object} params - Parameters for the GPT model invocation
 * @param {('gpt-3.5-turbo'|'gpt-4'|'gpt-4-turbo'|'gpt-4o'|'gpt-4o-mini'|'o1-preview'|'o1-mini'|'o1')} [params.version] - Optional GPT model version to use. Defaults to 'gpt-4o-mini'
 * @param {string} params.instructions - System instructions/prompt for GPT
 * @param {string} params.inputText - The user input text to process
 * @returns {Promise<string>} Promise resolving to GPT's response text
 */
export async function GPT(params: {
    version?: 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-turbo' | 'gpt-4o' | 'gpt-4o-mini' | 'o1-preview' | 'o1-mini' | 'o1'
    instructions: string
    inputText: string
}): Promise<string> {
    if (!params.version) {
        params.version = 'gpt-4o-mini' //cheapest
    }

    const body: OpenAI.Chat.ChatCompletionCreateParams = {
        messages: [
            {
                role: 'user',
                content: `${params.instructions}. Here is the question: ${params.inputText}`
            }
        ],
        model: `${params.version}`
    }
    const chatCompletion: OpenAI.Chat.ChatCompletion = await client.chat.completions.create(body)

    return chatCompletion.choices[0]?.message?.content || ''
}
