import { Button } from '@/components/ui/button'
import { Zap, Lightbulb, Globe } from 'lucide-react'

interface CTASectionProps {
  onNewProject: () => void
  onNavigateToProjects: () => void
}

export function CTASection({ onNewProject, onNavigateToProjects }: CTASectionProps) {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-24 lg:py-32">
      <div className="relative overflow-hidden rounded-[3rem] border border-border bg-gradient-to-br from-background via-card/50 to-card shadow-2xl dark:from-slate-800 dark:via-slate-700 dark:to-slate-800">
        {/* Background texture */}
        <div
          className="absolute inset-0 bg-center bg-repeat opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Floating elements */}
        <div className="absolute right-8 top-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-2xl"></div>
        <div className="absolute bottom-8 left-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-xl"></div>

        <div className="relative z-10 space-y-8 p-8 text-center sm:space-y-12 sm:p-12 lg:p-16">
          <div className="space-y-8">
            <div className="hover:shadow-3xl mx-auto flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-2xl transition-all duration-500 hover:rotate-6 hover:scale-110">
              <Zap className="h-12 w-12 text-primary-foreground" />
            </div>
            <h2 className="bg-gradient-to-r from-primary via-primary/90 to-accent bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl">
              Start Your Creative Revolution
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
              Ready to transform any creative idea into complete multimedia production? Join the
              first true end-to-end AI creative suite that replaces 15+ scattered tools.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <Button
              onClick={onNewProject}
              size="lg"
              className="hover:shadow-3xl group relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/90 px-16 py-6 text-xl font-bold text-primary-foreground shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-110 hover:opacity-90"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <span className="relative z-10 flex items-center">
                <Lightbulb className="mr-4 h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                Create Your First Project
              </span>
            </Button>
            <Button
              onClick={onNavigateToProjects}
              size="lg"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/90 px-16 py-6 text-xl font-semibold text-primary-foreground shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-110 hover:opacity-90 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <span className="relative z-10 flex items-center">
                <Globe className="mr-4 h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                Explore Examples
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
