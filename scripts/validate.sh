#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 FableCraft Enterprise Validation Suite${NC}"
echo "========================================"
echo ""

# Track overall status
FAILED=0

# Function to run a command and check status
run_check() {
    local name=$1
    local command=$2
    
    echo -e "${YELLOW}Running: $name${NC}"
    echo "Command: $command"
    echo ""
    
    if eval "$command"; then
        echo -e "${GREEN}✅ $name passed${NC}"
    else
        echo -e "${RED}❌ $name failed${NC}"
        FAILED=1
    fi
    echo ""
    echo "----------------------------------------"
    echo ""
}

# Type checking
run_check "TypeScript Type Check" "npm run type-check"

# Linting
run_check "ESLint" "npm run lint"

# Formatting check
run_check "Prettier Format Check" "npm run format:check"

# Tests
run_check "Unit Tests" "npm run test:run"

# Final summary
echo ""
echo "========================================"
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All validation checks passed!${NC}"
    echo -e "${GREEN}Your code is ready for commit.${NC}"
else
    echo -e "${RED}❌ Some validation checks failed!${NC}"
    echo -e "${YELLOW}Run 'npm run validate:fix' to auto-fix issues.${NC}"
    exit 1
fi