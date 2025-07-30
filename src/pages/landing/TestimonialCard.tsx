import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import type { Testimonial } from './data'

interface TestimonialCardProps {
  quote: string
  author: Testimonial['author']
}

export function TestimonialCard({ quote, author }: TestimonialCardProps) {
  return (
    <Card className="group relative cursor-pointer overflow-hidden border-border bg-card/80 backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl">
      <div className="via-accent/3 to-primary/2 absolute inset-0 bg-gradient-to-br from-primary/5 opacity-0 transition-all duration-700 group-hover:opacity-100"></div>

      <CardContent className="relative z-10 space-y-6 p-8">
        <div className="mb-4 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-primary text-primary" />
          ))}
        </div>
        <p className="italic leading-relaxed text-foreground">{quote}</p>
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60">
            <span className="text-sm font-bold text-primary-foreground">{author.initials}</span>
          </div>
          <div>
            <div className="font-semibold text-foreground">{author.name}</div>
            <div className="text-sm text-muted-foreground">{author.role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
