#!/usr/bin/env node
import { CommandLineParser } from './src/command-line.js';
import { serverDirectory } from './src/server-directory.js';

// config.yaml will be set when parsing command line arguments
const cliArgs = new CommandLineParser().parse(process.argv);
globalThis.DATA_ROOT = cliArgs.dataRoot;
globalThis.COMMAND_LINE_ARGS = cliArgs;
process.chdir(serverDirectory);
import fs from 'fs';
import path from 'path';

// Убедимся, что папка DATA_ROOT существует
const dataPath = path.resolve(globalThis.DATA_ROOT);
if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true });
    console.log(`✅ Created missing data directory at ${dataPath}`);
}

try {
    await import('./src/server-main.js');
} catch (error) {
    console.error('A critical error has occurred while starting the server:', error);
}
