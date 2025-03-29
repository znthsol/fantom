import Router from '@koa/router';
import { validateSearchParams, parseScopedTags, formatSearchResults, getErrorMessage, loadFantomConfig } from './Fantom.utils';
import { config } from 'dotenv';
import { createClient } from '@redis/client';

config();

const router = new Router();

interface CorpusStats {
    totalDocuments: number;
    avgFieldLength: number;
    termFrequencies: Map<string, number>;
    fieldWeights: Record<string, number>;
}

function caclulateScore(query: string, item: any, algorithm: 'fuzzy' | 'bm25'): number {
    // Create a default corpus stats object if not available
    const defaultCorpusStats: CorpusStats = {
        totalDocuments: 1,
        avgFieldLength: 1,
        termFrequencies: new Map<string, number>(),
        fieldWeights: {
            name: 2.0,       // Matches in name worth 2x
            state: 1.0,      // Normal weight for state
            elevation: 1.0,  // Normal weight for elevation
            weather: 1.5,    // Weather slightly more important
            description: 1.8, // Description is quite important,
            tags: 1.0       // Tags are important
        }
    };
        
    switch (algorithm) {
        case 'bm25':
            return calculateBM25Score(query, item, defaultCorpusStats);
        case 'fuzzy':
            return calculateFuzzyScore(query, item, defaultCorpusStats);
        default:
            return calculateFuzzyScore(query, item, defaultCorpusStats);
    }
}

function calculateFuzzyScore(query: string, item: any, corpusStats: CorpusStats): number {
    let score = 0;
    const queryLower = query.toLowerCase();
    
    Object.entries(item).forEach(([fieldName, value]) => {
        if (typeof value === 'string') {
            const fieldValue = value.toLowerCase();
            const fieldWeight = corpusStats.fieldWeights[fieldName] || 1.0;
            
            // Calculate field-specific score
            if (fieldValue.includes(queryLower)) {
                // How rare is this match in the corpus?
                const termFreq = corpusStats.termFrequencies.get(queryLower) || 1;
                const rarity = Math.log(corpusStats.totalDocuments / termFreq);
                
                // Position bonus - matches closer to start of field get higher score
                const position = fieldValue.indexOf(queryLower);
                const positionBonus = 1 / (1 + position * 0.1);
                
                // Length normalization
                const lengthPenalty = Math.sqrt(corpusStats.avgFieldLength / fieldValue.length);
                
                score += fieldWeight * rarity * positionBonus * lengthPenalty;
            }
        }
    });
    
    return score;
}

function calculateBM25Score(query: string, item: any, corpusStats: CorpusStats): number {
    const k1 = 1.2;
    const b = 0.75;
    let score = 0;
    const queryTerms = query.toLowerCase().split(/\s+/);
    
    Object.entries(item).forEach(([key, value]) => {
        if (typeof value === 'string') {
            const fieldValue = value.toLowerCase();
            const fieldLength = fieldValue.split(/\s+/).length;
            const fieldWeight = corpusStats.fieldWeights[key] || 1.0;

            queryTerms.forEach(term => {
                // Term frequency in current document (case-insensitive)
                const tf = (fieldValue.match(new RegExp(term, 'gi')) || []).length;
                
                // If term doesn't appear in document, skip it
                if (tf === 0) return;
                
                // Simplified IDF calculation since we don't have accurate corpus stats
                const idf = Math.log(1 + (corpusStats.totalDocuments / (tf + 1)));
                
                // BM25 score calculation
                const numerator = tf * (k1 + 1);
                const denominator = tf + k1 * (1 - b + b * (fieldLength / corpusStats.avgFieldLength));
                
                // Apply field weight to the score
                score += fieldWeight * idf * (numerator / denominator);

            });
        }
    });
    
    return score;
}

router.post('/v1/search/:customer_id', async (ctx) => {
    const { customer_id } = ctx.params;
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
    const isValidApiKey = apiKey === process.env.FANTOM_API_KEY;
    
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
            database: 6
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
                // Calculate relevance score using fuzzy matching
                const score = caclulateScore(query, parsedValue, "bm25");

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
