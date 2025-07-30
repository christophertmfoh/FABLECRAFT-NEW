#!/usr/bin/env node

/**
 * 🏗️ ENTERPRISE DIRECTORY STRUCTURE MONITOR
 * Alerts when project hits thresholds for additional organization
 * 
 * THRESHOLDS (from senior dev assessment):
 * - 50-75 total files: Consider adding types/, constants/, providers/
 * - 3+ shared interfaces: Add types/ directory  
 * - 3+ constant files: Add constants/ directory
 * - 2+ context providers: Add providers/ directory
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');

// Color codes for terminal output
const colors = {
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function countFiles(dir, extensions = ['.ts', '.tsx']) {
  let count = 0;
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const itemPath = path.join(currentDir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(itemPath);
      } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
        count++;
      }
    }
  }
  
  traverse(dir);
  return count;
}

function findPatterns(dir, patterns) {
  const results = { interfaces: 0, constants: 0, providers: 0, types: 0 };
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const itemPath = path.join(currentDir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(itemPath);
      } else if (stat.isFile() && (item.endsWith('.ts') || item.endsWith('.tsx'))) {
        const content = fs.readFileSync(itemPath, 'utf8');
        
        // Count interfaces
        const interfaceMatches = content.match(/export\s+interface\s+\w+/g) || [];
        results.interfaces += interfaceMatches.length;
        
        // Count constants
        const constantMatches = content.match(/export\s+const\s+[A-Z_]+\s*=/g) || [];
        results.constants += constantMatches.length;
        
        // Count providers (React context providers)
        if (content.includes('createContext') || content.includes('Provider')) {
          results.providers++;
        }
        
        // Count type exports
        const typeMatches = content.match(/export\s+type\s+\w+/g) || [];
        results.types += typeMatches.length;
      }
    }
  }
  
  traverse(dir);
  return results;
}

function checkStructureHealth() {
  log('\n🏗️  ENTERPRISE DIRECTORY STRUCTURE MONITOR', 'bold');
  log('=' .repeat(50), 'cyan');
  
  // Count total files
  const totalFiles = countFiles(SRC_DIR);
  log(`📁 Total TypeScript files: ${totalFiles}`, 'blue');
  
  // Find patterns
  const patterns = findPatterns(SRC_DIR);
  log(`🔧 Exported interfaces: ${patterns.interfaces}`, 'blue');
  log(`📋 Exported constants: ${patterns.constants}`, 'blue');
  log(`🎯 Context providers: ${patterns.providers}`, 'blue');
  log(`📝 Exported types: ${patterns.types}`, 'blue');
  
  // Check thresholds
  const alerts = [];
  
  // File count threshold
  if (totalFiles >= 75) {
    alerts.push({
      type: 'CRITICAL',
      message: `${totalFiles} files detected! Time to reorganize into packages.`,
      action: 'Consider monorepo package extraction (Phase 2 of roadmap)'
    });
  } else if (totalFiles >= 50) {
    alerts.push({
      type: 'WARNING',
      message: `${totalFiles} files detected! Consider adding directory structure.`,
      action: 'Add types/, constants/, providers/ directories'
    });
  }
  
  // Specific pattern thresholds
  if (patterns.interfaces >= 5) {
    alerts.push({
      type: 'WARNING',
      message: `${patterns.interfaces} exported interfaces found!`,
      action: 'Create src/types/ directory for shared interfaces'
    });
  }
  
  if (patterns.constants >= 3) {
    alerts.push({
      type: 'WARNING',
      message: `${patterns.constants} exported constants found!`,
      action: 'Create src/constants/ directory for app-wide constants'
    });
  }
  
  if (patterns.providers >= 2) {
    alerts.push({
      type: 'WARNING',
      message: `${patterns.providers} context providers found!`,
      action: 'Create src/providers/ directory for React providers'
    });
  }
  
  // Display results
  log('\n🚨 STRUCTURE ALERTS:', 'yellow');
  
  if (alerts.length === 0) {
    log('✅ Structure is optimal for current size', 'green');
    log(`💡 Next threshold: ${50 - totalFiles} more files until reorganization`, 'cyan');
  } else {
    alerts.forEach((alert, index) => {
      const color = alert.type === 'CRITICAL' ? 'red' : 'yellow';
      log(`\n${index + 1}. [${alert.type}] ${alert.message}`, color);
      log(`   👉 ${alert.action}`, 'cyan');
    });
  }
  
  log('\n' + '=' .repeat(50), 'cyan');
  log('📖 Run this script anytime: npm run structure:check\n', 'blue');
}

// Run the check
try {
  checkStructureHealth();
} catch (error) {
  log(`❌ Error checking structure: ${error.message}`, 'red');
  process.exit(1);
}