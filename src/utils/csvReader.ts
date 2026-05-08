import { readFile } from 'fs/promises';
import { parse } from 'csv-parse/sync';
import  path, { join } from 'path';
import { readFileSync } from 'fs';

export interface loginData {
    username: string;
    password: string;
    expected_result: string;
    description: string;
}

export const readLoginDataFromCSV = () : loginData[] => {

    const csvFilePath = join(__dirname, '..', 'data', 'login-data.csv'); // Adjust the path to your CSV file as needed

    const fileContent = readFileSync(csvFilePath, 'utf-8'); // Read the CSV file content

    const data = parse(fileContent, {
        columns: true, // Use the first row as column names
        skip_empty_lines: true, // Skip empty line in the CSV file
        trim: true // Trim whilespace from the values
    }) as loginData[]; // Parse the CSV content into an array of objects

    return data;
};

