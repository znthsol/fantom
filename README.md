# Fantom

Fantom is an intelligent search engine that combines efficient caching with advanced sorting algorithms and AI-powered reranking to deliver highly accurate search results. It's designed to be easily integrated into existing applications, particularly useful for platforms that need to enhance their search capabilities.

## Features

- **Efficient Caching Layer**: 
  - Redis Cache for fast, in-memory storage and retrieval
  - Optimized for high-throughput search operations
- **Smart Search Pipeline**:
  - Initial fast retrieval using Redis Cache
  - Advanced sorting algorithms for preliminary ranking
  - GPT-4 mini powered reranking for final result ordering
  - **Available Sorting Algorithms**:
    - **Fuzzy Matching**: Scores items based on term frequency, rarity, position, and length normalization.
    - **BM25**: Uses a probabilistic framework considering term frequency, inverse document frequency, and document length normalization.
    - **TF-IDF**: Scores items based on term frequency relative to corpus frequency.
    - **Cosine Similarity**: Measures similarity between query and document vectors.
    - **Jaccard Similarity**: Calculates similarity as the size of the intersection divided by the size of the union of sample sets.
- **Field-weighted scoring**: Customize importance of different fields in search results
- **Scoped Tagging**: Advanced filtering capabilities with scoped tags
- **API Key Authentication**: Secure access control

## Architecture

Fantom operates as a microservice with the following components:

1. **Data Storage**: Uses Redis Cache as the primary storage engine
   - Chosen over Redis Search and vector search for its simplicity and performance
   - Provides fast, in-memory access to search data
   - Enables efficient caching of frequently accessed results
2. **Search Pipeline**:
   - Initial retrieval using Redis Cache for fast data access
   - Advanced sorting algorithms for preliminary result ranking
   - GPT-4 mini powered reranking for final result ordering
3. **API Layer**: RESTful endpoint for search operations
4. **Data Ingestion**: Scripts for processing and storing searchable content

## API Usage

### Search Endpoint

```http
POST /v1/search/:customer_id
Content-Type: application/json
X-API-Key: your_api_key
```

#### Request Body

```json
{
    "query": "your search query",
    "parameters": {
        "tags": ["name", "description", "features"],
        "rerank": true  // Enable GPT-4 mini reranking
    }
}
```

#### Scoped Tags Example

```json
{
    "query": "your search query",
    "parameters": {
        "tags": ["name:product", "category:electronics"],
        "rerank": true
    }
}
```

#### Response Format

```json
{
    "query": "your search query",
    "count": 10,
    "results": [
        {
            "id": "123",
            "name": "Item Name",
            "description": "Item Description",
            "tags": ["tag1", "tag2"],
            "score": 0.95,
            "features": ["feature1", "feature2"]
        }
    ]
}
```

## Field Weights

The search pipeline applies different weights to different fields during the initial sorting phase:

- `name`: 2.0x weight
- `description`: 1.8x weight
- `weather`: 1.5x weight
- Other fields: 1.0x weight

Final results are reranked using GPT-4 mini for enhanced semantic understanding and relevance.

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   ```
   REDIS_URL=your_redis_url
   FANTOM_API_KEY=your_api_key
   ```
4. Start the service:
   ```bash
   npm start
   ```

### First-Time Setup

After ensuring the service is running, follow these steps to set up your data:

1. **Generate User Corpus**: Create an example corpus of data.
   ```bash
   npx ts-node scripts/generateUserCorpus.ts
   ```

2. **Import User Corpus**: Import the generated corpus into the system.
   ```bash
   npx ts-node scripts/importUserCorpusScribe.ts
   ```

3. **Cache User Corpus**: Add the imported data to Redis for caching.
   ```bash
   npx ts-node scripts/cacheUserCorpus.ts
   ```

Once these steps are completed, you should be able to query the endpoint and start using the API.

## Data Ingestion

Use the provided scripts to process and store your searchable content:

1. Place your JSON data files in the `tmp` directory
2. Run the vectorization script:
   ```bash
   ./scripts/vectorizeStorage.ts
   ```

## Development

The project uses TypeScript and is built with Node.js. Key dependencies include:

- `@koa/router`: API routing
- `@redis/client`: Redis integration
- `@huggingface/inference`: AI-powered search enhancements
- `@langchain/community`: Additional search capabilities

## License

MIT
