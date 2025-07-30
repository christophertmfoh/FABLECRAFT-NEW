import { useState } from 'react'
import { ThemeProvider } from './components/theme'
import { LandingPage } from './pages/landing'
import { useAuthInit } from './hooks/useAuth'

type AppView = 'landing' | 'auth' | 'projects' | 'dashboard'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

function App() {
  // Initialize auth state
  useAuthInit()

  // Application state
  const [currentView, setCurrentView] = useState<AppView>('landing')
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Navigation handlers
  const handleNavigate = (view: AppView) => {
    setCurrentView(view)
  }

  const handleNewProject = () => {
    // eslint-disable-next-line no-console
    console.log('🚀 New Project - Feature coming in Phase 4')
    // TODO: Implement new project creation in Phase 4
  }

  const handleAuth = () => {
    // eslint-disable-next-line no-console
    console.log('🔐 Auth Page - Feature coming in Phase 3')
    setCurrentView('auth')
    // TODO: Implement auth page navigation in Phase 3
  }

  const handleLogout = async () => {
    // eslint-disable-next-line no-console
    console.log('👋 Logout - Feature coming in Phase 3')
    setUser(null)
    setIsAuthenticated(false)
    setCurrentView('landing')
    // TODO: Implement proper logout in Phase 3
  }

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingPage
            onNavigate={handleNavigate}
            onNewProject={handleNewProject}
            onAuth={handleAuth}
            onLogout={handleLogout}
            user={user}
            isAuthenticated={isAuthenticated}
          />
        )
      case 'auth':
        return (
          <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">Auth Page</h1>
              <p className="mt-2 text-muted-foreground">Coming in Phase 3</p>
              <button
                onClick={() => setCurrentView('landing')}
                className="mt-4 text-primary hover:underline"
              >
                ← Back to Landing
              </button>
            </div>
          </div>
        )
      case 'projects':
        return (
          <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">Projects</h1>
              <p className="mt-2 text-muted-foreground">Coming in Phase 4</p>
              <button
                onClick={() => setCurrentView('landing')}
                className="mt-4 text-primary hover:underline"
              >
                ← Back to Landing
              </button>
            </div>
          </div>
        )
      case 'dashboard':
        return (
          <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="mt-2 text-muted-foreground">Coming in Phase 4</p>
              <button
                onClick={() => setCurrentView('landing')}
                className="mt-4 text-primary hover:underline"
              >
                ← Back to Landing
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={[
        'light',
        'dark',
        'system',
        'arctic-focus',
        'golden-hour',
        'midnight-ink',
        'forest-manuscript',
        'starlit-prose',
        'coffee-house',
      ]}
    >
      {renderView()}
    </ThemeProvider>
  )
}

export default App
