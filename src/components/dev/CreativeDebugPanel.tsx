import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bug, Download, Trash2, ChevronRight, ChevronDown, EyeOff } from 'lucide-react'
import { useCreativeDebugger } from '@/hooks/useCreativeDebugger'

/**
 * Creative Debug Panel
 * Visual debugging interface for development workflow
 */

interface CreativeDebugPanelProps {
  context?: string
  collapsed?: boolean
}

export function CreativeDebugPanel({
  context = 'debug-panel',
  collapsed = false,
}: CreativeDebugPanelProps) {
  const {
    isDebugMode,
    session,
    toggleDebugMode,
    clearSession,
    exportDebugData,
    sessionDuration,
    actionCount,
    errorCount,
  } = useCreativeDebugger(context)

  const [isExpanded, setIsExpanded] = useState(!collapsed)

  if (!isDebugMode) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button variant="outline" size="sm" onClick={toggleDebugMode} className="shadow-lg">
          <Bug className="mr-2 h-4 w-4" />
          Debug
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="border-primary/20 shadow-xl">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Bug className="h-4 w-4" />
              Creative Debug
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-6 w-6 p-0"
              >
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  toggleDebugMode()
                }}
                className="h-6 w-6 p-0"
              >
                <EyeOff className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0">
            {/* Overview Stats */}
            <div className="mb-4 grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{actionCount}</div>
                <div className="text-xs text-muted-foreground">Actions</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-destructive">{errorCount}</div>
                <div className="text-xs text-muted-foreground">Errors</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-muted-foreground">
                  {Math.round(sessionDuration / 1000)}s
                </div>
                <div className="text-xs text-muted-foreground">Session</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-4 flex gap-2">
              <Button variant="outline" size="sm" onClick={exportDebugData} className="flex-1">
                <Download className="mr-1 h-3 w-3" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={clearSession} className="flex-1">
                <Trash2 className="mr-1 h-3 w-3" />
                Clear
              </Button>
            </div>

            {/* Recent Actions */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">Recent Actions</div>
              <div className="max-h-40 space-y-1 overflow-y-auto">
                {session.actions.slice(-5).map((action, index) => (
                  <div key={index} className="rounded bg-muted/50 p-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{action.action}</span>
                      <Badge variant="outline" className="text-xs">
                        {action.context}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground">
                      {action.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="mt-4 border-t pt-2 text-xs text-muted-foreground">
              Press Ctrl+Shift+D to toggle debug mode
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
