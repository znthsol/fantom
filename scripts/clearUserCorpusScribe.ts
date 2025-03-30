#!/usr/bin/env ts-node
/**
 * This script clears all records from the Fantom Scribe component.
 * It helps maintain a clean environment by removing all stored data.
 */

import axios from 'axios';
import { config } from 'dotenv';

// Load environment variables
config();

async function clearScribeRecords() {
    console.log('Starting to clear all records from Fantom Scribe...');
    
    const scribeBaseUrl = `http://localhost:${process.env.SCRIBE_APP_PORT}`;

    try {
        // Send a DELETE request to the Scribe component
        const response = await axios.delete(`${scribeBaseUrl}/fantom`);
        console.log(`Successfully deleted records from Fantom Scribe:`, response.data);
    } catch (error) {
        console.error('Error clearing Fantom Scribe records:', error);
        process.exit(1);
    }
    
    console.log('Fantom Scribe records clearing completed');
}

// Execute the function
clearScribeRecords();
