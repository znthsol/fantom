import Router from '@koa/router';
import { validateSearchParams, getErrorMessage, loadFantomConfig } from './Fantom.common';
import { calculateScore, reRanker } from '../common/utils';
import { config } from 'dotenv';
import { createClient } from '@redis/client';

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
    const isValidApiKey = apiKey === config.users.find(user => user.user_id === user_id)?.api_key || process.env.FANTOM_API_KEY;
    
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
                const score = calculateScore(query, parsedValue, config.users.find(user => user.user_id === user_id)?.algorithm || "bm25");

                console.log("Score:", score);

                allValues.push({ key, value: parsedValue, score });
            } catch (e) {
                console.log("Error:", e);
                continue;
            }
        }
        
        let results = allValues.sort((a, b) => b.score - a.score).slice(0, 10).map(item => item).filter(item => item.score > 0);
          
        await client.disconnect();

        // Use GPT to re-sort results based on user intent
        if (results.length > 0) {
            const rerankedResults = await reRanker(query, results as any);
            results = results
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
