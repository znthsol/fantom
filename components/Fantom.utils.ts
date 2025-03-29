/** 
 * This file contains utility functions for use in the fantom component.
*/

import fs from 'fs';
import path from 'path';

export interface CorpusStats {
    totalDocuments: number;
    avgFieldLength: number;
    termFrequencies: Map<string, number>;
    fieldWeights: Record<string, number>;
}

export function caclulateScore(query: string, item: any, algorithm: 'fuzzy' | 'bm25'): number {
    // Create a default corpus stats object if not available
    const defaultCorpusStats: CorpusStats = {
        totalDocuments: 1,
        avgFieldLength: 1,
        termFrequencies: new Map<string, number>(),
        fieldWeights: {
            name: 3.0,        // Highest priority - exact name matches should bubble up
            tags: 2.5,        // Very important - tags are explicit categorization
            description: 1.8,  // Keep as is - important but not as much as name/tags
            weather: 1.2,     // Slight boost if weather is an important search criterion
            state: 1.0,       // Keep baseline
            elevation: 1.0,   // Keep baseline
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

export function calculateFuzzyScore(query: string, item: any, corpusStats: CorpusStats): number {
    let score = 0;
    const queryLower = query.toLowerCase();
    
    Object.entries(item).forEach(([fieldName, value]) => {
        const fieldWeight = corpusStats.fieldWeights[fieldName] || 1.0;

        if (Array.isArray(value) && fieldName === 'tags') {
            // Special handling for tags array
            value.forEach(tag => {
                const tagLower = tag.toLowerCase();
                if (tagLower.includes(queryLower)) {
                    // Apply similar scoring logic but for each matching tag
                    const termFreq = corpusStats.termFrequencies.get(queryLower) || 1;
                    const rarity = Math.log(corpusStats.totalDocuments / termFreq);
                    const position = tagLower.indexOf(queryLower);
                    const positionBonus = 1 / (1 + position * 0.1);
                    const lengthPenalty = Math.sqrt(corpusStats.avgFieldLength / tagLower.length);
                    
                    // Add to total score for each matching tag
                    score += fieldWeight * rarity * positionBonus * lengthPenalty;
                }
            });
        } else if (typeof value === 'string') {
            // Original string field handling
            const fieldValue = value.toLowerCase();
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

export function calculateBM25Score(query: string, item: any, corpusStats: CorpusStats): number {
    const k1 = 1.2;
    const b = 0.75;
    let score = 0;
    const queryTerms = query.toLowerCase().split(/\s+/);
    
    Object.entries(item).forEach(([key, value]) => {
        const fieldWeight = corpusStats.fieldWeights[key] || 1.0;

        if (Array.isArray(value) && key === 'tags') {
            // Special handling for tags array
            queryTerms.forEach(term => {
                let tagMatches = 0;
                value.forEach(tag => {
                    const tagLower = tag.toLowerCase();
                    const matches = (tagLower.match(new RegExp(term, 'gi')) || []).length;
                    tagMatches += matches;
                });
                
                if (tagMatches > 0) {
                    // Simplified IDF calculation for tags
                    const idf = Math.log(1 + (corpusStats.totalDocuments / (tagMatches + 1)));
                    
                    // Modified BM25 calculation for tags
                    const numerator = tagMatches * (k1 + 1);
                    const denominator = tagMatches + k1;
                    
                    score += fieldWeight * idf * (numerator / denominator);
                }
            });
        } else if (typeof value === 'string') {
            // Original string field handling
            const fieldValue = value.toLowerCase();
            const fieldLength = fieldValue.split(/\s+/).length;

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
