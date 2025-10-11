#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It moves the App.tsx to App-old.tsx and creates a new App.tsx file.
 * You can remove this script if you don't need it.
 */

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const oldAppPath = path.join(root, 'App.tsx');
const newAppPath = path.join(root, 'App-old.tsx');

if (fs.existsSync(oldAppPath)) {
  fs.renameSync(oldAppPath, newAppPath);
  console.log('Moved App.tsx to App-old.tsx');
}

console.log('Project has been reset!');

