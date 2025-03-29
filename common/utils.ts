import { GPT } from './openai';

export interface CorpusStats {
    totalDocuments: number;
    avgFieldLength: number;
    termFrequencies: Map<string, number>;
    fieldWeights: Record<string, number>;
}

export function calculateScore(query: string, item: any, algorithm: 'fuzzy' | 'bm25'): number {
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

export async function reRanker(query: string, results: []): Promise<[]> {
    if (results.length === 0) return results;

    try {
        const inputText = JSON.stringify(results, null, 1);
        
        // Create instructions for GPT to understand the task
        const instructions = `You are an intelligent search assistant. I have search results for the query: "${query}". 
        Please analyze these results and re-rank them based on what you believe the user is truly looking for. 
        Consider relevance, quality, and user intent. Return only a JSON array of indices representing the new order. Raw json, not markdown.`;
        
        // Call GPT-4o to analyze and re-sort the results
        const gptResponse = await GPT({
            version: 'gpt-4o-mini',
            instructions: instructions,
            inputText
        });

        // Parse the response to get the new order
        try {
            const newOrder = JSON.parse(gptResponse);
            
            // Validate that the response is an array of indices
            if (Array.isArray(newOrder) && newOrder.every(idx => typeof idx === 'number' && idx >= 0 && idx < results.length)) {
                // Re-order the results based on GPT's suggestion
                return newOrder.map(index => results[index]) as typeof results;
            }
        } catch (parseError) {
            console.error('Error parsing GPT response:', parseError);
        }
    } catch (error) {
        console.error('Error using GPT to re-sort results:', error);
    }

    // Return original results if any step fails
    return results;
} 