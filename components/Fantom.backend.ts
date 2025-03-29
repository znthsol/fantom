import Router from '@koa/router';
import { validateSearchParams, parseScopedTags, formatSearchResults, getErrorMessage, loadFantomConfig } from './Fantom.utils';
import { config } from 'dotenv';
import { createClient } from '@redis/client';
import { caclulateScore } from './Fantom.utils';

config();

const router = new Router();


router.post('/v1/search/:user_id', async (ctx) => {
    const { user_id } = ctx.params;
    const { query, parameters = { type: '', tags: [] } } = (ctx.request as any).body;
    const config = loadFantomConfig();

    // Check if API key is provided
    const apiKey = ctx.request.headers['x-api-key'] as string;
    
    if (!apiKey) {
        ctx.status = 401;
        ctx.body = { error: 'API key is required' };
        return;
    }
    
    // TODO: Replace with actual API key validation logic
    const isValidApiKey = apiKey === config.users.find(user => user.id === user_id)?.api_key || process.env.FANTOM_API_KEY;
    
    if (!isValidApiKey) {
        ctx.status = 403;
        ctx.body = { error: 'Invalid API key' };
        return;
    }

    if (!validateSearchParams(query, parameters)) {
        ctx.status = 400;
        ctx.body = { error: 'Invalid search parameters' };
        return;
    }

    try {
        // Connect to Redis database 15 for search
        const client = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
            database: 5
        });
        await client.connect();
        
        // Perform fuzzy search on all values in Redis
        const keys = await client.keys('*');
        console.log("Keys:", keys);
        const allValues = [];
        
        for (const key of keys) {
            const value = await client.get(key);
            try {
                const parsedValue = JSON.parse(value);
                const score = caclulateScore(query, parsedValue, config.users.find(user => user.user_id === user_id)?.algorithm || "bm25");

                console.log("Score:", score);

                allValues.push({ key, value: parsedValue, score });
            } catch (e) {
                console.log("Error:", e);
                continue;
            }
        }
        
        const results = allValues.sort((a, b) => b.score - a.score).slice(0, 10).map(item => item).filter(item => item.score > 0);
          
        await client.disconnect();

        // Summarize results using Hugging Face inference with Gemma model
        // if (results.length > 0) {

        //     console.log("Results:", results);

        //     try {
        //         // Prepare the data to send to Gemma
        //         const resultsText = results.map(result => 
        //             JSON.stringify(result, null, 4)
        //         ).join('\n\n');

        //         // Import HuggingFace inference
        //         const { HfInference } = require('@huggingface/inference');
                
        //         // Initialize the HuggingFace client with API key from environment variables
        //         const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);
                
        //         // Construct the prompt for Gemma
        //         const prompt = `Summarize the following search results for the query "${query}":\n\n${resultsText}`;
                
        //         // Call the Llama model using HuggingFace inference
        //         const response = await hf.textGeneration({
        //             model: "google/gemma-2b",
        //             inputs: prompt,
        //             parameters: {
        //                 max_new_tokens: 3000,
        //                 // temperature: 0.7,
        //                 // top_p: 0.95,
        //                 // repetition_penalty: 1.2
        //             }
        //         });
                
        //         console.log("HuggingFace Gemma Response:", response);
                
        //         // Add the summary to each result
        //         results.forEach(result => {
        //             result.summary = response.generated_text;
        //         });
        //     }
        //     catch (error) {
        //         console.error('Error summarizing results:', error);
        //     }
        // }

        // Use GPT-4o to re-sort results based on user intent
        if (results.length > 0) {
            try {
                // Import the GPT function from our openai utility
                const { GPT } = require('../common/openai');
                
                // Prepare the results data for GPT
                const resultsText = JSON.stringify(results, null, 2);
                
                // Create instructions for GPT to understand the task
                const instructions = `You are an intelligent search assistant. I have search results for the query "${query}". 
                Please analyze these results and re-rank them based on what you believe the user is truly looking for. 
                Consider relevance, quality, and user intent. Return only a JSON array of indices representing the new order. Raw json, not markdown.`;
                
                // Call GPT-4o to analyze and re-sort the results
                const gptResponse = await GPT({
                    version: 'gpt-4o',
                    instructions: instructions,
                    inputText: resultsText
                });

                console.log("GPT Response:", gptResponse);
                
                // Parse the response to get the new order
                try {
                    const newOrder = JSON.parse(gptResponse);
                    
                    // Validate that the response is an array of indices
                    if (Array.isArray(newOrder) && newOrder.every(idx => typeof idx === 'number' && idx >= 0 && idx < results.length)) {
                        // Re-order the results based on GPT's suggestion
                        const reorderedResults = newOrder.map(index => results[index]);
                        results.splice(0, results.length, ...reorderedResults);
                    }
                } catch (parseError) {
                    console.error('Error parsing GPT response:', parseError);
                    // Continue with original results if parsing fails
                }
            } catch (error) {
                console.error('Error using GPT to re-sort results:', error);
                // Continue with original results if GPT processing fails
            }
        }
        
        ctx.body = {
            query,
            count: results.length,
            results
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: getErrorMessage(error) };
    }
});

export default router.routes();
