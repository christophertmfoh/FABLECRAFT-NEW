import { Button } from '@/components/ui/button'
import { PenTool, Library } from 'lucide-react'

interface HeroSectionProps {
  onNewProject: () => void
  onNavigateToProjects: () => void
}

export function HeroSection({ onNewProject, onNavigateToProjects }: HeroSectionProps) {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
      {/* Centered Hero Content */}
      <div className="mx-auto max-w-5xl space-y-8 text-center lg:space-y-12">
        <div className="space-y-8 lg:space-y-12">
          {/* Badge */}
          <div className="inline-flex items-center space-x-3 rounded-full border border-border bg-card/90 px-4 py-2 shadow-md backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
            <span className="text-sm font-bold uppercase leading-tight tracking-[0.15em] text-foreground">
              End-to-End Creative Production Suite
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-4xl font-bold text-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-6xl">
            Where Stories{' '}
            <span className="bg-gradient-to-r from-primary via-primary/90 to-accent bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
              Come to Life
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] sm:text-xl">
            From the first spark of an idea to the final polished manuscript. Craft novels,
            screenplays, and graphic novels with AI that understands the art of storytelling. Your
            imagination, amplified by intelligence.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col justify-center gap-4 pt-8 sm:flex-row sm:gap-6">
            <Button
              size="lg"
              onClick={onNewProject}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/90 px-10 py-5 text-lg font-semibold text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <span className="relative z-10 flex items-center">
                <PenTool className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                Begin Your Story
              </span>
            </Button>
            <Button
              size="lg"
              onClick={onNavigateToProjects}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/90 px-10 py-5 text-lg font-semibold text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <span className="relative z-10 flex items-center">
                <Library className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                Browse Stories
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
