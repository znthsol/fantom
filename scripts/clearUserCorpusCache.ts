#!/usr/bin/env ts-node
/**
 * This script clears the user corpus cache from Redis database.
 * It helps maintain a clean Redis environment by removing all cached user corpus data.
 */

import { createClient } from '@redis/client';
import { config } from 'dotenv';

/**
 * Script to clear the user corpus cache from Redis database.
 * This utility helps in maintaining a clean Redis environment by removing all cached user corpus data.
 */

// Load environment variables
config();

async function clearUserCorpusCache() {
    console.log('Starting to clear user corpus cache from Redis...');
    
    // Create Redis client
    const client = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        database: 5 // Using the same database as in searchAndSortFromRedis
    });

    try {
        // Connect to Redis
        await client.connect();
        console.log('Connected to Redis successfully');
        
        // Get all keys
        const keys = await client.keys('*');
        console.log(`Found ${keys.length} keys in the cache`);
        
        if (keys.length > 0) {
            // Delete all keys
            const result = await client.del(keys);
            console.log(`Successfully deleted ${result} keys from the cache`);
        } else {
            console.log('No keys found in the cache. Nothing to delete.');
        }
        
    } catch (error) {
        console.error('Error clearing user corpus cache:', error);
        process.exit(1);
    } finally {
        // Disconnect from Redis
        await client.disconnect();
        console.log('Disconnected from Redis');
    }
    
    console.log('User corpus cache clearing completed');
}

// Execute the function
clearUserCorpusCache();
