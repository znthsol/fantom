# fantom

What is fantom? Basically it's an AI powered smart search microservice. That's right, it's intended to be used as a micro-service. And people could integrate fantoms abilities into their existing web site search. An example use case for fantom would be, imagine a e-commerce platform, built using some custom e-commerce platform, has terrible product search. The guy who owns it, really wants to make it better. He could integrate fantom as a micro-service into his existing platform. And now he has a smart search engine that can search for products by name, description, features, etc. 

## How does it work? 

Fantom uses a combination of natural language processing and machine learning to understand the user's search query. It then uses this information to search for the most relevant results in the vector database. The vector database stays in sync with the contents of a local diectory, which contains json objects which represent the customers product data, or whatever they want to have our AI smart search solution (fantom) to help them out with

## How to use it?

Here we can provide examples of using its API with your front end code. Let's make examples using Laravel style examples.

## How does it work?

Essentially, fantom is a single component, which runs as a servivce. This service exposes a single endpoint, which accepts POST requests. The body of the request is a json object, which contains the search query, and the search parameters.

Here is an example of the request body:

```json
{
    "query": "What is the capital of France?",
    "parameters": {
        "type": "fuzzy",
        "tags": ["name", "description", "features"]
    }
}
```
For example, you can use scoped tags to narrow down your search:

```json
{
    "query": "What is the capital of France?",
    "parameters": {
        "type": "fuzzy",
        "tags": ["name:banning", "description:backend", "features:frontend"]
    }
}
```

## Response Format

When you make a search request to fantom, you'll receive a JSON array containing objects that represent the search results. Each result object includes comprehensive information about the item:

```json
{
    "query": "What is the capital of France?",
    "count": 10,
    "results": [
        {
            "id": "123",
            "name": "Item 1",
            "description": "This is a description of item 1",
            "tags": ["tag1", "tag2", "tag3"],
            "score": 0.95,
            "features": ["feature 1", "feature 2", "feature 3"]
        }
    ]
}
``` 

The type parameter can be one of the following:

- fuzzy: This will use a fuzzy search to find the most relevant results.
- bm25: This will use a bm25 search to find the most relevant results.
- colbert: This will use a colbert search to find the most relevant results.
