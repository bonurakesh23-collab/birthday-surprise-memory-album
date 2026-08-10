'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function HeroSection({
  revealed,
  onOpen,
}: {
  revealed: boolean
  onOpen: () => void
}) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* decorative blurred circles */}
      <motion.div
        aria-hidden="true"
        className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-accent/50 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 1 }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-muted-foreground"
        >
          A Special Day for a Special Person
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-6 font-serif text-6xl leading-[1.05] text-balance sm:text-7xl md:text-8xl"
        >
          Happy
          <br />
          <motion.span
            className="italic text-primary"
            animate={{
              textShadow: [
                '0 0 0px rgba(150,100,60,0)',
                '0 0 18px rgba(150,100,60,0.35)',
                '0 0 0px rgba(150,100,60,0)',
              ],
            }}
            transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          >
            Birthday Komali
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground"
        >
          To my incredible friend who makes every moment brighter
        </motion.p>

        <div className="mt-10 flex h-16 items-center justify-center">
          <AnimatePresence>
            {!revealed && (
              <motion.button
                type="button"
                onClick={onOpen}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden rounded-full bg-primary px-9 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-lg shadow-primary/20"
              >
                <span className="relative z-10">Open Surprise</span>
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{
                    duration: 2.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                    repeatDelay: 1,
                  }}
                />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* scroll chevron after reveal */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            >
              <ChevronDown className="h-6 w-6 text-primary" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
