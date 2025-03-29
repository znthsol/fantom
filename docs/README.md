**fantom v1.0.0**

***

# Fantom - AI-Powered Smart Search Microservice

Fantom is an intelligent search microservice that combines multiple search algorithms with AI-powered relevance scoring to deliver highly accurate search results. It's designed to be easily integrated into existing applications, particularly useful for platforms that need to enhance their search capabilities.

## Features

- **Multiple Search Algorithms**:
  - BM25: Traditional information retrieval algorithm optimized for document search
  - Fuzzy Search: Flexible matching for typo-tolerant searches
  - Field-weighted scoring for different content types
- **Redis Integration**: Fast, in-memory storage for search data
- **API Key Authentication**: Secure access control
- **Configurable Field Weights**: Customize importance of different fields in search results
- **Scoped Tagging**: Advanced filtering capabilities with scoped tags

## Architecture

Fantom operates as a microservice with the following components:

1. **Data Storage**: Uses Redis as the primary storage engine
2. **Search Engine**: Implements multiple search algorithms with configurable weights
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
        "type": "bm25",  // or "fuzzy"
        "tags": ["name", "description", "features"]
    }
}
```

#### Scoped Tags Example

```json
{
    "query": "your search query",
    "parameters": {
        "type": "bm25",
        "tags": ["name:product", "category:electronics"]
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

The search engine applies different weights to different fields:

- `name`: 2.0x weight
- `description`: 1.8x weight
- `weather`: 1.5x weight
- Other fields: 1.0x weight

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
