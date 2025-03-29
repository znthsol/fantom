/** 
 * This file contains utility functions for use in the fantom component.
*/

import fs from 'fs';
import path from 'path';
import { createClient } from '@redis/client';
import { calculateScore } from '../common/utils';

/**
 * Loads and parses the Fantom configuration file
 * @returns The parsed configuration object
 */
export const loadFantomConfig = (): any => {
  try {
    // Get the path to the config file
    const configPath = path.resolve(__dirname, '../components/Fantom.config.jsonc');
    
    // Read the file
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Remove comments from the JSONC content
    const jsonContent = configContent.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Parse the JSON
    const config = JSON.parse(jsonContent);
    
    return config;
  } catch (error) {
    console.error('Failed to load Fantom configuration:', error);
    // Return a default configuration or throw an error based on your requirements
    throw new Error(`Failed to load Fantom configuration: ${getErrorMessage(error)}`);
  }
};

/**
 * Validates the search query parameters
 * @param query The search query string
 * @param parameters The search parameters object
 * @returns A boolean indicating if the parameters are valid
 */
export const validateSearchParams = (
  query: string,
  parameters: { type: string; tags: string[] }
): boolean => {
//   if (!query || typeof query !== 'string' || query.trim() === '') {
//     return false;
//   }

//   if (!parameters || typeof parameters !== 'object') {
//     return false;
//   }

//   const validTypes = ['fuzzy', 'bm25', 'colbert'];
//   if (!parameters.type || !validTypes.includes(parameters.type)) {
//     return false;
//   }

//   if (!Array.isArray(parameters.tags) || parameters.tags.length === 0) {
//     return false;
//   }

  return true;
};

/**
 * Parses scoped tags from the format "scope:value"
 * @param tags Array of tags, potentially in scoped format
 * @returns Object with scopes as keys and values as arrays
 */
export const parseScopedTags = (tags: string[]): Record<string, string[]> => {
  const scopedTags: Record<string, string[]> = {};

  tags.forEach(tag => {
    const parts = tag.split(':');
    if (parts.length === 2) {
      const [scope, value] = parts;
      if (!scopedTags[scope]) {
        scopedTags[scope] = [];
      }
      scopedTags[scope].push(value);
    }
  });

  return scopedTags;
};

/**
 * Formats search results for API response
 * @param results The raw search results
 * @param query The original query
 * @returns Formatted results object
 */
export const formatSearchResults = (results: any[], query: string): object => {
  return {
    query,
    count: results.length,
    results,
    timestamp: new Date().toISOString()
  };
};

/**
 * Extracts error message from an error object
 * @param error The error object
 * @returns A string error message
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

/**
 * Searches and sorts data from Redis based on a query
 * @param query The search query string
 * @param userId The user ID for algorithm selection
 * @param config The Fantom configuration object
 * @returns Array of sorted search results
 */
export const searchAndSortFromRedis = async (
    query: string,
    userId: string,
    config: any
): Promise<Array<{ key: string; value: any; score: number }>> => {
    const client = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        database: 5
    });
    
    try {
        await client.connect();
        const keys = await client.keys('*');
        const allValues = [];
        
        for (const key of keys) {
            const value = await client.get(key);
            try {
                const parsedValue = JSON.parse(value);
                const score = calculateScore(
                    query,
                    parsedValue,
                    config.users.find(user => user.user_id === userId)?.algorithm || "bm25"
                );
                allValues.push({ key, value: parsedValue, score });
            } catch (e) {
                console.log("Error:", e);
                continue;
            }
        }
        
        return allValues
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            .filter(item => item.score > 0);
    } finally {
        await client.disconnect();
    }
};
