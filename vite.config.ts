/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, type UserConfig } from 'vite'

// Conditional import for bundle analyzer (only during build)
const getBundleAnalyzer = async () => {
  if (process.env.ANALYZE === 'true') {
    const { visualizer } = await import('rollup-plugin-visualizer')
    return visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  }
  return null
}

// https://vite.dev/config/
export default defineConfig(async (): Promise<UserConfig> => {
  const bundleAnalyzer = await getBundleAnalyzer()
  
  return {
    plugins: [
      react(),
      ...(bundleAnalyzer ? [bundleAnalyzer] : []),
      // Custom plugin to suppress WebSocket errors
      {
        name: 'suppress-websocket-errors',
        configureServer(server) {
          const originalWs = server.ws;
          if (originalWs) {
            originalWs.on('error', () => {
              // Silently ignore WebSocket errors
            });
          }
        }
      }
    ],
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: false,
      hmr: {
        overlay: false, // Disable error overlay
        port: 5173,
        host: 'localhost',
        protocol: 'ws',
      },
      allowedHosts: true,
      watch: {
        usePolling: true,
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'src/test/',
          '**/*.d.ts',
          '**/*.config.*',
          '**/mockData/*',
          'src/main.tsx',
        ],
        thresholds: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
    },
  }
})
