#!/bin/bash
echo "Starting FableCraft Enterprise..."
echo "Current directory: $(pwd)"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

echo "Installing dependencies if needed..."
npm install --silent

echo "Starting Vite dev server..."
npm run dev