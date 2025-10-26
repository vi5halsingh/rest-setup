#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get the target directory (where user ran the command)
const targetDir = process.cwd();

// Get the source directory (where template files are stored)
const sourceDir = path.join(__dirname, '..');

// Files/folders to copy
const filesToCopy = [
    'src',
    'public',
    '.env.example',
    '.gitignore',
    '.prettierignore',
    '.prettierrc'
];

// Create project structure
console.log('Creating project structure...');

// Copy files and folders
filesToCopy.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    if (fs.existsSync(sourcePath)) {
        if (fs.lstatSync(sourcePath).isDirectory()) {
            copyDir(sourcePath, targetPath);
        } else {
            fs.copyFileSync(sourcePath, targetPath);
        }
    }
});

// Copy package.json with modified content
const packageJson = require(path.join(sourceDir, 'package.json'));
const newPackageJson = {
    name: path.basename(targetDir),
    version: '1.0.0',
    description: packageJson.description,
    main: packageJson.main,
    scripts: packageJson.scripts,
    dependencies: packageJson.dependencies,
    devDependencies: packageJson.devDependencies
};

fs.writeFileSync(
    path.join(targetDir, 'package.json'),
    JSON.stringify(newPackageJson, null, 2)
);

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit', cwd: targetDir });

console.log('Project setup completed successfully!');

// Helper function to copy directories recursively
function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}