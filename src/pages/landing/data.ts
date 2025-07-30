import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  CheckCircle,
  Compass,
  Library,
  Lightbulb,
  Palette,
  PenTool,
  Target,
} from 'lucide-react'

export interface ProcessStep {
  icon: LucideIcon
  title: string
  description: string
  detail: string
}

export interface TrustIndicator {
  number: string
  label: string
  icon: LucideIcon
}

export interface Testimonial {
  quote: string
  author: {
    name: string
    role: string
    initials: string
  }
}

export const processSteps: ProcessStep[] = [
  {
    icon: Lightbulb,
    title: 'Ideation',
    description: 'From spark to story seed',
    detail: 'Transform fleeting inspiration into rich narrative foundations with AI guidance',
  },
  {
    icon: Library,
    title: 'World Crafting',
    description: 'Build living story universes',
    detail: 'Characters, places, cultures - all interconnected in your digital story bible',
  },
  {
    icon: BookOpen,
    title: 'Manuscript Import',
    description: 'Breathe life into existing work',
    detail: 'Upload character sheets and documents - AI extracts deep story insights',
  },
  {
    icon: Compass,
    title: 'Story Architecture',
    description: 'Blueprint your narrative',
    detail: 'AI-assisted plotting that weaves through your carefully crafted world',
  },
  {
    icon: PenTool,
    title: 'Contextual Writing',
    description: 'Write within living worlds',
    detail:
      'Every word informed by your story bible - characters, places, history at your fingertips',
  },
  {
    icon: Palette,
    title: 'Visual Storytelling',
    description: 'Pictures worth a thousand words',
    detail: 'Generate consistent artwork, storyboards, and multimedia from your narrative',
  },
]

export const trustIndicators: TrustIndicator[] = [
  { number: '500M+', label: 'Words Generated', icon: CheckCircle },
  { number: '50K+', label: 'Stories Created', icon: Lightbulb },
  { number: '99%', label: 'Uptime Guarantee', icon: Target },
  { number: '100%', label: 'Workflow Integration', icon: CheckCircle },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      'FableCraft transformed how I develop characters. The AI understands nuance in ways I never expected, and the 164+ fields capture every detail that matters to my stories.',
    author: { name: 'Sarah Chen', role: 'Fantasy Novelist', initials: 'SL' },
  },
  {
    quote:
      'Finally, a platform that gets the creative process. The world bible feature keeps all my storylines consistent, and the collaboration tools let my writing partner contribute seamlessly.',
    author: { name: 'Marcus Rivera', role: 'Screenwriter', initials: 'MR' },
  },
  {
    quote:
      "The visual storytelling features are incredible. I can generate consistent character art and storyboards that perfectly match my written descriptions. It's like having a whole creative team.",
    author: { name: 'Alex Thompson', role: 'Graphic Novelist', initials: 'AT' },
  },
]
