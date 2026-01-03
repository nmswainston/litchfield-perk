#!/usr/bin/env node
/**
 * Secrets Check Script
 * 
 * Scans repository for real API keys and Place IDs that should not be committed.
 * Fails if patterns matching real secrets are found.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const SECRET_PATTERNS = [
  /AIza[0-9A-Za-z_-]{35}/,  // Google API key pattern
  /ChIJ[0-9A-Za-z_-]{27}/,  // Google Place ID pattern
];

const EXCLUDE_DIRS = [
  'node_modules',
  'dist',
  '.git',
  '.netlify',
  '.vite',
  '.vercel',
  'build',
];

const EXCLUDE_FILES = [
  'package-lock.json',
  'check-secrets.js',
];

function shouldExclude(filePath, rootDir) {
  const relPath = relative(rootDir, filePath);
  const parts = relPath.split(/[/\\]/);
  
  // Check if any part matches exclude dirs
  for (const part of parts) {
    if (EXCLUDE_DIRS.includes(part)) {
      return true;
    }
  }
  
  // Check filename
  const fileName = parts[parts.length - 1];
  if (EXCLUDE_FILES.includes(fileName)) {
    return true;
  }
  
  return false;
}

function scanFile(filePath, rootDir) {
  if (shouldExclude(filePath, rootDir)) {
    return [];
  }
  
  try {
    const content = readFileSync(filePath, 'utf8');
    const issues = [];
    
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      SECRET_PATTERNS.forEach((pattern) => {
        if (pattern.test(line)) {
          // Check if it's a placeholder
          if (!line.includes('REPLACE_ME') && !line.includes('your_') && !line.includes('placeholder')) {
            issues.push({
              file: relative(rootDir, filePath),
              line: index + 1,
              content: line.trim().substring(0, 80),
            });
          }
        }
      });
    });
    
    return issues;
  } catch (error) {
    // Skip binary files or unreadable files
    return [];
  }
}

function scanDirectory(dirPath, rootDir) {
  const issues = [];
  
  try {
    const entries = readdirSync(dirPath);
    
    for (const entry of entries) {
      const fullPath = join(dirPath, entry);
      
      if (shouldExclude(fullPath, rootDir)) {
        continue;
      }
      
      try {
        const stat = statSync(fullPath);
        
        if (stat.isDirectory()) {
          issues.push(...scanDirectory(fullPath, rootDir));
        } else if (stat.isFile()) {
          issues.push(...scanFile(fullPath, rootDir));
        }
      } catch (error) {
        // Skip files we can't access
        continue;
      }
    }
  } catch (error) {
    // Skip directories we can't access
  }
  
  return issues;
}

// Main execution
const rootDir = process.cwd();
const issues = scanDirectory(rootDir, rootDir);

if (issues.length > 0) {
  console.error('❌ SECRETS DETECTED! Found real API keys or Place IDs in repository.');
  console.error('\nIssues found:');
  issues.forEach((issue) => {
    console.error(`  ${issue.file}:${issue.line}`);
    console.error(`    ${issue.content}`);
  });
  console.error('\nPlease replace with placeholders (REPLACE_ME) in all files.');
  process.exit(1);
} else {
  console.log('✅ No secrets detected');
  process.exit(0);
}

