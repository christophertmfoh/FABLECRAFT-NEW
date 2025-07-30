#!/bin/bash
cd "$(dirname "$0")"
echo "Starting FableCraft Enterprise on port 5174..."
echo "Mapped to external port 3000"
./node_modules/.bin/vite --host 0.0.0.0 --port 5174 --no-open