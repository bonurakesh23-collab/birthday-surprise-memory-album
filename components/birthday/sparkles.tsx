'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

type Sparkle = {
  id: number
  left: string
  top: string
  size: number
  duration: number
  delay: number
}

export function Sparkles({ count = 25 }: { count?: number }) {
  const sparkles = useMemo<Sparkle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 10 + 8,
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 5,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: s.left, top: s.top }}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0], y: [-0, -60] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        >
          <svg
            width={s.size}
            height={s.size}
            viewBox="0 0 24 24"
            fill="none"
            className="text-primary"
          >
            <path
              d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z"
              fill="currentColor"
              opacity="0.45"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
