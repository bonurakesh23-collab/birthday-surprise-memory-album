'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, Video, Calendar, MessageCircle, type LucideIcon } from 'lucide-react'
import { SectionHeading } from './section-heading'

type Memory = {
  date: string
  title: string
  description: string
  icon: LucideIcon
  photo: string
}

const memories: Memory[] = [
  {
    date: 'The day we meet oct 2021',
    title: 'The Day We Met'
    description: 'Who knew a random conversation would lead to the friendship?',
    icon: Heart,
    photo: '/gallery/komali-4.jpeg',
  },
  {
    date: 'January 2022',
    title: 'First Video Call ',
    description: 'Finally seeing each other face to face, even if through a screen!',
    icon: Video,
    photo: '/gallery/komali-1.jpeg',
  },
  {
    date: '2023',
    title: 'Best Memories',
    description: 'All the laughs, the late night talks, the shared dreams. Every moment counts.',
    icon: Calendar,
    photo: '/gallery/komali-5.jpeg',
  },
  {
    date: '2023',
    title: 'Philosophical Talks',
    description: 'Conversations about life, dreams, and everything in between. You always understand.',
    icon: MessageCircle,
    photo: '/gallery/komali-3.jpeg',
  },
]

export function MemoryTimeline() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-2xl tracking-[0.3em] text-muted-foreground">...</p>
          <SectionHeading lead="Memory" highlight="Timeline" />
        </div>

        <div className="relative mt-20">
          {/* vertical line */}
          <div className="absolute bottom-0 left-4 top-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

          <div className="flex flex-col gap-14">
            {memories.map((memory, i) => {
              const Icon = memory.icon
              const isLeft = i % 2 === 0
              return (
                <div
                  key={memory.title}
                  className={`relative flex md:items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* dot */}
                  <div className="absolute left-4 top-2 z-10 -translate-x-1/2 md:left-1/2">
                    <span className="block h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20" />
                  </div>

                  {/* card */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ y: -6 }}
                    className={`ml-12 w-full md:ml-0 md:w-[calc(50%-2.5rem)] ${
                      isLeft ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'
                    }`}
                  >
                    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                      <div className="relative h-44 w-full">
                        <Image
                          src={memory.photo || '/placeholder.svg'}
                          alt={memory.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                            {memory.date}
                          </span>
                        </div>
                        <h3 className="mt-4 font-serif text-2xl text-card-foreground">
                          {memory.title}
                        </h3>
                        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                          {memory.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
