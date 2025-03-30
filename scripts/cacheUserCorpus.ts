#! /usr/bin/env ts-node
import { config } from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import { createClient } from '@redis/client';
import axios from 'axios';

// Load environment variables
config();

// Fetch data from Scribe
async function fetchDataFromScribe() {
    const scribeBaseUrl = `http://localhost:${process.env.SCRIBE_APP_PORT}`;
    try {
        const response = await axios.get(`${scribeBaseUrl}/fantom/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from Scribe:', error);
        throw error;
    }
}

async function main() {
    // Initialize Redis client
    const redis = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        database: 5
    });

    await redis.connect();
    console.log('Connected to Redis');

    try {
        // Fetch data from Scribe
        const data = await fetchDataFromScribe();
        console.log(`Fetched ${data.length} records from Scribe`);

        // Process each record
        for (const record of data) {
            try {
                const { id, data: content } = record;
                // Store the record content in Redis
                await redis.set(`record:${id}`, JSON.stringify(content));
                console.log(`Processed record: ${id}`);
            } catch (error) {
                console.error(`Error processing record ${record.id}:`, error);
            }
        }

        console.log('Finished processing all records');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await redis.quit();
    }
}

main();
