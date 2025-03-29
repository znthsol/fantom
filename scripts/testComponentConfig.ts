#! /usr/bin/env ts-node
import { loadFantomConfig } from '../components/Fantom.common';

/**
 * Simple script to load and print the Fantom configuration
 */
async function main() {
  try {
    // Load the configuration using the utility function
    const config = loadFantomConfig();

    console.log(config.users.find(user => user.user_id === "ismaeel")?.algorithm)
    
    // Print the entire configuration to the console
    console.log('Fantom Configuration:');
    console.log(JSON.stringify(config, null, 2));
  } catch (error) {
    console.error('Error loading Fantom configuration:', error);
    process.exit(1);
  }
}

// Execute the main function
main();
