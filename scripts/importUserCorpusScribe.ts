#! /usr/bin/env ts-node
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import Ajv from 'ajv';
import fantomSchema from '../components/Fantom.schema.json';
import addFormats from 'ajv-formats';
import draft07MetaSchema from 'ajv/lib/refs/json-schema-draft-07.json';

config();

const baseDir = './tmp';
const scribeBaseUrl = `http://localhost:${process.env.SCRIBE_APP_PORT}`

// Load the Fantom schema

// const ajv = new Ajv();
// const validate = ajv.compile(fantomSchema);

// addFormats(ajv);

// ajv.addMetaSchema(draft07MetaSchema);

async function importFilesToScribe() {
    try {
        const files = fs.readdirSync(baseDir);

        for (const file of files) {
            const filePath = path.join(baseDir, file);
            const fileData = fs.readFileSync(filePath, 'utf-8');
            const jsonData = JSON.parse(fileData);

            // Validate the data against the Fantom schema
            // const valid = validate(jsonData);
            // if (!valid) {
            //     console.error(`Validation errors for ${file}:`, validate.errors);
            //     continue;
            // }

            // Prepare the data for Scribe
            const model = {
                created_by: 1,
                modified_by: 1,
                date_created: new Date().toISOString(),
                date_modified: new Date().toISOString(),
                data: jsonData // Wrap the JSON data in a 'data' object
            };

            // Send the data to the Scribe component
            const response = await axios.post(`${scribeBaseUrl}/fantom`, model);
            console.log(`Successfully imported ${file}:`, response.data);
        }
    } catch (error) {
        console.error('Error importing files:', error);
    }
}

importFilesToScribe();
