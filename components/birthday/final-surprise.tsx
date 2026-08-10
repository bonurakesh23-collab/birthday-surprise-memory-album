'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, X } from 'lucide-react'

const PARTICLES = ['🌸', '🌺', '🌹', '💐', '🌷', '✨', '🎀', '💖']
const FINAL_IMAGE = '/ffinal.png'

type Burst = {
  id: number
  emoji: string
  x: number
  y: number
  originX: number
  originY: number
}

export function FinalSurprise() {
  const [open, setOpen] = useState(false)
  const [bursts, setBursts] = useState<Burst[]>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const originX = rect.left + rect.width / 2
    const originY = rect.top + rect.height / 2
    const now = Date.now()
    const newBursts: Burst[] = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2
      const distance = 120 + Math.random() * 100
      return {
        id: now + i,
        emoji: PARTICLES[i % PARTICLES.length],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        originX,
        originY,
      }
    })
    setBursts((prev) => [...prev, ...newBursts])
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !newBursts.some((n) => n.id === b.id)))
    }, 1600)
    setTimeout(() => setOpen(true), 250)
  }

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="flex flex-col items-center text-center">
        <motion.button
          type="button"
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2.5 rounded-full bg-primary px-9 py-4 text-sm font-medium tracking-wide text-primary-foreground shadow-xl shadow-primary/25"
        >
          <Heart className="h-4 w-4" fill="currentColor" />
          Click for Final Surprise
        </motion.button>
      </div>

      {/* particle bursts */}
      <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
        <AnimatePresence>
          {bursts.map((b) => (
            <motion.span
              key={b.id}
              className="absolute text-2xl"
              style={{ left: b.originX, top: b.originY }}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }}
              animate={{ opacity: 0, x: b.x, y: b.y, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            >
              {b.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 px-5 backdrop-blur-sm"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="relative flex min-h-[480px] w-full max-w-lg flex-col items-center justify-center overflow-hidden rounded-3xl p-8 text-center shadow-2xl sm:p-12"
              style={{
                backgroundImage: `url(${FINAL_IMAGE})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* readability overlay */}
              <div className="absolute inset-0 bg-background/80" />

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 rounded-full bg-card/70 p-2 text-foreground backdrop-blur transition hover:bg-card"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                >
                  <Heart className="h-12 w-12 text-primary" fill="currentColor" />
                </motion.div>

                <h2 className="mt-6 font-serif text-4xl text-foreground sm:text-5xl">
                  Happy Birthday!
                </h2>

                <p className="mt-5 max-w-sm text-pretty leading-relaxed text-foreground/80">
                  hope you like this and once again happy birthday and have a great year ahead and
                  live your life happily...
                </p>

                <p className="mt-5 font-serif text-lg text-foreground">Your Friend</p>
                <p className="mt-1 text-sm italic text-muted-foreground">
                  May the good things happen to you
                </p>

                <div className="mt-7 flex items-center gap-3">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 1.4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'easeInOut',
                        delay: i * 0.15,
                      }}
                    >
                      <Heart className="h-5 w-5 text-rose" fill="currentColor" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
