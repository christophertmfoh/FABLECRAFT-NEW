'use client'

import * as React from 'react'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

/**
 * Theme Provider Props
 * Extends next-themes provider with type-safe props
 */
interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: 'class' | 'data-theme' | 'data-mode'
  defaultTheme?: string
  enableSystem?: boolean
  themes?: string[]
  disableTransitionOnChange?: boolean
  forcedTheme?: string
  storageKey?: string
  value?: Record<string, string>
  nonce?: string
}

/**
 * Theme Provider Component
 * Wraps the application with next-themes provider for dark/light mode support
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="system" enableSystem>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
