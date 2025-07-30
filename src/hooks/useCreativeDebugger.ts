import { useState, useCallback, useEffect } from 'react'

/**
 * Creative Debugger Hook
 * Development-friendly debugging with performance tracking
 */

interface DebugInfo {
  timestamp: Date
  context: string
  action: string
  data?: unknown
  performance?: {
    renderTime: number
    memory: number
  }
}

interface CreativeSession {
  startTime: Date
  actions: DebugInfo[]
  errors: Array<{
    error: Error
    context: string
    timestamp: Date
  }>
  performance: {
    avgRenderTime: number
    peakMemory: number
    actionCount: number
  }
}

export const useCreativeDebugger = (context: string = 'unknown') => {
  const [session, setSession] = useState<CreativeSession>(() => ({
    startTime: new Date(),
    actions: [],
    errors: [],
    performance: {
      avgRenderTime: 0,
      peakMemory: 0,
      actionCount: 0,
    },
  }))

  const [isDebugMode, setIsDebugMode] = useState(
    () => localStorage.getItem('creative-debug') === 'true',
  )

  // Track session duration
  const sessionDuration = Date.now() - session.startTime.getTime()

  // Performance monitoring
  const [renderStart, setRenderStart] = useState<number>(0)

  useEffect(() => {
    if (isDebugMode) {
      setRenderStart(performance.now())
    }
  }, [isDebugMode])

  useEffect(() => {
    if (isDebugMode && renderStart > 0) {
      const renderTime = performance.now() - renderStart

      setSession((prev) => ({
        ...prev,
        performance: {
          ...prev.performance,
          avgRenderTime: (prev.performance.avgRenderTime + renderTime) / 2,
          peakMemory: Math.max(
            prev.performance.peakMemory,
            (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory
              ?.usedJSHeapSize || 0,
          ),
        },
      }))
    }
  }, [isDebugMode, renderStart])

  // Log actions
  const logAction = useCallback(
    (action: string, data?: unknown) => {
      if (!isDebugMode) return

      const debugInfo: DebugInfo = {
        timestamp: new Date(),
        context,
        action,
        data,
        performance: {
          renderTime: performance.now() - renderStart,
          memory:
            (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory
              ?.usedJSHeapSize || 0,
        },
      }

      setSession((prev) => ({
        ...prev,
        actions: [...prev.actions.slice(-49), debugInfo], // Keep last 50 actions
        performance: {
          ...prev.performance,
          actionCount: prev.performance.actionCount + 1,
        },
      }))
    },
    [isDebugMode, context, renderStart],
  )

  // Log errors
  const logError = useCallback(
    (error: Error) => {
      if (!isDebugMode) return

      setSession((prev) => ({
        ...prev,
        errors: [
          ...prev.errors.slice(-19),
          {
            error,
            context,
            timestamp: new Date(),
          },
        ], // Keep last 20 errors
      }))
    },
    [isDebugMode, context],
  )

  // Toggle debug mode
  const toggleDebugMode = useCallback(() => {
    const newMode = !isDebugMode
    setIsDebugMode(newMode)
    localStorage.setItem('creative-debug', newMode.toString())

    if (newMode) {
      logAction('debug_mode_enabled')
    } else {
      logAction('debug_mode_disabled')
    }
  }, [isDebugMode, logAction])

  // Clear session
  const clearSession = useCallback(() => {
    setSession({
      startTime: new Date(),
      actions: [],
      errors: [],
      performance: {
        avgRenderTime: 0,
        peakMemory: 0,
        actionCount: 0,
      },
    })
    logAction('session_cleared')
  }, [logAction])

  // Get debug summary
  const getDebugSummary = useCallback(() => {
    return {
      context,
      sessionDuration: sessionDuration,
      actionCount: session.performance.actionCount,
      errorCount: session.errors.length,
      avgRenderTime: session.performance.avgRenderTime,
      peakMemory: session.performance.peakMemory,
      recentActions: session.actions.slice(-10),
      recentErrors: session.errors.slice(-5),
    }
  }, [context, sessionDuration, session])

  // Export debug data
  const exportDebugData = useCallback(() => {
    const debugData = {
      session,
      summary: getDebugSummary(),
      exportedAt: new Date(),
      userAgent: navigator.userAgent,
    }

    const blob = new Blob([JSON.stringify(debugData, null, 2)], {
      type: 'application/json',
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `debug-session-${context}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    logAction('debug_data_exported')
  }, [session, getDebugSummary, context, logAction])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault()
        toggleDebugMode()
      }
      if (event.ctrlKey && event.shiftKey && event.key === 'E') {
        event.preventDefault()
        if (isDebugMode) {
          exportDebugData()
        }
      }
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [toggleDebugMode, exportDebugData, isDebugMode])

  return {
    isDebugMode,
    session,
    sessionDuration,
    actionCount: session.performance.actionCount,
    errorCount: session.errors.length,
    avgRenderTime: session.performance.avgRenderTime,
    peakMemory: session.performance.peakMemory,
    toggleDebugMode,
    logAction,
    logError,
    clearSession,
    getDebugSummary,
    exportDebugData,
  }
}
