'use client'

import { motion } from 'framer-motion'
import {
  Smile,
  Heart,
  Sparkles as SparklesIcon,
  Sun,
  Music,
  BookOpen,
  Star,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeading, SectionLabel } from './section-heading'

type Favorite = {
  title: string
  description: string
  icon: LucideIcon
  bg: string
  fg: string
}

const favorites: Favorite[] = [
  { title: 'Your Laugh', description: "It's contagious and makes everything better", icon: Smile, bg: 'bg-pink-100', fg: 'text-pink-600' },
  { title: 'Your Kindness', description: 'The way you care for everyone around you', icon: Heart, bg: 'bg-rose-100', fg: 'text-rose-600' },
  { title: 'Your Creativity', description: 'You see beauty in the most unexpected places', icon: SparklesIcon, bg: 'bg-amber-100', fg: 'text-amber-600' },
  { title: 'Your Energy', description: 'You light up every room you enter', icon: Sun, bg: 'bg-yellow-100', fg: 'text-yellow-600' },
  { title: 'Your Taste in Music', description: 'Our shared playlists are everything', icon: Music, bg: 'bg-cyan-100', fg: 'text-cyan-600' },
  { title: "You're Brilliant", description: 'Always knowing the right thing to say', icon: BookOpen, bg: 'bg-emerald-100', fg: 'text-emerald-600' },
  { title: 'Your Uniqueness', description: "There's literally no one else like you", icon: Star, bg: 'bg-purple-100', fg: 'text-purple-600' },
  { title: 'Your Singing', description: 'Your voice is always the highlight', icon: Music, bg: 'bg-orange-100', fg: 'text-orange-600' },
]

export function FavoriteThings() {
  return (
    <section className="bg-card-tint px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionLabel>Things I Adore</SectionLabel>
          <SectionHeading lead="Favorite Things" highlight="About You" />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {favorites.map((fav, i) => {
            const Icon = fav.icon
            return (
              <motion.div
                key={fav.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-xl"
              >
                <motion.span
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${fav.bg} ${fav.fg}`}
                >
                  <Icon className="h-6 w-6" />
                </motion.span>
                <h3 className="mt-5 font-serif text-xl text-card-foreground">{fav.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {fav.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
