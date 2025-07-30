'use client'

import * as React from 'react'

import {
  Check,
  Coffee,
  Crown,
  Monitor,
  Moon,
  Palette,
  Snowflake,
  Star,
  Sun,
  TreePine,
} from 'lucide-react'
import { useTheme } from 'next-themes'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui'

/**
 * Theme configuration with metadata
 * Each theme includes visual, accessibility, and mood information
 */
const themeConfig = {
  light: {
    name: 'Parchment Classic',
    icon: Sun,
    description: 'Warm cream with burgundy accents for traditional writing',
    category: 'Light Themes',
    contrast: '8.1:1',
    mood: 'Traditional & Timeless',
  },
  'arctic-focus': {
    name: 'Arctic Focus',
    icon: Snowflake,
    description: 'Cool blues and whites for clean, distraction-free writing',
    category: 'Light Themes',
    contrast: '8.3:1',
    mood: 'Clean & Focused',
  },
  'golden-hour': {
    name: 'Golden Hour',
    icon: Crown,
    description: 'Warm yellows and oranges for inspiring creative energy',
    category: 'Light Themes',
    contrast: '8.5:1',
    mood: 'Inspiring & Optimistic',
  },
  dark: {
    name: 'Fablecraft Dark',
    icon: Moon,
    description: 'Modern professional dark with emerald and cyan gradients',
    category: 'Dark Themes',
    contrast: '13.2:1',
    mood: 'Modern & Focused',
  },
  'midnight-ink': {
    name: 'Midnight Ink',
    icon: Star,
    description: 'Deep navy with gold accents - scholarly and magical',
    category: 'Dark Themes',
    contrast: '12.8:1',
    mood: 'Scholarly & Premium',
  },
  'forest-manuscript': {
    name: 'Forest Manuscript',
    icon: TreePine,
    description: 'Deep greens for natural, focused writing sessions',
    category: 'Dark Themes',
    contrast: '11.8:1',
    mood: 'Natural & Calming',
  },
  'starlit-prose': {
    name: 'Starlit Prose',
    icon: Palette,
    description: 'Dark purple with silver - mystical and poetic inspiration',
    category: 'Dark Themes',
    contrast: '11.2:1',
    mood: 'Mystical & Poetic',
  },
  'coffee-house': {
    name: 'Coffee House',
    icon: Coffee,
    description: 'Rich browns and warm oranges for cozy cafe writing vibes',
    category: 'Dark Themes',
    contrast: '11.1:1',
    mood: 'Cozy & Inspiring',
  },
  system: {
    name: 'Follow System',
    icon: Monitor,
    description: 'Automatically match your device preference',
    category: 'System',
    contrast: 'Auto',
    mood: 'Adaptive',
  },
} as const

type ThemeKey = keyof typeof themeConfig

/**
 * Theme Toggle Component
 * Provides a dropdown menu for selecting application themes
 * All themes are WCAG AA compliant with documented contrast ratios
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by showing a placeholder during SSR
  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="h-9 w-9 px-0">
        <Palette className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    )
  }

  const getCurrentIcon = () => {
    if (!theme || !themeConfig[theme as ThemeKey]) {
      return Palette
    }
    return themeConfig[theme as ThemeKey].icon
  }

  const getCurrentThemeName = () => {
    if (!theme || !themeConfig[theme as ThemeKey]) {
      return 'Theme'
    }
    return themeConfig[theme as ThemeKey].name
  }

  const CurrentIcon = getCurrentIcon()

  const renderThemesByCategory = (category: string) => {
    return Object.entries(themeConfig)
      .filter(([_, config]) => config.category === category)
      .map(([themeKey, config]) => {
        const IconComponent = config.icon
        const isActive = theme === themeKey

        return (
          <DropdownMenuItem
            key={themeKey}
            onClick={() => setTheme(themeKey)}
            className="group flex cursor-pointer items-center justify-between gap-3 px-3 py-3 hover:bg-accent/10"
          >
            <div className="flex items-center gap-3">
              <div
                className={`rounded-md p-1.5 transition-colors ${
                  isActive ? 'bg-primary/20' : 'bg-muted/50 group-hover:bg-accent/20'
                }`}
              >
                <IconComponent
                  className={`h-4 w-4 ${
                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}
                >
                  {config.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {config.mood} • {config.contrast}
                </span>
              </div>
            </div>
            {isActive && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        )
      })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="theme-transition h-9 w-9 px-0 text-primary hover:bg-accent/10"
          title={getCurrentThemeName()}
        >
          <CurrentIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="theme-transition w-80 border-border/30 bg-card/95 backdrop-blur-sm"
      >
        <div className="p-2">
          <DropdownMenuLabel className="flex items-center gap-2 px-1 text-sm font-semibold text-foreground">
            <Palette className="h-4 w-4 text-primary" />
            <span>Writer-Focused Themes</span>
          </DropdownMenuLabel>
          <p className="mb-2 mt-1 px-1 text-xs text-muted-foreground">
            Optimized for long writing sessions with WCAG AA contrast
          </p>
        </div>

        <DropdownMenuSeparator />

        <div className="p-1">
          <DropdownMenuLabel className="px-2 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Light Themes
          </DropdownMenuLabel>
          {renderThemesByCategory('Light Themes')}
        </div>

        <DropdownMenuSeparator />

        <div className="p-1">
          <DropdownMenuLabel className="px-2 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Dark Themes
          </DropdownMenuLabel>
          {renderThemesByCategory('Dark Themes')}
        </div>

        <DropdownMenuSeparator />

        <div className="p-1">
          <DropdownMenuLabel className="px-2 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            System
          </DropdownMenuLabel>
          {renderThemesByCategory('System')}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
