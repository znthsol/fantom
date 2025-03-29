import Router from '@koa/router';
import { validateSearchParams, getErrorMessage, loadFantomConfig, searchAndSortFromRedis } from './Fantom.common';
import { reRanker, SearchResult } from '../common/utils';
import { config } from 'dotenv';

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
        let results: SearchResult[] = await searchAndSortFromRedis(query, user_id, config);

        // Use GPT to re-sort results based on user intent
        if (results.length > 0) {
            console.log("Results before reranking:", results.map(r => r.score));
            const rerankedResults = await reRanker(query, results);
            console.log("Results after reranking:", rerankedResults.map(r => r.score));
            results = rerankedResults;
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
