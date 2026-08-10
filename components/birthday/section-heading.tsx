'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6 }}
      className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-muted-foreground"
    >
      {children}
    </motion.p>
  )
}

export function SectionHeading({
  lead,
  highlight,
  className = '',
}: {
  lead: string
  highlight: string
  className?: string
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, delay: 0.05 }}
      className={`font-serif text-4xl leading-tight text-balance sm:text-5xl md:text-6xl ${className}`}
    >
      {lead}{' '}
      <span className="italic text-primary">{highlight}</span>
    </motion.h2>
  )
}

export function SectionIntro({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="mx-auto max-w-xl text-pretty leading-relaxed text-muted-foreground"
    >
      {children}
    </motion.p>
  )
}
