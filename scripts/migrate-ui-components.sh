#!/bin/bash

# UI Components Migration Script
# Following enterprise standards with proper error handling

set -e # Exit on error

SOURCE_DIR="/workspace/client/src/components/ui"
DEST_DIR="/workspace/fablecraft-enterprise/src/components/ui"

# Components we need for Landing + Auth
COMPONENTS=(
  "alert.tsx"
  "badge.tsx"
  "input.tsx"
  "label.tsx"
  "tabs.tsx"
  "dropdown-menu.tsx"
)

echo "🎯 Starting UI Components Migration..."

for component in "${COMPONENTS[@]}"; do
  if [ -f "$SOURCE_DIR/$component" ]; then
    echo "📦 Migrating $component..."
    cp "$SOURCE_DIR/$component" "$DEST_DIR/$component"
    
    # Update imports to use single quotes (enterprise standard)
    sed -i 's/import \(.*\) from "/import \1 from '"'"'/g' "$DEST_DIR/$component"
    sed -i 's/from "@\//from '"'"'@\//g' "$DEST_DIR/$component"
    
    echo "✅ $component migrated successfully"
  else
    echo "⚠️  Warning: $component not found in source"
  fi
done

echo "🎉 UI Components migration complete!"