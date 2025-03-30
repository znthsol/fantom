#! /usr/bin/env ts-node
import { config } from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import { createClient } from '@redis/client';

// Load environment variables
config();

async function getAllFiles(dir: string): Promise<string[]> {
    const files: string[] = [];
    
    async function traverse(currentDir: string) {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            
            if (entry.isDirectory()) {
                await traverse(fullPath);
            } else {
                files.push(fullPath);
            }
        }
    }
    
    await traverse(dir);
    return files;
}

async function main() {
    
    const baseDir = process.env.FANTOM_BASE_DIR || "./tmp"
    
    if (!baseDir) {
        console.error('FANTOM_BASE_DIR environment variable is not set');
        process.exit(1);
    }

    try {
        // Initialize Redis client
        const redis = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
            database: 5
        });

        await redis.connect();
        console.log('Connected to Redis');

        // Get all files from the base directory
        const files = await getAllFiles(baseDir);
        console.log(`Found ${files.length} files to process`);

        // Process each file
        for (const file of files) {
            try {
                const content = await fs.readFile(file, 'utf-8');
                const relativePath = path.relative(baseDir, file);
                
                // Store the file content in Redis
                await redis.set(`file:${relativePath}`, content);
                console.log(`Processed: ${relativePath}`);
            } catch (error) {
                console.error(`Error processing file ${file}:`, error);
            }
        }

        console.log('Finished processing all files');
        await redis.quit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();
